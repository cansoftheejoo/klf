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

// 일반 회원가입
export const postSignUpNormal = async (value:any) => {
    const { data } = await  postData('/authorization.php?trace=sign_up', value);
    return data;
};

// 판매자 회원기입
export const postSignUpSeller = async (value:any) => {
    const { data } = await  postData('/authorization.php?trace=store_sign_up', value);
    return data;
};

// 아메일 중복확인
export const postCheckUserId = async (value:any) => {
    const { data } = await  postData('/authorization.php?trace=chk_id', value);
    return data;
};

// 닉네임 중복확인
export const postCheckUserNickname = async (value:any) => {
    const { data } = await  postData('/authorization.php?trace=chk_nickname', value);
    return data;
};