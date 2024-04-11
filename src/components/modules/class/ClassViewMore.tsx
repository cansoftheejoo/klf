import VideoCard from "@/components/ui/article/VideoCard";
import MoreBtn from "@/components/ui/btn/MoreBtn";
import Loading from "@/components/ui/loading/Loading";
import Pagination from "@/components/ui/pagination/Pagination";
import { getCategoryClassList, getCategoryInfo, getClassReviewList } from "@/pages/api/class";
import { lastPage } from "@/util/common";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";

const ClassViewMore = ({
    idx
}:{
    idx?:string
}) => {


    const [boardParams, setBoardParams] = useState({
        nowPage: 1,
        no: '',
    })

    useEffect(() => {
        if(idx){
            setBoardParams({
                ...boardParams,
                no: idx
            })
        }
    },[idx])

    const { status, data, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery([`getCategoryClassList${boardParams.no}`, boardParams], getCategoryClassList({
        category: boardParams.no, 
        nowPage : boardParams?.nowPage , 
    }), {
        getNextPageParam: (lastPages, pages) => {
            const last = lastPage(lastPages?.meta?.total_results, lastPages?.meta?.page_count)
            return last > Number(lastPages?.meta?.page) ? Number(lastPages?.meta?.page) + 1 : false
        },
    })

    if(status == 'loading'){
        return <Loading />
    }
    
    if(status == 'error'){
        return <div className="nothing">로딩 실패</div>
    }


    return (
        <div className="container">
             <div className="inner">
               <header>
                    <h3><b>가맹사업법령</b> 강의</h3>
               </header>

               {data?.pages && (
                data?.pages[0]?.data && data?.pages[0]?.data.length > 0 ? (
                <>
                    {data?.pages.map((page, idx:number) => {
                        return (
                            <div className="list" key={`CsBoardList${idx}`}>
                                {page?.data?.map(({
                                     no,
                                     title,
                                     store_name,
                                     category,
                                     keyword,
                                     list_keyword,
                                     amount,
                                     pay_amount,
                                     duration,
                                     poster_url,
                                }:any, i:number) => (
                                    <VideoCard 
                                        key={`CategoryList${no}`}
                                        light={true}  
                                        title={title}
                                        no={no}
                                        store_name={store_name}
                                        poster_url={poster_url}
                                        />
                                ))}
                            </div>
                        )
                    })}
                
                  
                </>
                ) : (
                    <p className="nothing">등록된 강의가 없습니다</p>
                )
            )}

            {hasNextPage && (
                <MoreBtn 
                    pressFunc={fetchNextPage}
                />
            )}
             </div>
            
            <style jsx>{`
                .container{background: #292929; padding:  var(--vertical-padding) 0;}
                header{margin-bottom: 40px;}
                header h3{font-size: 30px; font-weight: 700;}
                header h3 b{color: var(--color1);}

                .list{
                    display: grid; 
                    grid-template-columns: 1fr 1fr 1fr 1fr; 
                    gap: 30px; 
                }
               
                @media (max-width: 1400px) {
                    header{
                        max-width: 960px;
                        margin: 0 auto;
                        margin-bottom: 40px;
                    }
                    .list {
                        max-width: 960px;
                        margin: 0 auto;
                        grid-template-columns: 1fr 1fr 1fr; /* 3개의 열로 변경 */
                    }
                }
                @media (max-width: 900px) {
                    header{
                        max-width: 530px;
                        margin-bottom: 20px;
                    }
                    header h3{font-size: 20px;}
                    .list {
                        grid-template-columns: 1fr 1fr; /* 2개의 열로 변경 */
                        gap: 15px;
                        max-width: 530px;
                    }
                }
            `}</style>
        </div>
    );
}

export default ClassViewMore;