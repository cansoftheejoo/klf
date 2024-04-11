import ClassViewList from "@/components/modules/class/ClassViewList";
import ClassViewMore from "@/components/modules/class/ClassViewMore";
import PgModal from "@/components/modules/class/pg/PgModal";
import { ClassViewType } from "@/type/class";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from './ClassViewModule.module.css'
import ClassBookMark from "./ClassBookMark";
import { Icon } from "@iconify/react";
import { AddCommaNum, formatTime } from "@/util/common";
import Image from "next/image";
import ClassReviewModule from "./ClassReviewModule";
import { useCheckSignIn } from "@/hook/common";
import Loading from "@/components/ui/loading/Loading";
import AlertModal from "@/components/ui/alert/AlertModal";

const ClassViewModule = ({
    data
}:any) => {

    const router = useRouter()
    const idx = router.query?.idx as string
    const pay = router.query?.pay as string

    const tabData = [
        '강의 소개',
        '강의 후기',
    ]

    const isLoggedIn = useCheckSignIn();

    const [tabActive, setTabActive] = useState(0) 

    const [activeAlertModal, setActiveAlertModal] = useState(false)

    useEffect(() => {
        if(pay == 'fail'){
            setActiveAlertModal(true)
        }
    },[pay])
    
    const [activePgModal, setActivePgModal] = useState(false)


    // if(data?.resultCode == 102 || data?.resultCode == 101) return <div style={{ padding: '30vh 0' }}><p className="nothing">수강중인 동영상이 아닙니다. <br />이전 페이지로 이동합니다</p></div>

    const item:ClassViewType = data

    return (
        <div>
             <div className="inner">
                <div className={styles.container}>
                    <div className={styles.header}>
                         <header>
                            <h3 className="ellipsis1">{item?.title}</h3>
                            <p>{item?.store_name} {item?.duration ? ` · ${formatTime(item?.duration)}` : ''}</p>
                        </header>
                        <div className={styles.action}>
                            <ClassBookMark />
                            <button>
                                <Icon icon="lucide:share" color="#fff" fontSize={26} />
                            </button>
                        </div>
                    </div>
                    <div className={styles.contents}>
                        <div className={styles.videoArea}>
                            <div className={styles.video}>
                                {/* https://play.mbus.tv/[배포id]?label=[로그인한 아이디+study_idx] */}
                                {item?.type == '1' ? (
                                    item?.poster_url && (
                                        <Image
                                            src={item?.poster_url}
                                            width={883}
                                            height={550}
                                            alt={item?.title ?? '썸네일'}
                                            style={{ objectFit: 'cover' }}
                                        />
                                    )
                                ) : (
                                    item?.object_id && (<iframe 
                                        width='auto'
                                        height='undefined' 
                                        src={`https://play.mbus.tv/${item.object_id}?label=${isLoggedIn?.userid}${idx}`}
                                        frameBorder='0' 
                                        allowFullScreen 
                                        style={{ width: '100%', height: 550 }} 
                                    ></iframe>)
                                )}
                                
                          
                            </div>
                        </div>
                        <div className={styles.action}>
                            <ClassBookMark />
                            <button>
                                <Icon icon="lucide:share" color="#fff" fontSize={24} />
                            </button>
                        </div>
                        <div className={styles.mobilePrice}>
                            <div className={styles.priceBox}>
                                {item.study_pay_yn == 'N' ? (
                                    <div className={styles.pay}>
                                        {item?.type == '1' ? (
                                        <>
                                            <p className={styles.price}>
                                                <b>{AddCommaNum(item?.pay_amount ?? 0)}원</b>
                                                {item?.amount && <span>{AddCommaNum(item?.amount)}원</span>}
                                            </p>
                                            <button className="mBtn sColor1 wBtn" onClick={() => {
                                                if(isLoggedIn){
                                                    setActivePgModal(true)
                                                } else {
                                                    if(confirm('로그인 후 이용이 가능합니다. 로그인 페이지로 이동하시겠습니까?')){
                                                        router.push('/login')
                                                    }
                                                }
                                            }}>결제하기</button>
                                        </>
                                        ) : (
                                            <div className={styles.result}>
                                                <p className={styles.message}>무료 강의입니다.<br /></p>
                                            </div>
                                        )}
                                    
                                    </div>
                                ) : (
                                <div className={styles.result}>
                                    <p className={styles.message}>수강중인 강의입니다.<br /></p>
                                    <button className="mBtn sColor1 wBtn" onClick={() => router.push(`/mypage/class/${idx}`)}>강의 보러가기</button>
                                </div>
                                )}
                            </div>
                        </div>
                        <div className={styles.contents}>
                            <div className={styles.tab}>
                                {tabData.map((e, i) => (
                                    <button 
                                    key={`contentsTab${i}`}
                                    className={tabActive == i ? styles.active :''}
                                    onClick={() => setTabActive(i)}
                                    >{e}</button>
                                ))}
                            </div>
                            <div className={styles.tabContents}>
                                {tabActive == 0 && (
                                    <div className={styles.classContents}>
                                        {item?.intro && (
                                        <section className={styles.intro}>
                                            <h3>강의 소개</h3>
                                            <div dangerouslySetInnerHTML={{ __html: item?.intro }} />
                                        </section>
                                        )}
                                        {item?.contents && (
                                        <section className={styles.contents}>
                                            <h3>강의 내용</h3>
                                            <div dangerouslySetInnerHTML={{ __html: item?.contents }} />
                                        </section>
                                        )}
                                    </div>
                                )}

                                {tabActive == 1 && (
                                    <ClassReviewModule study_pay_yn={item?.study_pay_yn} />
                                )}

                            
                            </div>
                        </div>
                        
                    </div>
                    <div className={styles.list}>
                       <div className={styles.fix}>
                        <div className={styles.priceBox}>
                            {item.study_pay_yn == 'N' ? (
                                <div className={styles.pay}>
                                    {item?.type == '1' ? (
                                    <>
                                        <p className={styles.price}>
                                            <b>{AddCommaNum(item?.pay_amount ?? 0)}원</b>
                                            {item?.amount && <span>{AddCommaNum(item?.amount)}원</span>}
                                        </p>
                                        <button className="mBtn sColor1 wBtn" onClick={() => {
                                            if(isLoggedIn){
                                                setActivePgModal(true)
                                            } else {
                                                if(confirm('로그인 후 이용이 가능합니다. 로그인 페이지로 이동하시겠습니까?')){
                                                    router.push('/login')
                                                }
                                            }
                                        }}>결제하기</button>
                                    </>
                                    ) : (
                                        <div className={styles.result}>
                                            <p className={styles.message}>무료 강의입니다.<br /></p>
                                        </div>
                                    )}
                                  
                                </div>
                            ) : (
                            <div className={styles.result}>
                                <p className={styles.message}>수강중인 강의입니다.<br /></p>
                                <button className="mBtn sColor1 wBtn" onClick={() => router.push(`/mypage/class/${idx}`)}>강의 보러가기</button>
                            </div>
                            )}
                        </div>
                       <ClassViewList 
                       store_id={item?.store_id}
                       list_keyword={item?.list_keyword}
                       />
                       </div>
                    </div>
                </div>
            </div>
            <ClassViewMore idx={item?.category} />

            <AlertModal 
                title="결제가 취소되었습니다"
                active={activeAlertModal}
                toggle={() => setActiveAlertModal(!activeAlertModal)}
                useCancle={false}
                onConfirm={() => {
                    router.back()
                }}
            />

            <PgModal
             active={activePgModal}
             idx={item.no}
            />
  
            <style jsx global>{`
                #header{position: relative;}
            `}</style>
        </div>
    );
}

export default ClassViewModule;