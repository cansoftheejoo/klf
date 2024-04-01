import MypageLayout from "@/components/modules/mypage/MypageLayout";
import AlertModal from "@/components/ui/alert/AlertModal";
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { alertToggle } from "@/redux/alert";
import MyProfitList from "@/components/modules/mypage/profit/MyProfitList";
import MyProfitView from "@/components/modules/mypage/profit/MyProfitView";
import { Icon } from "@iconify/react/dist/iconify.js";
import MyProfitNotice from "@/components/modules/mypage/profit/MyProfitNotice";
import MyProfitClassList from "@/components/modules/mypage/profit/MyProfitClassList";
import MyAccountModal from "@/components/modules/mypage/profit/MyAccountModal";
import MyProfitSubmitModal from "@/components/modules/mypage/profit/MyProfitSubmitModal";
import AddAcountBtn from "@/components/modules/mypage/profit/AddAcountBtn";

const MyProfitScreen = () => {

    const [AccountActive, setAccountActive] = useState(false)
    const Accounttoggle = () => setAccountActive(!AccountActive)

    const [SubmitActive, setSubmitActive] = useState(false)
    const Submittoggle = () => setSubmitActive(!SubmitActive)


    const [profitType, setProfitType] = useState(0)
    const tab = ['출금 내역','강의별 수익']




    return (
        <MypageLayout title="수익 관리">
            
            <div className="container">
               <AddAcountBtn 
               Accounttoggle={Accounttoggle}
               Submittoggle={Submittoggle}
                />
      
             
                <div className="tab">
                    {tab.map((item, i) => <button type="button" key={item} className={`tabBtn ${i == profitType ? 'active' : ''}`} onClick={() => setProfitType(i)}>{item}</button>)}
                </div>
                <div className="row">
                    {profitType == 0 ? (
                        <MyProfitList />
                    ) : (
                        <MyProfitClassList />
                    )}
                    
                </div>

                <MyProfitNotice />
            </div>

            <MyAccountModal 
                modalActive={AccountActive}
                toggle={Accounttoggle}
            />
            <MyProfitSubmitModal 
                modalActive={SubmitActive}
                toggle={Submittoggle}
            />
       

        

            

            <style jsx>{`
               

                .row{margin: 30px 0;}

                .topBtn{display: flex; align-items: center; flex-wrap: wrap; gap: 10px;}
                .tabBtn{border: 1px solid #ccc; margin: 0 5px 5px 0; color: #ccc; padding: 10px; font-weight: 700; min-width: 100px; border-radius: 5px; }
                .tabBtn.active{background: var(--color1); color: #333; border-color: var(--color1); }
        
                .accountInfo{color: #ccc; font-weight: 400;}
            `}</style>
        </MypageLayout>
    );
}

export default MyProfitScreen;