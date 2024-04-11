import { useCheckSignIn } from "@/hook/common";
import { getClassBookmark, getClassBookmarkUpdate } from "@/pages/api/class";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "react-query";

const ClassBookMark = () => {

    const router = useRouter()
    const idx = router.query?.idx as string

    const queryClient = useQueryClient()

    const isLoggedIn = useCheckSignIn();

    const setBookmark =  useMutation(getClassBookmarkUpdate, {
        onSuccess: res => {

            queryClient.invalidateQueries([`getClassBookmark${idx}`])
        }
    })

    const toggleBookmark = () => {
        
        if(!isLoggedIn){
            if(confirm('로그인 후 이용이 가능합니다. 로그인 페이지로 이동하시겠습니까?')){
                router.push(`/login?prev=${router.asPath}`)
            }
        }
        setBookmark.mutate({
            no: idx,
            recom_yn : data.recom_yn
        })
    }

    const { data, status } = useQuery(`getClassBookmark${idx}`, getClassBookmark({ no: idx }), {
        onSuccess: res => {
            // console.log(res)
        }
    })

    
    if(status == 'loading'){
        return <div></div>;
    }

    if (status == 'error') {
        return <p className="nothing">문제가 발생했습니다</p>;
    }


    return (
        <button onClick={toggleBookmark}>
            <Icon icon={data.recom_yn == 'Y' ? "bi:bookmark-plus-fill" : "bi:bookmark-plus"} color={data.recom_yn == 'Y' ? 'var(--color1)' : "#fff"} fontSize={26} />
        </button>
    );
}

export default ClassBookMark;