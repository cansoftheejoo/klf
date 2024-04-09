import { getUserData } from "./get";
import { instanceWithAuth, instanceWithDefault } from "./util";


export const postData = async (url:string, params = {"Content-Type": `application/json`}) => {

    return await instanceWithDefault.post(url , params).then(res => res)

}

// 유저 전용
export const postUserData = async (url:string, params:any) => {



    return await instanceWithAuth.post(url , params).then(res => res)

}

// 유저 미디버스 토큰 사용
export const postUserMbus = async (url:string, params:any) => {

  
    const getToken = await getUserData('/mypage.php?trace=midibus_token')
    const token = getToken?.token

    const newParams:any = {
        ...params,
        'X-Mbus-Token': token
    }
    console.log(newParams)
    return await instanceWithAuth.post(url , newParams).then(res => res)

}


// 아이디 중복체크
export const postCheckID = async (value:any) => {
    const { data } = await  postData('/auth.php?trace=idCheck', value);
    return data;
};

// 이메일 중복체크
export const postCheckEmail = async (value:any) => {
    const { data } = await  postData('/auth.php?trace=emailCheck', value);
    return data;
};

// 회원가입
export const postRegister = async (value:any) => {
    const { data } = await  postData('/auth.php?trace=register', value);
    return data;
};



// 로그인
export const postFindIDPW = async (value:any) => {
    const { data } = await  postData('/auth.php?trace=find', value);
    return data;
};




// 변호사 가맹거래사 북마크
export const postUserLike = async (value:any) => {
    const { data } = await  postUserData('/lawyer.php?trace=like', value);
    return data;
};
