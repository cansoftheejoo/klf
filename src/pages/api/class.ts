import { ClassViewType, categoryClassListFilterType } from "@/type/class";
import { getData, getUserData } from "./get";
import { postUserData, postUserMbus } from "./post";


// 카테고리 정보
export const getCategoryInfo = ({
    no
}:{
    no:string
}) => async () => await getData('/main.php?trace=category_view', {
    no: no
})

// 카테고리별 강의 목록
export const getCategoryClassList = ({
    category = '1',
    sort = '1',
    nowPage = 1,
}:categoryClassListFilterType) => async () => await getData('/main.php?trace=online_category_list', {
    category: category,
    type: sort, // 1 :최신순  2:추천순  3:인기순 
    nowPage: nowPage,
})

/*
    강의 상세
*/
// 강의 내용
export const getClassView = ({
    no,
}:{
    no:string
}) => async () => await getUserData('/main.php?trace=online_view_every', {
    no: no,
})

// 수강중인 강의 상세
export const getMyClassView = ({
    no,
}:{
    no:string
}) => async () => await getUserData('/mypage.php?trace=online_view', {
    no: no,
})


// 강의 시청 업데이트
export const postUpdateVideoView = async (value:any) => {
    const { data } = await  postUserMbus(`/mypage.php?trace=online_play_list`, value);
    return data;
};

// 강의 찜하기
export const getClassBookmark = ({
    no,
}:{
    no:string
}) => async () => await getUserData('/mypage.php?trace=online_recom_yn', {
    no: no,
})

// 강의 찜 토글
export const getClassBookmarkUpdate = async (value:any) => {
    const { data } = await  postUserData(`/mypage.php?trace=online_recom_save`, value);
    return data;
};

// 연관 강의 목록 리스트
export const getClassViewSideList = ({
    store_id,
    list_keyword,
}:{
    store_id?:string
    list_keyword?:string
}) => async () => await getUserData('/main.php?trace=online_list_keyword', {
    store_id: store_id,
    list_keyword: list_keyword,
})


// 강의 후기
export const getClassReviewList = ({
    nowPage,
    no,
}:{
    nowPage?:number
    no?:string
}) => async () => await getData('/main.php?trace=review_list', {
    nowPage: nowPage,
    no: no,
})

// 강의 후기 작성
export const postClassReviewWrite = async (value:any) => {
    const { data } = await  postUserData(`/main.php?trace=review_save`, value);
    return data;
};


// 강의 후기 삭제
export const postClassReviewDel = async (value:any) => {
    const { data } = await  postUserData(`/main.php?trace=review_del`, value);
    return data;
};


/*
 결제하기
*/
// 주문하기 정보 불러오기
export const postOrderInfo = async (value:any) => {
    const { data } = await  postUserData(`/order.php?trace=order_pg`, value);
    return data;
};


// 결제 완료 정보
export const postOrderResult = async (value:any) => {
    const { data } = await  postUserData(`/order.php?trace=order_result`, value);
    return data;
};
