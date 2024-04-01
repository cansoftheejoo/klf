import SignUpCompayList from "@/components/modules/login/SignUpCompayList";
import styles from "./SignUpModule.module.css";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation } from "react-query";
import { postCheckUserId, postCheckUserNickname, postSignUpNormal, postSignUpSeller } from "@/pages/api/member";
import { useForm, SubmitHandler } from "react-hook-form"
import { SignUpType } from "@/type/common";
import { useLogin } from "@/hook/common";

const SignUpModule = () => {

    const router = useRouter()
    const type = router.query?.type as string

    const onLogin = useLogin()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setError 
    } = useForm<SignUpType>({  mode: "onChange"  })

    // 회원가입 제출
    const setSignUpNormal = useMutation(postSignUpNormal,{
        onSuccess: res => {
            alert(res?.msg)
            if(res?.result == 'success'){
                // 로그인
                onLogin({
                    res: res,
                })
            } else {
                console.log(res)
            }   
        }
    })
    const seSignUpSeller = useMutation(postSignUpSeller,{
        onSuccess: res => {
            alert(res?.msg)
            if(res?.result == 'success'){
                // 로그인
                onLogin({
                    res: res,
                })
            } else {
                console.log(res)
            }   
        }
    })
      
    const onSubmit: SubmitHandler<any> = (data) => {

        if(!validate.userid.check){
            alert('아이디 중복확인을 해주세요')
            return
        }

        if(!validate.user_nickname.check){
            alert((type == '1' ? '닉네임' : '판매점명') + ' 중복확인을 해주세요')
            return
        }

        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if(value){
                formData.append(key, value.toString());
            }
        });

        if(type == '1'){
            setSignUpNormal.mutate(formData)
        } else {
            seSignUpSeller.mutate(formData)
        }
    }

   

    const [validate, setValidate] = useState({
        userid: {
            value: '',
            check: false,
        },
        user_nickname: {
            value: '',
            check: false,
        },
        username: {
            value: '',
            check: false,
        },
    })


    // 이메일 중복확인
    const setCheckUserId = useMutation(postCheckUserId, {
        onSuccess: res => {

            if(res?.result == 'success'){
                setValidate({
                    ...validate,
                    userid: {
                        value: res?.msg,
                        check: true
                    },
                });
            } else {
                setValidate({
                    ...validate,
                    userid: {
                        value: res?.msg,
                        check: false
                    },
                });
            }
           
           
           
        }
    })
    const checkUserId = () => {

        if(errors?.userid?.message){
            setValidate({
                ...validate,
                userid: {
                    value: '',
                    check: false,
                },
            });
            return
        }

        const userid = watch('userid');

        setCheckUserId.mutate({
            type: type,
            userid: userid
        })
    }

    // 일반 닉네임 중복확인
    const setCheckUserNickname = useMutation(postCheckUserNickname,{
        onSuccess: res => {
            if(res?.result == 'success'){
                setValidate({
                    ...validate,
                    user_nickname: {
                        value: res?.msg,
                        check: true
                    },
                });
            } else {
                setValidate({
                    ...validate,
                    user_nickname: {
                        value: res?.msg,
                        check: false
                    },
                });
            }
          
        }
    })
    const checkUserNickname = () => {

        if(errors?.user_nickname?.message){
            setValidate({
                ...validate,
                user_nickname: {
                    value: '',
                    check: false,
                },
            });
            return
        }

        const username = watch('username');

        setCheckUserNickname.mutate({
            user_nickname: username
        })
    }



    return (
        <form  onSubmit={handleSubmit(onSubmit)} className={styles.container}>
            <h3 className={styles.title}>{type == '1' ? '일반' : '판매자'} 회원가입</h3>
            {type == '1' && (
            <article>
                <h5>*가맹점</h5>
                <div className="input">
                    <SignUpCompayList register={register} />
                </div>
                <p className={styles.message}>{errors?.company_id?.message}</p>
            </article>
            )}
          

            {/* 공통 */}
            <article>
                <h5>*이메일 (아이디)</h5>
                <div className="input">
                    <input 
                    type="text"
                    placeholder="이메일"
                    autoComplete="off"
                    {...register("userid", { 
                        required: {
                            value: true,
                            message: '이메일은 필수입력 항목입니다.'
                        }, 
                        pattern: {
                            value:
                              /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                            message: "이메일 형식에 맞지 않습니다.",
                        },
                        onChange(event) {
                            setValidate({
                                ...validate,
                                userid: {
                                    value: '',
                                    check: false,
                                },
                            });
                        },
                    })}
                    />
                    <button className="bColorF" type="button" onClick={checkUserId}>중복확인</button>
                </div>
                <p className={styles.message}>{errors?.userid?.message}</p>
                <p className={styles.message} style={{ color: validate.userid.check ? '#68ffa9' : '#ff8282' }}>{validate.userid.value}</p>
            </article>
            

    
            <article>
                <h5>*{type == '1' ? '닉네임' : '판매점명'}</h5>
                <div className="input">
                
                <input
                    type="text" 
                    placeholder={type == '1' ? '닉네임' : '판매점명'}
                    autoComplete="off"
                    {...register("username", { 
                        required: {
                            value: true,
                            message: `${type == '1' ? '닉네임' : '판매점명'}은 필수입력 항목입니다.`
                        }, 
                        minLength: {
                            value: 2,
                            message: '최소 2자 이상 최대 20자 이하'
                        },
                        maxLength: {
                            value: 20,
                            message: '최소 2자 이상 최대 20자 이하'
                        },
                        // validate: value => value?.trim() !== '' || "공백은 허용되지 않습니다.",
                        validate: {
                            check: (val) => {
                                const whitespaceRegex = /\s/;
                                if (val && whitespaceRegex.test(val)) {
                                    return "공백은 허용되지 않습니다.";
                                }
                            },
                        }, 
                        onChange(event) {
                            setValidate({
                                ...validate,
                                user_nickname: {
                                    value: '',
                                    check: false,
                                },
                            });
                        },
                    })}
                    />
                    <button className="bColorF" type="button" onClick={checkUserNickname}>중복확인</button>
                </div>
                <p className={styles.message}>{errors?.username?.message}</p>
                <p className={styles.message} style={{ color: validate.user_nickname.check ? '#68ffa9' : '#ff8282' }}>{validate.user_nickname.value}</p>
            </article>

            <article>
                <h5>연락처</h5>
                <div className="input">
                    <input 
                    type="tel" 
                    placeholder="연락처" 
                    {...register("usertel", {
                        pattern: {
                            value: /^[\d-]*$/,
                            message: '숫자 또는 "-"만 입력하세요.',
                        },
                    })}
                    />
                </div>
                <p className={styles.message}>{errors?.usertel?.message}</p>
            </article>

            {/* 공통 */}
            <article>
                <h5>*비밀번호</h5>
                <div className="input">
                    <input 
                    type="password" 
                    placeholder="비밀번호" 
                    {...register("userpass", {
                        required: "비밀번호는 필수 입력입니다.",
                        validate: {
                            check: val => {
                                const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?!.*\s).{6,16}$/g; 
                        
                                if (val && regex.test(val)) {
                                    return true; 
                                } else {
                                    return '영문 숫자 특수문자 조합 6-16자리';
                                }
                            }
                        }
                    })}
                    />
                </div>
                <p className={styles.message}>{errors?.userpass?.message}</p>
            </article>
            <article>
                <h5>*비밀번호 확인</h5>
                <div className="input">
                    <input 
                    type="password" 
                    placeholder="비밀번호 확인" 
                    {...register("userpassd", {
                        required: "비밀번호는 필수 입력입니다.",
                        validate: {
                            check: val => {
                                const userpass = watch('userpass'); 
                        
                                if (val && userpass == val) {
                                    return true; 
                                } else {
                                    return '비밀번호가 일치하지 않습니다';
                                }
                            }
                        }
                    })}
                    />
                </div>
                <p className={styles.message}>{errors?.userpassd?.message}</p>
            </article>

   

            {type == '2' && (
                <>
                <article>
                    <h5>*사업자등록번호</h5>
                    <div className="input">
                        <input type="text" name="company_no" placeholder="사업자등록번호" />
                    </div>
                </article>
                <article>
                    <h5>*사업자등록증</h5>
                    <div className="file">
                        <input type="file" name="file_name" placeholder="사업자등록번호" />
                    </div>
                </article>
                
                </>
            )}

            <div className={styles.bottomBtn}>
                <button className="sColor1 mBtn wBtn" type="submit"><b>회원가입</b></button>
            </div>
        </form>
    );
}

export default SignUpModule;