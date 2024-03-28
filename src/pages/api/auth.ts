import { deleteCookie } from "@/util/common";
import { instanceWithDefault } from "./util";
import { useQueryClient } from "react-query";
// import { getSession } from 'next-auth/react'

// export default async function auth(req:any, res:any) {
//     const session = await getSession({ req })
    
//     if (!session) {
//       res.status(401).json({ error: 'Unauthorized' })
//       return
//     }
    
//     // 로그인한 사용자는 통과
//     res.status(200).json({ message: 'Authorized' })
// }
  

export const refreshToken = async () => {
    try {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('refreshToken');
        if (token && user) {
            const userJson = JSON.parse(user)
            const response:any = await instanceWithDefault.post('/authorization.php?trace=refresh', {
                type : userJson.type,  // 회원타입
                refreshToken: token
            }); // 토큰

            
            if(response?.data.result == 'success'){
                const { accessToken, refreshToken } = response.data;

                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
            } else {
                console.log('토큰 리프래시 실패')
                logout();
            }
            
        }
       
       
     
    } catch (error) {
        logout();
        console.error('Error refreshing token:', error);
        throw error;
    }
  };
  
export const logout = () => {
    const queryClient = useQueryClient()
    localStorage.removeItem('user')
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')

    deleteCookie('access_token')

    // 로그아웃시 사용자 데이터 remove
    queryClient.clear();
}

export const checkLogin = () => {
    if (typeof window !== 'undefined') {
        const jsonData = localStorage.getItem('user');
        if (jsonData) {
            const parsedData = JSON.parse(jsonData);
            const login = parsedData.memberId ? true : false;
            return login;
        }
    }

    return false;
}

export const getUserStorage = () => {
    if(typeof window !== undefined){
        let json:any  = {}

		const res = localStorage.getItem('user');
        if (res) {
		    json = JSON.parse(res)
        }

        return json;
    }
}