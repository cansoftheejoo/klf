import { SignInReturnType } from "@/type/common";
import { deleteCookie } from "@/util/common";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";

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