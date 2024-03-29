import { getData, getUserData } from "./get"
import { postUserData } from "./post"

// 찜한 강의 목록
export const getMyWishList = ({
    nowPage = 1,
}:{
    nowPage:number
}) => async () => await getUserData('/mypage.php?trace=online_recom', {
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
