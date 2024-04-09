import { alertToggle } from "@/redux/alert";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AlertModal = ({
    active,
    toggle,
    title,
    info,
    onConfirm,
    child,
    useCancle = true,
}:{
    active:boolean, 
    toggle:() => void,
    title?:string,
    info?:string,
    onConfirm?:() => void,
    child?:React.ReactNode,
    useCancle?:boolean, 
}) => {



    const handleBackgroundClick = (event:any) => {
        if (event.target === event.currentTarget) {
          // 배경을 클릭한 경우 모달을 닫음
            toggle();
        }
    };


    return (
        <>
            {active && (
                <div className="modal" onClick={handleBackgroundClick}>
                    <div className="alert">
                        {title && (<h4>{title}</h4>)}
                        {info && (<p className="info">{info}</p>)}
                        {child && child}
                        <div className="confirm">
                            {useCancle && <button type="button" className="cancle" onClick={toggle}>취소</button>}
                            <button type="button" className="submit" onClick={onConfirm}>확인</button>
                        </div>
                    </div>

                    <style jsx>{`
                        .modal{position: fixed; top: 0; left: 0; z-index: 99; background-color: rgba(0,0,0,0.5); width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;}
                        .alert{background-color: #000; display: flex; flex-direction: column; align-items: center; gap: 20px; padding: 40px 20px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.5); width: 375px; max-width: 90%;}
                        .alert h4{font-weight: 500;}
                        .alert .info{font-size: 15px; color: #999}
                        .alert .confirm{display: flex; gap: 10px; margin-top: 20px;}
                        .alert .confirm button{font-size: 13px; height: 30px; border-radius: 3px; padding: 0 10px; min-width: 60px;}
                        .alert .confirm button.cancle{color: #fff; background-color: #777}
                        .alert .confirm button.submit{color: #fff; background-color: var(--color1)}

                        @media (max-width: 900px) {
                            .alert h4{font-size: 14px;}
                            .alert .info{font-size: 13px;}
                            .alert .confirm button{font-size: 12px;}
                        }
                    `}</style>
                </div>
            )}
        </>
    );
}

export default AlertModal;