import { useMutation } from 'react-query';
import styles from './PayResult.module.css'
import { postOrderResult } from '@/pages/api/class';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Loading from '@/components/ui/loading/Loading';
import { AddCommaNum } from '@/util/common';

const PayResult = () => {
    
    const router = useRouter()
    const order_seq = router.query?.order_seq as string


    const { mutate, data, status } = useMutation(postOrderResult, {
        onSuccess: res => {
            // console.log(res)
        }
    })

    useEffect(() => {

        if(order_seq){
            mutate({
                order_seq: order_seq
            })
        }

    },[order_seq])


    if(status == 'loading'){
        return <Loading />
    }
    

    return (
        <div className={styles.container}>
            <h3>결제 {data ? '완료' : '실패'}</h3>
            {data && data?.order_info ? (
                <div className={styles.result}>
                    <p className={styles.code}>주문번호 {data?.order_seq}</p>
                    <div className={styles.info}>
                        <dl>
                            <dt>결제금액</dt>
                            <dd>{AddCommaNum(data?.order_info?.order_price)}원</dd>
                        </dl>
                        <dl>
                            <dt>강의명</dt>
                            <dd>{data?.order_info?.good_name}</dd>
                        </dl>
                        <dl>
                            <dt>결제일</dt>
                            <dd>{data?.order_info?.pay_date}</dd>
                        </dl>
                        <dl>
                            <dt>결제 정보</dt>
                            <dd>{data?.order_info?.card_name}/{data?.order_info?.card_no}</dd>
                        </dl>
                        <dl>
                            <dt>할부</dt>
                            <dd>{data?.order_info?.card_quota}</dd>
                        </dl>
                    </div>
                    <div className={styles.btns}>
                        <button className='mBtn bColor1' onClick={() => router.back()}>뒤로가기</button>
                        <button className='mBtn sColor1' onClick={() => router.push(`/mypage/class/${data?.order_info?.online_idx}`)}>강의 보러가기</button>
                    </div>
                </div>
            ) : (
                <p className="nothing">결제정보를 불러올 수 없습니다</p>
            )}
        </div>
    );
}

export default PayResult;