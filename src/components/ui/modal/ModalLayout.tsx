import { useLoginModal } from "@/hook/CustomHook";
import styles from './ModalLayout.module.css'
import { useEffect } from "react";

const ModalLayout = ({
    modalActive = false,
    setModalActive = () => {},
    useBackClose = true,
    children
}:{
    modalActive?: boolean,
    setModalActive?: (val:boolean) => void,
    useBackClose?: boolean,
    children?: React.ReactNode,
}) => {

    useEffect(() => {
     
        document.body.style.overflow = modalActive ? 'hidden' : 'auto';
 
    },[modalActive])


    const onClose = () => {
        setModalActive(false);
    }

    const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if(useBackClose){
            if (e.target === e.currentTarget) {
            // 배경 클릭 시 모달 닫기
            onClose();
            }
        }
    };

    return (
        <div className={`${styles.wrapper} ${modalActive ? styles.active : ''}`}  onClick={handleBackgroundClick}>
            <div className={styles.container}>
                {children}
            </div>
        </div>
    );
}

export default ModalLayout;