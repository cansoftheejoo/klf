import ModalLayout from "@/components/ui/modal/ModalLayout";
import styles from './MainContactWrite.module.css'
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { posttCustomInquiry } from "@/pages/api/main";

const MainContactWrite = ({
    filter,
    toggle = () => {},
}:any) => {

    const [values, setValues] = useState({
        "no": filter.type,
        "name": '',
        "email": '',
        "phone": '',
        "title": '',
        "contents": '',
    })
   

    const reset = () => {
    
        setValues({
            "no": filter.type,
            "name": '',
            "email": '',
            "phone": '',
            "title": '',
            "contents": '',
        })
    }



    const setInquery = useMutation(posttCustomInquiry, {
        onSuccess: res => {

            if(res?.result == 'success'){

                // 초기화
                reset()
            

                alert('상품 문의 등록이 완료되었습니다.')

                toggle();
            } else {
                alert(res?.msg)
            }
        }
    })


    const handleSubmit = (e:any) => {
        e.preventDefault();


        // console.log(values)
        setInquery.mutate(values)
     

    }


    const onChange = (e:any) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }


    return (
        <ModalLayout modalActive={filter.active} useBackClose={false} setModalActive={toggle}>
            <div className={styles.container}>
                <header>
                    <h2>{filter.title}</h2>
                </header>
                <form onSubmit={handleSubmit} className={styles.form}  id="myForm">
                    <div className={styles.contents}>
                        <table>
                            <thead></thead>
                            <tbody>
                                <tr>
                                    <th>문의 제목</th>
                                    <td>
                                        <input 
                                        type="text" 
                                        name="title" 
                                        placeholder="문의 제목" 
                                        required  
                                        value={values.title}
                                        onChange={onChange}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>문의 내용</th>
                                    <td>
                                        <textarea 
                                        placeholder="문의 내용" 
                                        name="contents" 
                                        required
                                        value={values.contents}
                                        onChange={onChange}
                                        ></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <th>문의 고객</th>
                                    <td>
                                        <div className={styles.user}>
                                            <input 
                                            type="text" 
                                            name="name" 
                                            required 
                                            placeholder="성함"
                                            value={values.name}
                                            onChange={onChange}
                                            />
                                            <input 
                                            type="tel" 
                                            name="phone" 
                                            required 
                                            placeholder="연락처"
                                            value={values.phone}
                                            onChange={onChange}
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>이메일</th>
                                    <td>
                                    <input
                                    type="email" 
                                    name="email" 
                                    required placeholder="이메일" 
                                    value={values.email}
                                    onChange={onChange}
                                    />
                                    </td>
                                </tr>
                            </tbody>
                        </table>


                    </div>
                    <div className={styles.btns}>
                        <button className="mBtn bColorG" type="button" onClick={() => {
                            reset()
                            toggle()
                        }}>취소</button>
                        <button className="mBtn sColor1" type="submit">등록</button>
                    </div>
                </form>
            </div>
        </ModalLayout>
    );
}

export default MainContactWrite;