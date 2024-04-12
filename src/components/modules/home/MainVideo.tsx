// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import VideoCard from '@/components/ui/article/VideoCard';
import { useQuery } from 'react-query';
import { getMainVideo } from '@/pages/api/main';

const MainVideo = ({
    title = ''
}) => {


    const id = title == '무료 강의' ? 'free' : 'new'

    const { data, status } = useQuery(`getMainVideo-${id}`, getMainVideo(id, 10), {
        onSuccess: res => {
            // console.log(res)
        }
    })


    if(status == 'loading'){
        return <p></p>
    }

    if (status == 'error') {
        return <p>데이터 로딩 문제가 발생했습니다</p>;
    }

    if(data?.statusCode == 400){
        return <p className="nothing">데이터 로딩 문제가 발생했습니다</p>;
    }



    return (
        <div className="container">
            <div className="inner">
            <h3>
                <b>{title}</b> <br />
                지금 들어보세요!
            </h3>
            <Swiper
              
              style={{overflow: 'visible'}}
              spaceBetween={20}
              slidesPerView={4.3}
              loopedSlides={2}
              speed={300}
          
              breakpoints={{
                0:{
                    spaceBetween: 10,
                    slidesPerView: 1.2           
                },
                530:{
                    spaceBetween: 10,
                    slidesPerView: 2.2            
                },
                780:{
                    spaceBetween: 10,
                    slidesPerView: 3.5            
                },
                900:{
                    spaceBetween: 10,
                    slidesPerView: 4            
                },
                1400:{
                    spaceBetween: 15,
                    slidesPerView: 4.3             
                },
                 
              }}
            >
                 {data?.map(({
                      no,
                      title,
                      store_name,
                      category,
                      keyword,
                      list_keyword,
                      amount,
                      pay_amount,
                      duration,
                      poster_url,
                      study_pay_yn,
                      type
                }:any, i:number) => (
                <SwiperSlide key={`MainVideo-${no}`} >
                    <VideoCard 
                    light={title == '무료 강의' ? true : false} 
                    no={no}
                    title={title}
                    store_name={store_name}
                    poster_url={poster_url}
                    amount={amount}
                    pay_amount={pay_amount}
                    keyword={keyword}
                    study_pay_yn={study_pay_yn}
                    type={type}
                    />
                </SwiperSlide>
                 ))}
    
            </Swiper>
            </div>

            <style jsx>{`
                .container{overflow: hidden; margin: 60px 0;}
                .container h3{margin-bottom: 38px; font-size: 30px; line-height: 1.2;}
                .container h3 b{color: var(--color1)}

                @media (max-width: 1400px) {
                    .container h3{font-size: 28px;}
 
                }

                @media (max-width: 900px) {
                    .container{margin: 30px 0;}
                    .container h3{font-size: 22px; margin-bottom: 20px;}
 
                }

            `}</style>
        </div>
    );
}

export default MainVideo;