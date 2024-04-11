import MypageLayout from "@/components/modules/mypage/MypageLayout";
import AlertModal from "@/components/ui/alert/AlertModal";
import MyVideoArticle from "@/components/ui/article/MyVideoArticle";
import BottomAddBtn from "@/components/modules/mypage/open/BottomAddBtn";
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { alertToggle } from "@/redux/alert";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getManageClass, postAddClassDel, postAddClassRestart, postAddClassStop } from "@/pages/api/mypage";
import Pagination from "@/components/ui/pagination/Pagination";
import { lastPage } from "@/util/common";
import Loading from "@/components/ui/loading/Loading";

const MyOpenClassScreen = () => {


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

    // 알림창 active
    const [activeAlert, setActiveAlert] = useState(false)
    const toggle = () => setActiveAlert(!activeAlert)

    // 알림창 타입
    const [alertType, setAlertType] = useState('')

    // 알림창 확인시 기능
    const [onConfirm, setOnConfirm] = useState<() => void>(() => {})

    const queryClient = useQueryClient()

    // 선택 idx
    const [selectIdx, setSelectIdx] = useState('')

    // 강의 삭제
    const setClassDel = useMutation(postAddClassDel, {
        onSuccess: res => {
            toggle()
            if(res?.result == 'success'){
                alert('강의 삭제가 완료되었습니다')
                queryClient.invalidateQueries([`getManageClass${type}`])
            } else {
                alert(res?.msg)
            }
        }
    })
    const onClassDel = () =>{
        setClassDel.mutate({
            "no" : selectIdx,             
        })
    }

    // 강의 중지
    const setClassStop = useMutation(postAddClassStop, {
        onSuccess: res => {
            toggle()
             
            if(res?.result == 'success'){
                alert('강의 중지가 완료되었습니다')
                queryClient.invalidateQueries([`getManageClass${type}`])
            } else {
                alert(res?.msg)
            }
        }
    })
    const onClassStop = () => {
        setClassStop.mutate({
            "no" : selectIdx         
        })
    }

    // 강의 재개
    const setClassRestart = useMutation(postAddClassRestart,{
        onSuccess: res => {
            toggle()
             
            if(res?.result == 'success'){
                alert('강의 재개가 신청되었습니다')
                queryClient.invalidateQueries([`getManageClass${type}`])
            } else {
                alert(res?.msg)
            }
        }
    })
    const onClassRestart = () => {
        setClassRestart.mutate({
            "no" : selectIdx         
        })
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
        return  <Loading />
    }

    if (status == 'error') {
        return <p>사이트정보 가져오는 동안 문제가 발생했습니다</p>;
    }


    return (
        <MypageLayout title="강의 관리">

            {data?.data && data?.data.length > 0 ? (
                <>
                    <div className="list">
                    {data?.data.map((item:any, i:number) => (  
                        <MyVideoArticle
                            key={`myOpenVideo${i}`}
                            idx={i.toString()}
                            onDel={val => {
                                setAlertType('del')
                                setSelectIdx(item.no)

                                toggle()
                            }}
                            onStop={val => {
                                setAlertType(item?.state == '3' ? 'restart' : 'stop')
                                setSelectIdx(item.no)
                              
                                toggle()
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


            
            <AlertModal
                title={
                    alertType == 'del' ? 
                    "강의를 삭제하시겠습니까?" : 
                    ( alertType == 'stop' ? "강의 판매를 중지하시겠습니까?" : '강의 판매를 재개하시겠습니까')
                }
                info={alertType == 'del' ? 
                    "삭제한 강의는 다시 되돌릴수 없습니다." : 
                    "확인시 바로 판매중으로 전환됩니다."
                }
                // onConfirm={handleAlertConfirm}
                active={activeAlert}
                toggle={toggle}
                onConfirm={() => {
                    if(alertType == 'del'){
                        onClassDel()
                    } else if(alertType == 'restart'){
                        onClassRestart()
                    } else {
                        onClassStop()
                    }
                }}
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