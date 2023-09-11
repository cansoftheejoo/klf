import { useState } from "react";
import bg from '/public/images/count-banner-bg.png';

const MainCountBanner = () => {

    const [categoryCount, setCategoryCount] = useState(123)
    const [classCount, setClassCount] = useState(123)

    return (
        <div className="inner">
            <div className="container" style={{backgroundImage: `url(/images/count-banner-bg.png)`}}>
                <h5>변호사 전문 강의 프랜차이즈 로펌</h5>
                <div className="num">
                    <span>준비된 강의</span>
                    <div className="area">
                        {categoryCount.toString().split('').map((num, i) => (
                        <b key={`categoryCount-${i}`}>{num}</b>
                        ))}
                        <span>개 영역</span>
                    </div>
                    <div className="area">
                        {classCount.toString().split('').map((num, i) => (
                        <b key={`categoryCount-${i}`}>{num}</b>
                        ))}
                        <span>개 강의</span>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .container{background: #444 no-repeat center right 30px; padding: 40px 50px; border-radius: 20px; margin: 60px 0;}
                .container h5{font-size: 20px; font-weight: 700; margin-bottom: 10px;}
                .container .num .area{display: inline-block;}
                .container .num span{font-size: 28px; font-weight: 700; margin-right: 10px;}
                .container .num b{font-size: 28px; background: #666; border-radius: 10px; display: inline-flex; align-items: center; justify-content: center; height: 48px; width: 33px; margin: 0 3px;}

                @media (max-width: 1400px) {
                    .container{background-size: 220px;}
                    .container h5{font-size: 18px;}
                    .container .num span{font-size: 22px;}
                    .container .num b{font-size: 24px; height: 40px;}
                }
                @media (max-width: 900px) {
                    .container{background-size: 100px; background-position: bottom -10px right -10px; padding: 20px; border-radius: 10px; padding-right: 40px; margin: 20px 0;}
                    .container h5{font-size: 16px; font-weight: 400;}
                    .container .num .area{margin: 5px 0;}
                    .container .num span{font-size: 18px;}
                    .container .num b{font-size: 18px; height: 30px; width: 25px; border-radius: 5px;}
                }
            `}</style>
        </div>
    );
}

export default MainCountBanner;