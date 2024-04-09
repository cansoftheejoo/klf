// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';

import styles from './dist/MainBanner.module.css';
import { useQuery } from 'react-query';
// import { getMainBanner } from '@/pages/api/get';
import Link from 'next/link';
import { getMainBanner } from '@/pages/api/main';
import { imgUrl } from '@/util/common';


interface Banner {
    idx: number;
    link: string;
    img: string;
    title1: string;
    title2: string;
  }

 

const MainBanner = () => {

    
    const { data, status } = useQuery('getMainBanner', getMainBanner, {
        onSuccess: res => {
            // console.log(res)
        }
    })


    if(status == 'loading'){
        return <div className="inner"><div className={styles.container}><div className={styles.empty}></div></div></div>
    }

    if (status == 'error') {
        return <p className="nothing">배너를 가져오는 동안 문제가 발생했습니다</p>;
    }
    

    return (
        <div className={`${styles.container}`}>
            {/* 
                autoplay={getBanner?.data?.data.length > 1 ? {
                delay: 5000,
                pauseOnMouseEnter: true,
            } : false}
            */}
            <div className='inner'>
                {/* {getBanner?.data?.data && ( */}
                <Swiper
              
                style={{overflow: 'visible'}}
                spaceBetween={35}
                slidesPerView={1}
                loopedSlides={2}
                speed={1500}
            
                modules={[Autoplay ]}
                breakpoints={{
                    0:{
                        spaceBetween: 10             
                    },
                    900:{
                        spaceBetween: 25             
                    },
                    1400:{
                        spaceBetween: 35             
                    },
                   
                }}
              >
                {data?.map(({
                    img,
                    link,
                    target,
                    title,
                    sub_title,
                    contents,
                }:any, i:number) => (
                <SwiperSlide key={i} >
          
                    <div className={styles.slide} style={{backgroundImage: `url(${imgUrl(img)})`}}>
                        <Link href={link ? link : '/'} target={target == 'new' ? '_blank' : '_self'}>
                         
                                <h3>{title}</h3>
                                <p className={styles.sub}>{sub_title}</p>
                                <p className={styles.info}>{contents}</p>
                        </Link>
                    </div>
                   
                </SwiperSlide>
                 ))}

               
    
              
    
            
                </Swiper>
                {/* )} */}
            </div>
        </div>
    );
}

export default MainBanner;