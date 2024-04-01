import MypageLayout from "@/components/modules/mypage/MypageLayout";
import AlertModal from "@/components/ui/alert/AlertModal";
import MyVideoArticle from "@/components/ui/article/MyVideoArticle";
import BottomAddBtn from "@/components/modules/mypage/open/BottomAddBtn";
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { alertToggle } from "@/redux/alert";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getManageClass } from "@/pages/api/mypage";
import Pagination from "@/components/ui/pagination/Pagination";
import { lastPage } from "@/util/common";

const MyOpenClassScreen = () => {

    const sample = [0,0,0,0,0]

    const router = useRouter()
    const type = router.query?.type as string

    const [boardParams, setBoardParams] = useState({
        nowPage: 1,
        type: '',
    })

    useEffect(() => {
        setBoardParams({
            ...boardParams,
            type: type
        })
    },[type])


    const [alertType, setAlertType] = useState('')

    const [selectIdx, setSelectIdx] = useState('')

    const dispatch = useDispatch();

    const handleToggle = () => dispatch(alertToggle());

    const handleAlertConfirm = () => {
        if (alertType == 'del') {
            // 삭제

        } else {
            // 중단

        }

        handleToggle();
    }


    const { data, status } = useQuery([`getManageClass${type}`, boardParams], getManageClass({
        viewType: boardParams.type,
        nowPage: boardParams.nowPage,
    }), {
        onSuccess: res => {
            // console.log(res.data)
        }
    })

    if(status == 'loading'){
        return  <div></div>;
    }

    if (status == 'error') {
        return <p>사이트정보 가져오는 동안 문제가 발생했습니다</p>;
    }


    return (
        <MypageLayout title="강의 관리">

            {data?.data && data?.data.length > 0 ? (
                <>
                    <div className="list">
                    {data?.data.map((item:any, i) => (  
                        <MyVideoArticle
                            key={`myOpenVideo${i}`}
                            idx={i.toString()}
                            onDel={val => {
                                setAlertType('del')
                                setSelectIdx(val)
                            }}
                            onStop={val => {
                                setAlertType('stop')
                                setSelectIdx(val)
                            }}
                            item={item}
                        />
                    ))}
                    </div>
                    <Pagination 
                    currentPage={Number(boardParams?.nowPage ?? 1) } 
                    totalPages={lastPage(data?.meta.total_results, data?.meta.page_count)} 
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
            )}

            {/* <div className="list">
                {sample.map((e, i) => (  
                    <MyVideoArticle
                        key={`myOpenVideo${i}`}
                        idx={i.toString()}
                        onDel={val => {
                            setAlertType('del')
                            setSelectIdx(val)
                        }}
                        onStop={val => {
                            setAlertType('stop')
                            setSelectIdx(val)
                        }}
                    />
                    ))}
                </div>
            <BottomAddBtn /> */}

            
            <AlertModal
                title={
                    alertType == 'del' ? 
                    "강의를 삭제하시겠습니까?" : 
                    "강의 판매를 중지하시겠습니까?"
                }
                info={alertType == 'del' ? 
                    "삭제한 강의는 다시 되돌릴수 없습니다." : 
                    "판매를 재개하시려면 강의 승인을 다시 받아야 합니다."
                }
                onConfirm={handleAlertConfirm}
            />

            <style jsx>{`
                @media (max-width: 900px) {
                    .list{
                        display: grid;  
                        grid-template-columns: 1fr 1fr 1fr;
                        gap: 10px; 
                    }
                }
                @media (max-width: 750px) {
                    .list{
                        display: grid;  
                        grid-template-columns: 1fr 1fr;
                    }
                }
            `}</style>
        </MypageLayout>
    );
}

export default MyOpenClassScreen;