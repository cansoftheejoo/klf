import Link from "next/link";
import styles from "./dist/VideoCard.module.css";
import ThumbnailImg from "../thumbnail/ThumbnailImg";

const VideoCard = ({
    light = false,
    state = null,
    title,
    store_name,
    poster_url,
}:any) => {
    return (
        <Link href={'/class'} className={`${styles.container} ${light ? styles.light : ''}`}>
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
                    <ul>
                        <li>지식재산권</li>
                        <li>지식재산권</li>
                    </ul>
                    <div className={styles.price}>
                        <span>56,500원</span>
                        <b>49,500원</b>
                    </div>
                </>
                )}
            </div>
        </Link>
    );
}

export default VideoCard;