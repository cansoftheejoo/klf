import { getProfitPrice } from "@/pages/api/mypage";
import { AddCommaNum } from "@/util/common";
import { useQuery } from "react-query";

const MyProfitView = () => {

    const { data, status } = useQuery('getProfitPrice', getProfitPrice, {
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

    if(data?.result != 'success') return

    /*
    "tot_pay_amount": "240000",   //총 판매 금액
    "tot_charge_amount": 48000,   //총 수수료
    "tot_in_amount": 192000,   //출금 가능 금액
    "tot_out_amount": "76800"  //출금 완료 금액

    */

    return (
        <div className="container">
            <dl>
                <dt>출금 가능 수익금</dt>
                <dd>{AddCommaNum(data?.data?.tot_in_amount)}원</dd>
            </dl>
            <dl>
                <dt>출금 완료 수익금</dt>
                <dd>{AddCommaNum(data?.data?.tot_out_amount)}원</dd>
            </dl>
            <style jsx>{`
                .container{margin: 30px 0; display: flex; align-items: stretch; border: 1px solid #ccc; border-radius: 10px; padding: 15px 0;}
                .container dl{flex: 1 50%; padding: 0 60px;}
                .container dl + dl{border-left: 1px solid #ccc;}
                .container dl dt{font-size: 15px; color: #aaa; margin-bottom: 10px;}
                .container dl dd{font-size: 20px; color: #fff; font-weight: 700;}

                @media (max-width: 900px) {
                    .container{display: block; padding: 0;}
                    .container dl{padding: 15px;}
                    .container dl + dl{border: none; border-top: 1px solid #ccc;}
                    .container dl dt{font-size: 13px;}
                    .container dl dd{font-size: 15px;}
                }
            `}</style>
        </div>
    );
}

export default MyProfitView;