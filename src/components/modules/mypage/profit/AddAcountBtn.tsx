import { getProfitAccount } from "@/pages/api/mypage";
import { Icon } from "@iconify/react";
import { useQuery } from "react-query";
import MyProfitView from "./MyProfitView";

const AddAcountBtn = ({
    Accounttoggle = () => {},
    Submittoggle = () => {},
}) => {

    
    const { data, status } = useQuery('getProfitAccount', getProfitAccount, {
        onSuccess: res => {
            console.log(res)
        }
    })

    if(status == 'loading'){
        return  <div></div>;
    }

    if (status == 'error') {
        return <p>데이터를 가져오는 동안 문제가 발생했습니다</p>;
    }


    return (
        <>
            <div className="topBtn">
                <button className="nBtn rBtn bColor1"
                    onClick={Accounttoggle}
                >
                    <Icon icon="bxs:edit" />
                    출금계좌 {data?.data && data?.data?.bank_name ? '수정' : '등록'}
                </button>

                {data?.data && data?.data?.bank_name && (
                <span className="nBtn accountInfo">{data?.data?.bank_name} / ********</span>
                )}
            </div>
            <MyProfitView />
            <div className="tar">
                <button className="nBtn rBtn sColor1"
                    onClick={() => {
                        if(data?.data && data?.data?.bank_name){
                            Submittoggle()
                        } else {
                            alert('출금계좌를 등록해주세요')
                        }
                    }}
                >
                    출금신청
                </button>
            </div>
            <style jsx>{`
               


               .topBtn{display: flex; align-items: center; flex-wrap: wrap; gap: 10px;}
             
               .accountInfo{color: #ccc; font-weight: 400; font-size: 14px; display: inline-block; padding: 8px 15px; background-color: #444; color: #ccc; border-radius: 5px;}
           `}</style>
        </>
    );
}

export default AddAcountBtn;