import Image from "next/image";
import Link from "next/link";
import ThumbnailImg from "../thumbnail/ThumbnailImg";
import styles from "./ClassCard.module.css";

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
            <div className={styles.container}>
                <Link href={link} >
                    <div className={styles.img}>
                        {study_pay_yn && study_pay_yn == 'Y' && (
                            <span className="state">수강중</span>
                        )}
                        <Image 
                            src={poster_url}
                            width={450}
                            height={260}
                            alt={title}
                            style={{ objectFit: 'cover', display: 'block', width: '100%' }}
                        />
                    </div>
                    <div className={styles.txt}>
                        <h5 className="ellipsis1">{title}</h5>
                        <p>{maker} ・ {min}분</p>
                    </div>
        
                   
                </Link>
            </div>
     
        </>
    );
}

export default ClassCard;