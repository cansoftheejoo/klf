import { Icon } from '@iconify/react/dist/iconify.js';
import styles from './dist/MyVideoArticle.module.css';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { alertToggle } from '@/redux/alert';
import { useRouter } from 'next/router';
import ThumbnailImg from '../thumbnail/ThumbnailImg';
import { AddCommaNum } from '@/util/common';
import Image from 'next/image';

const MyVideoArticle = ({
    idx = '',
    onDel = (val:any) => {},
    onStop = (val:any) => {},
    item
}:{
    idx:string,
    onDel:(val:any) => void,
    onStop:(val:any) => void,
    item?: {
        no?:string,
        state?:string,
        title?:string,
        keyword?:string,
        list_keyword?:string,
        pay_amount?:string,
        sale_cnt?:string,
        duration?:string,
        poster_url?:string,
    }
}) => {

    const router = useRouter()

    const [toggle, setToggle] = useState(false)
    const node = useRef<HTMLDivElement | null>(null);

    const stateName = [
        '승인대기중',
        '판매중',
        '판매중지',
    ]

    useEffect(() => {

        const clickOutside = (e:any) => {
            // 모달이 열려 있고 모달의 바깥쪽을 눌렀을 때 창 닫기
            if (toggle && node.current && !node.current.contains(e.target)) {
              setToggle(false);
            }
        };
       
    
        document.addEventListener("mousedown", clickOutside);
    
        return () => {
          // Cleanup the event listener
          document.removeEventListener("mousedown", clickOutside);
        };
    }, [toggle]);



    return (
        <div className={styles.container}>
            <article onClick={() => {}}>
                <div className={styles.img}>
                  
                    {item?.poster_url && (
                        <Image
                            src={item?.poster_url}
                            width={315}
                            height={185}
                            alt={item?.title ?? '썸네일'}
                            style={{ objectFit: 'cover', display: 'block', width: '100%' }}
                        />
                    )}
                </div>
                <div className={styles.txt}>
                    <h5 className='ellipsis2'>{item?.title}</h5>
                    <p className={styles.price}>{AddCommaNum(item?.pay_amount ?? 0)}원</p>
                    <div className={styles.info}>
                        <p className={styles.sell}>{item?.state ? `${stateName[Number(item?.state) - 1]} / ` : ''} 판매: {item?.sale_cnt} 건</p>
                    </div>
                </div>
            </article>
            <div className={styles.more}>
                <button type='button' className={styles.moreBtn}
                onClick={() => setToggle(!toggle)}
                >
                    <Icon icon="pepicons-pencil:dots-y" color='#eee' fontSize={25} />
                </button>
                {toggle && (
                <div className={styles.moreModal} ref={node}>
                    <button onClick={() => router.push(`/mypage/open/write?idx=${item?.no}`)}>강의 편집</button>
                    <button onClick={onDel}>강의 삭제</button>
                    <button onClick={onStop}>강의 {item?.state == '3' ? '재개' : '중지'}</button>
                </div>
                )}
            </div>
        </div>
    );
}

export default MyVideoArticle;