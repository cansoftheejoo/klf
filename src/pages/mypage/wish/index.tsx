import MypageLayout from "@/components/modules/mypage/MypageLayout";
import VideoCard from "@/components/ui/article/VideoCard";
import MoreBtn from "@/components/ui/btn/MoreBtn";
import Loading from "@/components/ui/loading/Loading";
import Pagination from "@/components/ui/pagination/Pagination";
import { getClassBookmarkUpdate } from "@/pages/api/class";
import { getMyWishList } from "@/pages/api/mypage";
import { lastPage } from "@/util/common";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";

const MyWishScreen = () => {
    // const data = [0,0,0,0,0,0,0,0,0,0,0]

    const queryClient = useQueryClient()

    const setBookmark =  useMutation(getClassBookmarkUpdate, {
        onSuccess: res => {

            if(res?.result == 'success'){
                queryClient.invalidateQueries([`getMyWishList`])
            } else {
                alert(res?.msg)
            }
           
        }
    })

    const delWish = (idx:string) => {
        if(!confirm('찜한 강의에서 삭제하시겠습니까?')) return
        setBookmark.mutate({
            no: idx,
            recom_yn : 'Y'
        })
    }

    const [boardParams, setBoardParams] = useState({
        nowPage: 1,
    })

    const { status, data } = useInfiniteQuery([`getMyWishList`, boardParams], getMyWishList({
        nowPage : boardParams?.nowPage , 
    }))

    if(status == 'loading'){
        return <Loading />
    }
    
    if(status == 'error'){
        return <div>로딩 실패</div>
    }

    return (
        <MypageLayout title="찜한 강의"
        subTitle={<span>총 <b>({Number(data?.pages[0]?.meta.total_results)})개의 찜한 강의</b>가 있습니다.</span>}
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
                                  title?:string,
                                  keyword?:string,
                                  list_keyword?:string,
                                  duration?:string,
                                  poster_url?:string,
                                  study_pay_yn:string,
                                }, i:number) => (
                                    <div
                                    key={`CategpryList${i}`}
                                    style={{ position: 'relative' }}
                                    >
                                        <button onClick={() => item?.online_idx ?  delWish(item?.online_idx) : ''} style={{ position: 'absolute', zIndex: 2, left: 10, top: 10 }}><Icon icon="material-symbols:close" fontSize={18} color="#ccc" /></button>
                                        <VideoCard
                                            
                                            light={true}  
                                            store_name={item?.store_name}
                                            poster_url={item?.poster_url}
                                            title={item?.title}
                                            state={item?.study_pay_yn}
                                        />
                                    </div>
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

{/*       
            <MoreBtn
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

export default MyWishScreen;