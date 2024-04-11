import Link from "next/link";
import styles from "./dist/VideoCard.module.css";
import ThumbnailImg from "../thumbnail/ThumbnailImg";
import { AddCommaNum } from "@/util/common";
import Image from "next/image";

const VideoCard = ({
    light = false,
    state,
    study_pay_yn = 'N',
    title,
    store_name,
    poster_url,
    amount,
    pay_amount,
    keyword,
    no,
    link,
    start_date,
    end_date,
    type
}:any) => {
    return (
        <Link href={link ? link : `/class/${no}`} className={`${styles.container} ${light ? styles.light : ''}`}>
            <div className={styles.img}>
                {type && type == '2' && (
                    <span className={styles.isPay}>무료강의</span>
                )}
                {poster_url ? (
                    <Image
                        src={poster_url}
                        width={345}
                        height={190}
                        alt={title ?? '썸네일'}
                        style={{ objectFit: 'cover', display: 'block', width: '100%' }}
                    />
                ): (
                    <div className={styles.empty}></div>
                )}
                 {study_pay_yn && study_pay_yn == 'Y' && (
                    <span className={`${styles.state} ${styles.ing }`}>수강중</span>
                )}
                {state && (
                    <span className={`${styles.state} ${state == 'Y' ? styles.end : styles.ing}`}>{state == 'Y' ? '수강완료' : '수강중'}</span>
                )}
            </div>
            <div className={styles.txt}>
                <h5 className="ellipsis2">{title}</h5>
                <p className={styles.user}>{store_name}</p>
                {start_date && end_date && (
                    <p className={styles.user}>수강기간 {start_date.slice(0,10)} ~ {end_date.slice(0,10)}</p>
                )}
                {!light && (
                <>
                    {keyword && (
                    <ul>
                        {keyword.split(',').length > 0 && keyword.split(',').map((word:string) => <li key={`${no}${word}`}>{word}</li>)}
                    </ul>
                    )}
                    <div className={styles.price}>
                        {amount && <span>{AddCommaNum(amount)}원</span>}
                        {pay_amount && <b>{AddCommaNum(pay_amount)}원</b>}
                    </div>
                </>
                )}
            </div>
        </Link>
    );
}

export default VideoCard;