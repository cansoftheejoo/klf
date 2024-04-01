import Link from "next/link";
import styles from './LoginModule.module.css'
import { useMutation } from "react-query";
import { postLogin } from "@/pages/api/member";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { setCookie } from "@/util/common";
import { useLogin } from "@/hook/common";

const LoginModule = () => {

    const router = useRouter()

    
    // 회원 타입
    const [memberType, setMemberType] = useState('1')

    const handleTypeChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setMemberType(event.target.value);
      };


    // 비밀번호
    const [password, setPassword] = useState('')

    // 로그인 
    const onLogin = useLogin()

    const setLogin = useMutation(postLogin, {
        onSuccess: res => {
            // console.log(res)

            if(res?.result == 'success'){

                onLogin({
                    res: res
                })
             
            } else {
                alert(res?.msg)
                setPassword('')
            }
        }
    })

    const handleSubmit = (e:any) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        
        const userid = formData.get('userid')
        const userpass = formData.get('userpass')

        const params = {
            "type" : memberType, //1:일반   ,2:판매자
            "userid": userid,  
            "userpass": userpass 
        }

        setLogin.mutate(params)

    }


    return (
        <div className={styles.container}>
            <h3>로그인</h3>
        
            <div className={styles.loginForm}>
                <form onSubmit={handleSubmit} >

                    <div className={styles.type}>
                        <label>
                            <input type="radio" name="type" onChange={handleTypeChange} value={1} checked={memberType == '1'} />
                            <span className="mBtn wBtn">일반 회원</span>
                        </label>
                        <label>
                            <input type="radio" name="type" onChange={handleTypeChange} value={2} checked={memberType == '2'}  />
                            <span className="mBtn wBtn">판매자 회원</span>
                        </label>
                    </div>
                    
                    <div className={styles.inputs}>
                        <input name="userid" type="text" placeholder="아이디" required />
                        <input name="userpass" type="password" placeholder="비밀번호" value={password} onChange={e => setPassword(e.target.value)} required />
                    </div>

                    <div className={styles.btns}>
                        <button className="mBtn wBtn sColor1" type="submit">{memberType == '1' ? '일반' : '판매자'} 로그인</button>
                    </div>
                    
                </form>
                <div className={styles.link}>
                    <Link href={`/login/signup/${memberType}`} className="mBtn wBtn bColor1">{memberType == '1' ? '일반' : '판매자'} 회원가입</Link>
                </div>
            </div>
        </div>
    );
}

export default LoginModule;