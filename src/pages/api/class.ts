import { categoryClassListFilterType } from "@/type/class";
import { getData } from "./get";


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