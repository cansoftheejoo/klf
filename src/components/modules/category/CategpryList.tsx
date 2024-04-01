import VideoCard from "@/components/ui/article/VideoCard";
import MoreBtn from "@/components/ui/btn/MoreBtn";
import Pagination from "@/components/ui/pagination/Pagination";
import { useCategoryClassList } from "@/hook/class";
import { getCategoryClassList } from "@/pages/api/class";
import { lastPage } from "@/util/common";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";

const CategoryList = ({
    sort = 'a'
}) => {

    const router = useRouter()

    const no = router.query?.no as string

    const [boardParams, setBoardParams] = useCategoryClassList()

    useEffect(() => {
        setBoardParams({
            ...boardParams,
            category: no,
        })
    },[no])

    
    const { data, status } = useInfiniteQuery([`getCategoryClassList${no}`, boardParams], getCategoryClassList({
        category: boardParams?.category ?? '1',
        sort: boardParams?.sort ?? '1',
        nowPage: boardParams?.nowPage ?? 1,

    }), {
        onSuccess: res => {
            // console.log(res)
        }
    })


    if(status == 'loading'){
        return <p></p>
    }

    if (status == 'error') {
        return <p>데이터 로딩 문제가 발생했습니다</p>;
    }

    return (
        <div className="container">

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
                    <p className="nothing">등록된 강의가 없습니다</p>
                )
            )}

         
                
            {/* <MoreBtn 
                pressFunc={() => {}}
            />
             */}

            <style jsx>{`
                .container{
                    padding-bottom: 50px;
                }
                .list{
                    display: grid; 
                    grid-template-columns: 1fr 1fr 1fr 1fr; 
                    gap: 30px; 
                }
               
                @media (max-width: 1400px) {
                    .list {
                        max-width: 960px;
                        margin: 0 auto;
                        grid-template-columns: 1fr 1fr 1fr; /* 3개의 열로 변경 */
                    }
                }
                @media (max-width: 900px) {
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

export default CategoryList;