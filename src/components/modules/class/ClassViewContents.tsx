import { useCheckSignIn } from "@/hook/common";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from './ClassViewContents.module.css'
import ClassReviewModule from "./ClassReviewModule";
import { ClassViewType } from "@/type/class";

const ClassViewContents = ({
    item,
}:{
    item:ClassViewType
}) => {

    const router = useRouter()
    const idx = router.query?.idx as string

    const isLoggedIn = useCheckSignIn();

    const [tabActive, setTabActive] = useState(1) 

    const tabData = [
        '강의 소개',
        // '강의 내용',
        '강의 후기',
    ]

    return (
        <div>
            <div className="videoArea">
                <div className="video">
                  
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
            <div className="action">
                <button>
                    <Icon icon="bi:bookmark-plus" color="#fff" fontSize={22} />
                </button>
                <button>
                    <Icon icon="lucide:share" color="#fff" fontSize={22} />
                </button>
            </div>
            <div className="contents">
                <div className="tab">
                    {tabData.map((e, i) => (
                        <button 
                        key={`contentsTab${i}`}
                        className={tabActive == i ? 'active' :''}
                        onClick={() => setTabActive(i)}
                        >{e}</button>
                    ))}
                </div>
                <div className="tabContents">
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
                        <ClassReviewModule />
                    )}

                
                    {/* {memberData?.qualification && (
                    <dd dangerouslySetInnerHTML={{ __html: memberData?.qualification }} />
                    )} */}
                </div>
            </div>
            <style jsx>{`
                .videoArea{border-bottom: 5px solid #1c1c1c; padding-bottom: var(--vertical-padding);}
                .video{background: #222;}

                .action{display: none; align-items: center; justify-content: flex-end; gap: 10px;}

                .tab{padding: 30px 0; display: flex; gap: 50px;}
                .tab button{font-size: 18px; font-weight: 500; color: #fff; border-bottom: 3px solid transparent; padding-bottom: 5px;}
                .tab button.active{border-color: var(--color1);}

                .tabContents{padding: 30px 0;}

                @media (max-width: 1400px) {
                    .videoArea{padding-bottom: 30px}
                }
                @media (max-width: 900px) {
                    .videoArea{border: none}
                    .action{display: flex;}

                    .tab{border-bottom: 1px solid #222; padding-bottom: 0}
                    .tab button{flex: 1; font-size: 14px; padding-bottom: 10px;}
                }
            `}</style>
        </div>
    );
}

export default ClassViewContents;