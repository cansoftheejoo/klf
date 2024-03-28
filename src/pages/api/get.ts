import { postData, postUserData } from "./post";
import { instanceWithAuth, instanceWithDefault } from "./util";

export const getData = async (url:string, params?:any) => {
    return await instanceWithDefault.get(url, { params: params })
    .then(res => res.data )
    .catch(err => console.log(err));
    // return data; 
}

export const getUserData = async (url:any, params?:any) => {
    return await instanceWithAuth.get(url, { params: params })
    .then(res => res )
    .catch(err => {
        console.log(err)
    });
}


// 회원가입 항목
export const getSignupItem = async () => await getData('/auth.php?trace=codeList');

// 자주묻는 질문
export const getFAQList = async () => await getData('/faq.php?trace=list');

// 공지사항
export const getNoticeList = ({
    nowPage = 1,
    strKey = '',
    strKeyword = '',
}) => async () => await getData('/notice.php?trace=list', {
    nowPage: nowPage,
    strKey: strKey,
    strKeyword: strKeyword,
});

// 공지사항 상세
export const getNoticeView = ({
    idx,
}:{
    idx:string
}) => async () => await getData('/notice.php?trace=view', {
    idx: idx,
});



/**
 * 온라인 상담
 */

// 상담 분류
export const getCSCategory = async () => await getData('/counselling.php?trace=questionType');

// 상담 등록
export const postCSWrite = async (value:any) => {
    const { data } = await  postUserData('/counselling.php?trace=regist', value);
    return data;
};

// 온라인 상담 답변 등록
export const postCsAnswer = async (value:any) => {
    const { data } = await  postUserData('/mypage.php?trace=reply', value);
    return data;
};

// 온라인 상담 답변 수정
export const postCsAnswerEdit = async (value:any) => {
    const { data } = await  postUserData('/mypage.php?trace=reply_update', value);
    return data;
};


/**
 * 변호사 찾기
 */

// 변호사 목록
export const getLawyerList = ({
    nowPage = 1,
    searchName = '',
    searchCareer = '',
    searchArea = '',
}) => async () => await getData('/lawyer.php?trace=list', {
    nowPage: nowPage,
    searchName: searchName,
    searchCareer: searchCareer,
    searchArea: searchArea,
});

// 변호사 목록 - 경력
export const getLawyerListWork = async () => await getData('/lawyer.php?trace=careerSelect');

// 변호사 목록 - 지역
export const getLawyerListArea = async () => await getData('/lawyer.php?trace=areaType');

// 변호사 상세보기
export const getLawyerView = ({
    idx,
}:{
    idx:string
}) => async () => await getData('/lawyer.php?trace=view', {
    idx: idx,
});


/**
 * 가맹거래사 찾기
 */

// 가맹거래사 목록
export const getFtaaList = ({
    nowPage = 1,
    searchName = '',
    searchCareer = '',
    searchArea = '',
}) => async () => await getData('/union.php?trace=list', {
    nowPage: nowPage,
    searchName: searchName,
    searchCareer: searchCareer,
    searchArea: searchArea,
});

// 가맹거래사 목록 - 경력
export const getFtaaListWork = async () => await getData('/union.php?trace=careerSelect');

// 가맹거래사 목록 - 지역
export const getFtaaListArea = async () => await getData('/union.php?trace=areaType');

// 가맹거래사 상세보기
export const getFtaaView = ({
    idx,
}:{
    idx:string
}) => async () => await getData('/union.php?trace=view', {
    idx: idx,
});


/**
 * 사례 찾기
 */

// 사례 목록
export const getCaseList = ({
    nowPage = 1,
    searchKeyword = '',
    questionType = '',
    strOrder = '',
}) => async () => await getUserData('/case.php?trace=list', {
    nowPage: nowPage,
    searchKeyword: searchKeyword,
    questionType: questionType,
    strOrder: strOrder,
});

// 사례 카테고리
export const getFtaaCategory = async () => await getData('/counselling.php?trace=questionType');

// 사례 상세
export const getCaseView = ({
    idx,
}:{
    idx: number | string;
}) => async () => await getUserData('/case.php?trace=view', {
    idx: idx,
});

// 사례 북마크
export const postCaseBookmark = async (value:any) => {
    const { data } = await  postUserData('/case.php?trace=bookmark', value);
    return data;
};

// 사례 답변 추천
export const postCaseRecommend = async (value:any) => {
    const { data } = await  postUserData('/case.php?trace=recommend', value);
    return data;
};


/**
 * 마이페이지
 */
export const getUserInfo = async () => await getUserData('/auth.php?trace=memberInfo');

// 온라인상담 일반상담
export const getMyCsList = ({
    nowPage = 1,
    type = 'A',
}) => {
    const url = `/mypage.php?trace=${type == 'B' ? 'normal_list' : 'counseling_list'}`;

    return async () => await getUserData(url, {
        nowPage: nowPage,
    });
}

// 온라인상담 상세
export const getMyCsView = ({
    idx,
}:{
    idx: number | string;
}) => async () => await getUserData('/mypage.php?trace=counseling_view', {
    idx: idx,
});

// 온라인 상담 채택
export const postMyCsSelected = async (value:any) => {
    const { data } = await  postUserData('/mypage.php?trace=choose', value);
    return data;
};

// 온라인 상담 답변 수정
export const postMyCsAnswerEdit = async (value:any) => {
    const { data } = await  postUserData('/mypage.php?trace=reply_update', value);
    return data;
};

// 온라인 상담 답변 삭제
export const postMyCsAnswerDelete = async (value:any) => {
    const { data } = await  postUserData('/mypage.php?trace=reply_delete', value);
    return data;
};


// 회원정보 수정
export const postUserInfoEdit = async (value:any) => {
    const { data } = await  postUserData('/mypage.php?trace=update', value);
    return data;
};

// 북마크 사례
export const getMyBookMarkList = ({
    nowPage = 1,
}) => async () => await getUserData('/case.php?trace=bookmark_list', {
    nowPage: nowPage,
});