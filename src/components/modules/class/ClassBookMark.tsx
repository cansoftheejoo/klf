import { getClassBookmark, getClassBookmarkUpdate } from "@/pages/api/class";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "react-query";

const ClassBookMark = () => {

    const router = useRouter()
    const idx = router.query?.idx as string

    const queryClient = useQueryClient()

    const setBookmark =  useMutation(getClassBookmarkUpdate, {
        onSuccess: res => {

            queryClient.invalidateQueries([`getClassBookmark${idx}`])
        }
    })

    const toggleBookmark = () => {
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
        return ;
    }

    if (status == 'error') {
        return <p>문제가 발생했습니다</p>;
    }


    return (
        <button onClick={toggleBookmark}>
            <Icon icon={data.recom_yn == 'Y' ? "bi:bookmark-plus-fill" : "bi:bookmark-plus"} color={data.recom_yn == 'Y' ? 'var(--color1)' : "#fff"} fontSize={26} />
        </button>
    );
}

export default ClassBookMark;