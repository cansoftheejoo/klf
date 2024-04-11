import MypageLayout from "@/components/modules/mypage/MypageLayout";
import VideoCard from "@/components/ui/article/VideoCard";
import MoreBtn from "@/components/ui/btn/MoreBtn";
import Loading from "@/components/ui/loading/Loading";
import Pagination from "@/components/ui/pagination/Pagination";
import { getMySubscribe } from "@/pages/api/mypage";
import { lastPage } from "@/util/common";
import { useState } from "react";
import { useInfiniteQuery } from "react-query";

const MyClassScreen = () => {


    const [boardParams, setBoardParams] = useState({
        nowPage: 1,
    })

    const { status, data } = useInfiniteQuery([`getMySubscribe`, boardParams], getMySubscribe({
        nowPage : boardParams?.nowPage , 
    }))

    if(status == 'loading'){
        return <Loading />
    }
    

    if(status == 'error'){
        return <div>로딩 실패</div>
    }


    return (
        <MypageLayout title="수강중인 강의" 
            subTitle={<span>총 <b>({Number(data?.pages[0]?.meta.total_results)})개의 수강 중인 강의</b>가 있습니다.</span>}
        >
            {data?.pages && (
                data?.pages[0]?.data && data?.pages[0]?.data.length > 0 ? (
                <>
                    {data?.pages.map((page, idx:number) => {
                        return (
                            <div className="list" key={`MyWishList${idx}`}>
                                {page?.data?.map((item:{
                                  no?:string,
                                  online_idx?:string,
                                  store_name?:string,
                                  study_state?:string,
                                  title?:string,
                                  keyword?:string,
                                  list_keyword?:string,
                                  duration?:string,
                                  poster_url?:string,
                                  start_date?:string,
                                  end_date?:string,
                                }, i:number) => (
                                    <VideoCard
                                        key={`CategpryList${i}`}
                                        light={true}  
                                        state={item?.study_state}
                                        store_name={item?.store_name}
                                        poster_url={item?.poster_url}
                                        title={item?.title}
                                        start_date={item?.start_date}
                                        end_date={item?.end_date}
                                        link={`/mypage/class/${item?.online_idx}`}
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

         
            {/* <MoreBtn
                pressFunc={() => {}}
            /> */}
            <style jsx>{`
            .container{
                padding-bottom: 50px;
            }
            .list{
                display: grid; 
                grid-template-columns: 1fr 1fr 1fr;
                gap: 50px; 
            }
            
            @media (max-width: 1400px) {
                .list {
                    max-width: 960px;
                    margin: 0 auto;
                    grid-template-columns: 1fr 1fr 1fr; /* 3개의 열로 변경 */
                    gap: 20px;
                }
            }
            @media (max-width: 1130px) {
                .list {
                    grid-template-columns: 1fr 1fr; /* 2개의 열로 변경 */
                    gap: 15px;
                    max-width: 530px;
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
        </MypageLayout>
    );
}

export default MyClassScreen;