import MypageLayout from "@/components/modules/mypage/MypageLayout";
import styles from "@/components/modules/login/SignUpModule.module.css";
import { useCheckSignIn, useLogin } from "@/hook/common";
import SignUpCompayList from "@/components/modules/login/SignUpCompayList";
import { useForm, SubmitHandler } from "react-hook-form"
import { SignUpType } from "@/type/common";
import { useState } from "react";
import { useMutation } from "react-query";
import { postCheckUserNickname } from "@/pages/api/member";
import MypageInfoForm from "@/components/modules/mypage/info/MyInfoForm";
import { postLogin } from "@/pages/api/post";

const MypageScreen = () => {

    const isLoggedIn = useCheckSignIn();

    
    // 회원정보 확인 체크
    const [check, setCheck] = useState(true)
    
    // 비밀번호
    const [password, setPassword] = useState('')


    // 로그인 
    const onLogin = useLogin()

    const setLogin = useMutation(postLogin, {
        onSuccess: res => {
            console.log(res)

            if(res?.result == 'success'){
                onLogin({
                    res: res,
                    reload: false
                })
                setCheck(true)
            
            } else {
                alert(res.message)
                setPassword('')
            }
        }
    })

    
    const handleSubmit = (e:any) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        

        const params = {
            "type" : isLoggedIn?.type, //1:일반   ,2:판매자
            "userid": isLoggedIn?.userid, 
            "userpass": password 
        }

        setLogin.mutate(params)

    }


    return (
        <MypageLayout title="내 정보 수정">
            {!check ? (
            <form  onSubmit={handleSubmit} className={styles.container}>
                <article>
                    <h5>회원 정보 확인</h5>
                    <div className="input">
                        <input type="password" placeholder="비밀번호를 입력하세요" value={password} onChange={e => setPassword(e.target.value)} required  />
                    </div>
                </article>
                 
                <div className={styles.bottomBtn}>
                    <button className="sColor1 mBtn wBtn"><b>확인</b></button>
                </div>
            </form>
            ) : (
            <MypageInfoForm />
            )}
        </MypageLayout>
    );
}

export default MypageScreen;