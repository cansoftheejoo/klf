import Link from "next/link";
import styles from "./dist/VideoCard.module.css";
import ThumbnailImg from "../thumbnail/ThumbnailImg";
import { AddCommaNum } from "@/util/common";

const VideoCard = ({
    light = false,
    state = null,
    title,
    store_name,
    poster_url,
    amount,
    pay_amount,
    keyword,
    no,
}:any) => {
    return (
        <Link href={`/class/${no}`} className={`${styles.container} ${light ? styles.light : ''}`}>
            <div className={styles.img}>
                <ThumbnailImg 
                    img={poster_url}
                />
                {state !== null && (
                    <span className={`${styles.state} ${state == 'y' ? styles.end : styles.ing}`}>{state == 'y' ? '수강완료' : '수강중'}</span>
                )}
            </div>
            <div className={styles.txt}>
                <h5 className="ellipsis2">{title}</h5>
                <p className={styles.user}>{store_name}</p>
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