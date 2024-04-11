import { getData, getUserData } from "./get";
import { postUserData } from "./post";

/**
 * 메인화면
 */

// 메인배너
export const getMainBanner = async () => await getData('/main.php?trace=banner');

// 카테고리
export const getCategory = async () => await getData('/main.php?trace=category');

// 메인 강의 목록
export const getMainVideo = (type:string, cnt:number) => async () => await getUserData('/main.php?trace=online', {
    type: type,
    row_cnt: cnt
})

// 메인 강의 카운트
export const getVideoCount = async () => await getData('/main.php?trace=online_cnt');

// 메인 하단 문의 리스트
export const getCustomInquiry = async () => await getData('/main.php?trace=inquiry_bottom');

// 메인 하단 문의 작성
export const posttCustomInquiry = async (value:any) => {
    const { data } = await  postUserData('/customer_service.php?trace=edu_inquiry_save', value);
    return data;
};

