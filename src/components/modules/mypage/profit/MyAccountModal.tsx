import ModalLayout from "@/components/ui/modal/ModalLayout";
import styles from "./MyAccountModal.module.css"
import { useMutation, useQuery } from "react-query";
import { getBankList, getProfitAccount, postProfitAccount } from "@/pages/api/mypage";
import { useEffect, useState } from "react";
import MyAccountBankList from "./MyAccountBankList";

const MyAccountModal = ({
    modalActive = false,
    toggle = () => {}
}) => {

    const [values, setValues] = useState({
        account_name: '',
        bank_name: '',
        account_number: '',
    })

    const setAccount = useMutation(postProfitAccount, {
        onSuccess: res => {
            alert(res?.msg)
            if(res?.result == 'success'){
               
                toggle()
            } else {
               
            }
        }
    })

    const handleSubmit = (e:any) => {
        e.preventDefault();


        setAccount.mutate(values)

    }

    const { data, status } = useQuery('getProfitAccount', getProfitAccount, {
        onSuccess: res => {
            console.log(res)
        }
    })

    useEffect(() => {
        setValues({
            account_name: data?.data?.account_name,
            bank_name: data?.data?.bank_name,
            account_number: data?.data?.account_number,
        })
    },[])

    if(status == 'loading'){
        return  <div></div>;
    }

    if (status == 'error') {
        return <p>데이터를 가져오는 동안 문제가 발생했습니다</p>;
    }


    return (
        <ModalLayout modalActive={modalActive}>
            <div className={styles.container}>
                <h4>출금 계좌 등록</h4>
                <form onSubmit={handleSubmit}>
                    <div className={styles.input}>
                        <MyAccountBankList
                            values={values}
                            setValues={(val:any) => setValues(val)}
                        />
                       
                        <input type="text" required placeholder="예금주" 
                            value={values.account_name}
                            onChange={e => setValues({ ...values, account_name: e.target.value })}
                        />
                        <input type="text" required placeholder="계좌번호" 
                            value={values.account_number}
                            onChange={e => setValues({ ...values, account_number: e.target.value })}
                        />
        
                    </div>
                    <div className={styles.confirm}>
                        <button type="button" className={styles.cancle} onClick={toggle}>취소</button>
                        <button type="submit" className={styles.submit} >확인</button>
                    </div>
                </form>
            </div>
         
        </ModalLayout>
    );
}

export default MyAccountModal;