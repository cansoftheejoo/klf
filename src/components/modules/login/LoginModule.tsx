import Link from "next/link";
import styles from './LoginModule.module.css'
import { useMutation } from "react-query";
import { postLogin } from "@/pages/api/member";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { setCookie } from "@/util/common";

const LoginModule = () => {

    const router = useRouter()

    
    // 회원 타입
    const [memberType, setMemberType] = useState('1')

    const handleTypeChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setMemberType(event.target.value);
      };


    // 비밀번호
    const [password, setPassword] = useState('')

    const setLogin = useMutation(postLogin, {
        onSuccess: res => {
            console.log(res)

            if(res?.result == 'success'){

        
                
                const jsonData = JSON.stringify({
                    userid: res?.userid,
                    username: res?.username,
                    grade: res?.grade,
                    type: res?.type,
                    file_name: res?.file_name,
                    no: res?.no,
                });

                // const time = maintainLogin ? 20 : 3

                // setCookie('user', jsonData, time)
                // setCookie('access_token', res.access_token, time)
                // setCookie('refresh_token', res.refresh_token, time)

                localStorage.setItem('user', jsonData);
                localStorage.setItem('access_token', res.access_token);
                localStorage.setItem('refresh_token', res.refresh_token);

                // middleware 사용
                setCookie('access_token', res.access_token, 20)


                // router.push('/');
                // if(previousPageUrl.split('/')[1] == 'login'){
                //     router.push('/');
                // } else {
                //     router.back()
                // }
               
                location.reload();
             
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

        
        const type = formData.get('type')
        const userid = formData.get('userid')
        const userpass = formData.get('userpass')

        const params = {
            "type" : type, //1:일반   ,2:판매자
            "userid": userid,  //"apoka100@gmail.com" "store1@gmail.com"
            "userpass": userpass // test1234!
        }

        setLogin.mutate(params)

    }


    return (
        <div className={styles.container}>
            <h3>로그인</h3>
        
            <div className={styles.input}>
                <form onSubmit={handleSubmit} className={styles.loginForm}>

                    <div className={styles.type}>
                        <label>
                            <input type="radio" name="type" onChange={handleTypeChange} value={1} checked={memberType == '1'} />
                            <span className="mBtn wBtn rBtn bColorF">일반 회원</span>
                        </label>
                        <label>
                            <input type="radio" name="type" onChange={handleTypeChange} value={2} checked={memberType == '2'}  />
                            <span className="mBtn wBtn rBtn bColorF">판매자 회원</span>
                        </label>
                    </div>
                    
                    <input name="userid" type="text" placeholder="아이디" required />
                    <input name="userpass" type="password" placeholder="비밀번호" value={password} onChange={e => setPassword(e.target.value)} required />

                    <button className="mBtn sColor1" type="submit">{memberType == '1' ? '일반' : '판매자'} 로그인</button>
                    
                </form>
                <div className={styles.link}>
                    <Link href={`/login/signup/${memberType}`} className="mBtn wBtn sColor2">{memberType == '1' ? '일반' : '판매자'} 회원가입</Link>
                </div>
            </div>
        </div>
    );
}

export default LoginModule;