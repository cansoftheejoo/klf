// 로그인시 리턴되는 정보
export interface SignInReturnType {
    member_id?:string;
    member_name?:string;
    subscription_path?:string;
    type?:string;
}

// 회원가입 폼 타입
export interface SignUpType {
    userid:string;
    user_nickname?:string;
    username?:string;
    userpass?:string;
    userpassd?:string;
    company_id?:string;
    usertel?:string;
}