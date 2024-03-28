import { setCategoryClassListFilter } from "@/redux/class";
import { useDispatch, useSelector } from "react-redux";

export const useCategoryClassList = () => {
    const dispatch = useDispatch();

    const setCategoryListFilter = (newValue: number) => {
        dispatch(setCategoryClassListFilter(newValue));
    };

    const categoryListFilter = useSelector((state: any) => state.class.filter);

    return [ categoryListFilter, setCategoryListFilter ];
}