import { footerInfoType } from "@/type/layout";
import { getData } from "./get";

// 푸터 정보
export const getFooterInfo= async (): Promise<footerInfoType>  => await getData('/cs.php?trace=footer') 


// 회원가입 약관
export const getPolicy = (id:string) => async () => await getData('/cs.php', {
    trace: id
});
