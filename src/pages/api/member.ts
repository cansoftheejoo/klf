// 

import { getData } from "./get";
import { postData } from "./post";

// 로그인
export const postLogin = async (value:any) => {
    const { data } = await  postData('/authorization.php?trace=login', value);
    return data;
};

// 회원가입 가맹점 리스트
export const getSignUpCompanyList = async () => await getData('/authorization.php?trace=company_list');