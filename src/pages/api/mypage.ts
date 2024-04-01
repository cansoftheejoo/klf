import { getData, getUserData } from "./get"
import { postUserData } from "./post"

/*
 회원정보
*/
// 기존 회원정보
export const getMyInfo = ({
    type,
}:{
    type?:string
}) => async () => await getUserData('/mypage.php?trace=member_view', {
    type: type,
})

// 회원정보 수정
export const postEditInfo = async (value:any) => {
    const { data } = await  postUserData(`/mypage.php?trace=member_edit`, value);
    return data;
};

// 회원탈퇴
export const postWithdraw = async (value:any) => {
    const { data } = await  postUserData(`/mypage.php?trace=withdraw`, value);
    return data;
};


// 찜한 강의 목록
export const getMyWishList = ({
    nowPage = 1,
}:{
    nowPage:number
}) => async () => await getUserData('/mypage.php?trace=online_recom', {
    nowPage: nowPage,
})

/*
 수강중인 강의
*/
export const getMySubscribe = ({
    nowPage = 1,
}:{
    nowPage:number
}) => async () => await getUserData('/mypage.php?trace=online_use', {
    nowPage: nowPage,
})


/*
 고객센터
*/
// 고객센터 게시판
export const getMyCsBoardList = ({
    id,
    strKeyword,
    nowPage,
}:{
    id:string,
    strKeyword?:string,
    nowPage?:number
}) => async () => {

    // 공지사항 notice_list
    // 자주묻는 질문 fag_list
    // 문의 내역 inquiry_list

    return await getUserData(`/customer_service.php`, {
        trace: id,
        strKeyword: strKeyword,
        nowPage: nowPage,
    })
}


// 게시판 내용
export const getMyCsBoardView = ({
    id,
    no,
}:any) => async () => {

    // 공지사항 notice_view
    // 자주묻는 질문 fag_view
    // 문의 내역 inquiry_view

    return await getUserData(`/customer_service.php`, {
        trace: `${id}_view`,
        no: no,
    })
}

// 문의하기 작성
export const postCsInquiryWrite = async (value:any) => {
    const { data } = await  postUserData(`/customer_service.php?trace=inquiry_save`, value);
    return data;
};


/*
 수익관리
*/

// 출금 계좌 등록
export const postProfitAccount = async (value:any) => {
    const { data } = await  postUserData(`/calculate.php?trace=account_save`, value);
    return data;
};

// 은행명 리스트
export const getBankList = async () => await getData('/calculate.php?trace=bank_list');


// 출금내역 리스트
export const getProfitHistory = ({
    nowPage = 1,
    viewType = '',
    trace = '',
}:{
    nowPage:number
    viewType?:string
    trace?:string
}) => {

    // 출금내역 리스트 calculate_list
    // 상태 1:출금신청 2:확인중 3:출금완료 4:반려

    // 강의별 수익 리스트 calculate_online_list
    // 출금신청 상태  (N :신청전 Y:출금완료 C : 출금신청)

    return async () => await getUserData('/calculate.php', {
        nowPage: nowPage,
        viewType: viewType,
        trace: trace,
    })
    
}


// 출금 금액
export const getProfitPrice = async () => await getUserData('/calculate.php?trace=account_amount');


// 출금 신청
export const postProfitSubmit = async (value:any) => {
    const { data } = await  postUserData(`/calculate.php?trace=account_amount_save`, value);
    return data;
};

