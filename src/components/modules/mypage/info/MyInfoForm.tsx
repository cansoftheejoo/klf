import MypageLayout from "@/components/modules/mypage/MypageLayout";
import styles from "@/components/modules/login/SignUpModule.module.css";
import { useCheckSignIn } from "@/hook/common";
import SignUpCompayList from "@/components/modules/login/SignUpCompayList";
import { useForm, SubmitHandler } from "react-hook-form"
import { SignUpType } from "@/type/common";
import { useState } from "react";
import { useMutation } from "react-query";
import { postCheckUserNickname } from "@/pages/api/member";

const MypageInfoForm = () => {

    const isLoggedIn = useCheckSignIn();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setError 
    } = useForm<SignUpType>({  mode: "onChange"  })

    // const handleSubmit = (e:any) => {
    //     e.preventDefault();
    // }

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

    // 일반 닉네임 중복확인
    const setCheckUserNickname = useMutation(postCheckUserNickname,{
        onSuccess: res => {
            if(res?.result == 'success'){
                setValidate({
                    ...validate,
                    user_nickname: {
                        value: res.message,
                        check: true
                    },
                });
            } else {
                setValidate({
                    ...validate,
                    user_nickname: {
                        value: res.message,
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




    const onSubmit: SubmitHandler<any> = (data) => {

        // if(!validate.userid.check){
        //     alert('아이디 중복확인을 해주세요')
        //     return
        // }

        // if(!validate.user_nickname.check){
        //     alert((type == '1' ? '닉네임' : '판매점명') + ' 중복확인을 해주세요')
        //     return
        // }

        // const formData = new FormData();
        // Object.entries(data).forEach(([key, value]) => {
        //     if(value){
        //         formData.append(key, value.toString());
        //     }
        // });

        // if(type == '1'){
        //     setSignUpNormal.mutate(formData)
        // } else {
        //     seSignUpSeller.mutate(formData)
        // }
    }


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
                <article>
                    <h5>이메일</h5>
                    <div className="txt">
                        test@test.com
                    </div>
                </article>

                {/* 가맹점 값 수정 불가능 */}

                <article>
                    <h5>*{isLoggedIn?.type == '1' ? '닉네임' : '판매점명'}</h5>
                    <div className="input">
                    
                    <input
                        type="text" 
                        placeholder={isLoggedIn?.type == '1' ? '닉네임' : '판매점명'}
                        autoComplete="off"
                        {...register("username", { 
                            required: {
                                value: true,
                                message: `${isLoggedIn?.type == '1' ? '닉네임' : '판매점명'}은 필수입력 항목입니다.`
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

                
                {isLoggedIn?.type == '2' && (
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

                <div className={styles.guide}>
                    * 비밀번호는 변경시에만 입력
                </div>

                <article>
                    <h5>비밀번호 변경</h5>
                    <div className="input">
                        <input 
                        type="password" 
                        placeholder="변경할 비밀번호" 
                        {...register("userpass", {
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
                    <h5>비밀번호 변경 확인</h5>
                    <div className="input">
                        <input 
                        type="password" 
                        placeholder="변경할 비밀번호 확인" 
                        {...register("userpassd", {
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


            
                <div className={styles.bottomBtn}>
                    <button className="sColor1 mBtn wBtn">회원정보 수정</button>
                </div>
                
            </form>

            <div className={styles.withdraw}>
                <button type="button">회원탈퇴</button>
            </div>
        </div>
    );
}

export default MypageInfoForm;