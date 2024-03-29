import { SignInReturnType } from "@/type/common";
import { deleteCookie, setCookie } from "@/util/common";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";

// 로그인
export const useLogin = () => {

    const router = useRouter()

    const setLogin = ({
        res,
        reload = true,
        path,
    }:{
        res?:any,
        reload?:boolean,
        path?:string,
    }) => {

        const jsonData = JSON.stringify({
            userid: res?.userid,
            username: res?.username,
            grade: res?.grade,
            type: res?.type,
            file_name: res?.file_name,
            no: res?.no,
        });


        // const time = maintainLogin ? 20 : 3

        // setCookie('user', jsonData, time)
        // setCookie('access_token', res.access_token, time)
        // setCookie('refresh_token', res.refresh_token, time)

        localStorage.setItem('user', jsonData);
        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('refresh_token', res.refresh_token);

        // middleware 사용
        setCookie('access_token', res.access_token, 20)

        if(reload){
            location.reload();
        } else {
            if(path){
                router.push(path);
            } else {
                // router.back();
            }
           
        }
    }

    return setLogin
}

// 로그인 체크
export const useCheckSignIn = ():SignInReturnType|null => {

    const [isLoggedIn, setIsLoggedIn] = useState<SignInReturnType|null>(null);

    useEffect(() => {
        const user =  localStorage.getItem('user')


        if(user){
            const userJson:SignInReturnType = JSON.parse(user) 
            setIsLoggedIn(userJson)
        }

    },[])

    return isLoggedIn
}

// 로그아웃
export const useSignOut = () => {

    const queryClient = useQueryClient()
   
    const setSignOut = () => {


        localStorage.removeItem('user')
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')

        deleteCookie('access_token')

        // 로그아웃시 사용자 데이터 remove
        queryClient.clear();
        // queryClient.setQueryData('getCartList', null);
        // signOut()
        location.href = '/'
    }

    return setSignOut
}