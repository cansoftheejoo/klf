import ModalLayout from "@/components/ui/modal/ModalLayout";
import styles from "./MyAccountModal.module.css"

const MyProfitSubmitModal = ({
    modalActive = false,
    toggle = () => {}
}) => {
    return (
        <ModalLayout modalActive={modalActive}>
            <div className={styles.container}>
                <h4>출금 가능한 수익금</h4>
                <form>
                    <div className={styles.price}>
                        <dl>
                            <dt>판매금액</dt>
                            <dd>100,000원</dd>
                        </dl>
                        <dl>
                            <dt>판매금액</dt>
                            <dd>100,000원</dd>
                        </dl>
                        <dl className="total">
                            <dt>총 수익금</dt>
                            <dd>100,000원</dd>
                        </dl>
                        
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

export default MyProfitSubmitModal;