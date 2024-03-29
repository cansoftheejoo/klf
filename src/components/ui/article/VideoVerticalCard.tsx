import Link from "next/link";
import styles from "./dist/VideoVerticalCard.module.css";
import Image from "next/image";

const VideoVerticalCard = ({
    item
}:{
    item: {
        no?:string,
        title?:string,
        keyword?:string,
        list_keyword?:string,
        store_id?:string,
        duration?:string,
        poster_url?:string,
    }
}) => {

    
    return (
        <Link href={`/class/${item.no}`} className={styles.container}>
            <div className={styles.img}>
                {item?.poster_url && (
                <Image 
                    src={item?.poster_url}
                    width={170}
                    height={95}
                    alt={item?.title ?? ''}
                    style={{ objectFit: 'cover' }}
                />
                )}
            </div>
            <div className={styles.txt}>
                <h5 className="ellipsis2">{item?.title}</h5>
                <p className={styles.min}>{item?.duration}</p>
             
            </div>
        </Link>
    );
}

export default VideoVerticalCard;
