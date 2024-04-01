// 로그인시 리턴되는 정보
export interface SignInReturnType {
    userid?:string;
    username?:string;
    no?:string;
    grade?:string;
    type?:string;
}

// 회원가입 폼 타입
export interface SignUpType {
    type:string;
    userid:string;
    user_nickname?:string;
    username?:string;
    userpass?:string;
    userpassd?:string;
    company_id?:string;
    company_no?:string;
    file_name?:string;
    
    usertel?:string;
}