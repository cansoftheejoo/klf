import Image from "next/image";
import Link from "next/link";
import ThumbnailImg from "../thumbnail/ThumbnailImg";

const ClassCard = ({
    link = '',
    poster_url = '',
    title = '',
    maker = '',
    min = 0,
    study_pay_yn = 'N'
}) => {
    return (
        <>
            <div className="container">
                <Link href={link}>
                    {study_pay_yn && study_pay_yn == 'Y' && (
                        <span className="state">수강중</span>
                    )}
                    <Image 
                        src={poster_url}
                        width={450}
                        height={260}
                        alt={title}
                        style={{ objectFit: 'cover' }}
                    />
                    <div className="txt">
                        <h5 className="ellipsis1">{title}</h5>
                        <p>{maker} ・ {min}분</p>
                    </div>
        
                   
                </Link>
            </div>
            <style jsx>{`
                .container{flex: 1; max-width: 450px; background-color: #fff; border-radius: 10px; overflow: hidden; border: 1px solid #666; position: relative;}
                .img{display: block; height: 220px; background: #ccc no-repeat center center/cover; position: relative;}
                .state{font-size: 12px; background: var(--color1); color: #333; font-weight: 500; display: inline-block; padding: 15px 10px; position: absolute; z-index: 2; right: 0; top: 0; border-bottom-left-radius: 10px;}
                .txt{padding: 20px;}
                .txt h5{font-size: 16px; font-weight: 500; color: #333}
                .txt p{font-size: 13px; color: #888}

                @media (max-width: 1400px) {
                    .img{height: 180px;}
                    .txt{padding: 15px;}
                }

                @media (max-width: 900px) {
                    .img{height: 150px;}
                    .txt h5{font-size: 14px;}
                    .txt p{font-size: 12px;}
                }
            `}</style>
        </>
    );
}

export default ClassCard;