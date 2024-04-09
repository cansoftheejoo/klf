import CategorySub from "@/components/modules/category/CategorySub";
import ClassViewList from "@/components/modules/class/ClassViewList";
import ClassViewMore from "@/components/modules/class/ClassViewMore";
import PgModal from "@/components/modules/class/pg/PgModal";
import { getClassView, postUpdateVideoView } from "@/pages/api/class";
import { postUserData } from "@/pages/api/post";
import { ClassViewType } from "@/type/class";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import styles from './ClassViewModule.module.css'
import ClassBookMark from "./ClassBookMark";
import { Icon } from "@iconify/react";
import { AddCommaNum, formatTime } from "@/util/common";
import Image from "next/image";
import ClassReviewModule from "./ClassReviewModule";
import { useCheckSignIn } from "@/hook/common";
import Loading from "@/components/ui/loading/Loading";

const MyClassViewModule = ({
    data
}:any) => {

    const router = useRouter()
    const idx = router.query?.idx as string

    const tabData = [
        '강의 소개',
        '강의 후기',
    ]

    const isLoggedIn = useCheckSignIn();

    const [tabActive, setTabActive] = useState(0) 

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
                                <iframe 
                                    width='auto'
                                    height='undefined' 
                                    src={`https://play.mbus.tv/${item.object_id}?label=${isLoggedIn?.userid}${idx}`}
                                    frameBorder='0' 
                                    allowFullScreen 
                                    style={{ width: '100%', height: 550 }} 
                                ></iframe>
                               
                            </div>
                        </div>
                        <div className={styles.action}>
                            <ClassBookMark />
                            <button>
                                <Icon icon="lucide:share" color="#fff" fontSize={24} />
                            </button>
                        </div>
                        <div className={styles.contents}>
                            <div className={styles.tab}>
                                {tabData.map((e, i) => (
                                    <button 
                                    key={`contentsTab${i}`}
                                    className={tabActive == i ? 'active' :''}
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
                                    <ClassReviewModule study_pay_yn={'Y'} />
                                )}

                            
                            </div>
                        </div>
                        
                    </div>
                    <div className={styles.list}>
                       <div className={styles.fix}>
                        <ClassViewList 
                        store_id={item?.store_id}
                        list_keyword={item?.list_keyword}
                        />
                       </div>
                    </div>
                </div>
            </div>
            <ClassViewMore />

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

export default MyClassViewModule;