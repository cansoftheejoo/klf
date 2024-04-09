import Pagination from "@/components/ui/pagination/Pagination";
import { getClassReviewList } from "@/pages/api/class";
import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import ReviewArticle from "./ReviewArticle";
import { useRouter } from "next/router";
import { lastPage } from "@/util/common";
import Loading from "@/components/ui/loading/Loading";

const ClassReviewList = () => {

    const router = useRouter()
    const idx = router.query?.idx as string

    const [boardParams, setBoardParams] = useState({
        nowPage: 1,
        no: '',
    })

    useEffect(() => {
        setBoardParams({
            ...boardParams,
            no: idx
        })
    },[idx])

    const { status, data } = useInfiniteQuery([`getClassReviewList${boardParams.no}`, boardParams], getClassReviewList({
        no: boardParams.no, 
        nowPage : boardParams?.nowPage , 
    }))

    if(status == 'loading'){
        return <Loading />
    }
    
    if(status == 'error'){
        return <div className="nothing">로딩 실패</div>
    }

    return (
        <div>
            {data?.pages && (
                data?.pages[0]?.data && data?.pages[0]?.data.length > 0 ? (
                <>
                    {data?.pages.map((page, idx:number) => {
                        return (
                            <div className="list" key={`CsBoardList${idx}`}>
                                {page?.data?.map((item:{
                                   no?:string,
                                   id?:string,
                                   name?:string,
                                   comment?:string,
                                   reg_date?:string,
                                }, i:number) => (
                                <ReviewArticle 
                                    key={`ReviewArticle${item.no}`}
                                    item={item}
                                />
                                ))}
                            </div>
                        )
                    })}
                
                    <Pagination 
                    currentPage={Number(boardParams?.nowPage ?? 1) } 
                    totalPages={lastPage(data?.pages[0]?.meta.total_results, data?.pages[0]?.meta.page_count)} 
                    result={num => {
                        setBoardParams({
                            ...boardParams,
                            nowPage: num,
                        })
                    }}
                    />
                </>
                ) : (
                    <p className="nothing">등록된 리뷰가 없습니다</p>
                )
            )}

        </div>
    );
}

export default ClassReviewList;