import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

const ClassViewContents = () => {

    const [tabActive, setTabActive] = useState(0) 

    const tabData = [
        '강의 소개',
        '강의 내용',
        '강의 후기',
    ]

    return (
        <div>
            <div className="videoArea">
                <div className="video">
                  
                    <iframe width='auto' height='undefined' src='https://play.mbus.tv/hls/18e5031f12743257' frameborder='0' allowfullscreen style={{ width: '100%', height: 550 }} ></iframe>
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
                        <p></p>
                    )}

                    {tabActive == 1 && (
                        <p></p>
                    )}

                    {tabActive == 2 && (
                        <p></p>
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