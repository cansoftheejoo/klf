import ModalLayout from "@/components/ui/modal/ModalLayout";
import styles from "./MyAccountModal.module.css"
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getProfitPrice, postProfitSubmit } from "@/pages/api/mypage";
import { AddCommaNum } from "@/util/common";

const MyProfitSubmitModal = ({
    modalActive = false,
    toggle = () => {}
}) => {

    const queryClient = useQueryClient()

    const setSubmitProfit = useMutation(postProfitSubmit, {
        onSuccess: res => {
       
            if(res?.result == 'success'){
                queryClient.invalidateQueries(['getProfitPrice'])
                queryClient.invalidateQueries([`getProfitHistorycalculate_list`])
                
                toggle()
            } else {
               
            }   

            alert(res?.msg)
        }
    })

    const handleSubmit = (e:any) => {
        e.preventDefault();

        setSubmitProfit.mutate({})
    }

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

    return (
        <ModalLayout modalActive={modalActive}>
            <div className={styles.container}>
                <h4>출금 가능한 수익금</h4>
                <form onSubmit={handleSubmit}>
                    <div className={styles.price}>
                        <dl>
                            <dt>출금신청 전 총 판매금액</dt>
                            <dd>{AddCommaNum(data?.data?.tot_pay_amount)}원</dd>
                        </dl>
                        <dl>
                            <dt className="depth">수수료</dt>
                            <dd>{AddCommaNum(data?.data?.tot_charge_amount)}원</dd>
                        </dl>
                        <dl className="total">
                            <dt>최종 출금 금액</dt>
                            <dd>{AddCommaNum(data?.data?.tot_in_amount)}원</dd>
                        </dl>
                        {/* <dl className="total">
                            <dt>출금 완료 금액</dt>
                            <dd>{AddCommaNum(data?.data?.tot_out_amount)}원</dd>
                        </dl> */}
                        
                    </div>
                    <div className={styles.confirm}>
                        <button type="button" className={styles.cancle} onClick={toggle}>취소</button>
                        <button type="submit" className={styles.submit} >확인</button>
                    </div>
                </form>

                <style jsx>{`
                    .depth{padding-left: 10px;}
                    .depth::before{content: ""; display: inline-block; vertical-align: middle; margin-bottom: 5px; margin-right: 5px; width: 5px; height: 5px; border: 1px solid #999; border-width: 0 0 1px 1px;}
                    .total{border-top: 1px solid #666; padding-top: 20px; margin-top: 20px; color: #ccc; font-size: 14px;}
                `}</style>
            </div>
         
        </ModalLayout>
    );
}

export default MyProfitSubmitModal;