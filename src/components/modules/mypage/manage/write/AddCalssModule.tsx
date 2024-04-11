import MypageLayout from "@/components/modules/mypage/MypageLayout";
import EditorIntroduce from "@/components/modules/mypage/open/EditorIntroduce";
import QuillEditor from "@/components/modules/mypage/open/QuillEditor";
import { getAddClassView, postAddClassEdit, postAddClassWrite } from "@/pages/api/mypage";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/router";
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from "react-query";
import CustomFileUpload from "./CustomFileUpload";
import AddClassCategory from "./AddClassCategory";
import axios, { AxiosProgressEvent } from "axios";
import ModalLayout from "@/components/ui/modal/ModalLayout";

import styles from './AddClassProgressModal.module.css'
import { getUserData } from "@/pages/api/get";

const AddCalssModule = () => {

    const router = useRouter()
    const idx = router.query?.idx as string

    // 키워드
    const [tagKeyword, setTagKeyword] = useState<string>('');

    // 강의 목록 키워드
    const [tagClassKeyword, setTagClassKeyword] = useState<string>('');

    // 선택 카테고리 아이디
    const [categoryId, setCategoryId] = useState({
        no: '',
        category_id: ''
    });
    
    // 유료강의 여부
    const [isFree, setIsFree] = useState<any>('1');

    // 파일 업로드 진행상황
    const [uploadProgress, setUploadProgress] = useState(0);

    // 강의 등록 진행상황 메시지
    const [ActiveModal, setActiveModal] = useState(false);
    const [progressMsg, setProgressMsg] = useState<string>('');

    const queryClient = useQueryClient()

    // 강의 수정
    const setEdit = useMutation(postAddClassEdit, {
        onSuccess: res => {
            
            console.log(res)

            if(res?.result == 'success'){
                setProgressMsg('강의을 강의 수정이이 완료되었습니다')
                queryClient.invalidateQueries(['getManageClass'])
                setTimeout(() => {
                    setActiveModal(false)
                    router.push('/mypage/open')
                }, 800);
            } else {
                alert(res.msg)
            }

        },
        onError: err => {
            setActiveModal(false)
            alert('강의 등록에 실패했습니다')
        }
    })

    // 강의 등록
    const setSubmit = useMutation(postAddClassWrite, {
        onSuccess: res => {
            
            console.log(res)

            if(res?.result == 'success'){
                setProgressMsg('강의을 강의 등록이 완료되었습니다')
                queryClient.invalidateQueries(['getManageClass'])
                setTimeout(() => {
                    setActiveModal(false)
                    router.push('/mypage/open')
                }, 800);
            } else {
                alert(res.msg)
            }

        },
        onError: err => {
            setActiveModal(false)
            alert('강의 등록에 실패했습니다')
        }
    })
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        // 폼 데이터를 서버로 전송 또는 처리할 로직을 작성합니다.
        // console.log(formData);


        try {
            const form = e.target;
            const formData = new FormData(form);
            const file:any = formData.get('file');
    
            // FormData를 JSON 형식으로 변환
            var jsonObject:any = {};
            formData.forEach(function(value, key){
                if(key != 'file'){
                    jsonObject[key] = value;
                }
            });
            
            if(!categoryId?.category_id) {
                alert('강의 카테고리를 선택해주세요')
                return
            }

            
            if(idx){
                console.log(file)
                if(file?.size > 0){
                    console.log('있음')
                } else {
                    console.log('없음')

                    setProgressMsg('강의을 수정중입니다')
                    console.log(jsonObject)
                    setEdit.mutate(jsonObject)
                    return
                }
               

                
            }

            setActiveModal(true)
            setProgressMsg('동영상 업로드 진행중입니다')

            const getToken = await getUserData('/mypage.php?trace=midibus_token')
            const token = getToken?.token
            const fileForm = new FormData();
            fileForm.append('file', file)


            const response = await axios.post(`https://mapi.midibus.kinxcdn.com/v2/media/${categoryId?.category_id}`, fileForm, {
              headers: {
                'X-Mbus-Token': token
              },
              onUploadProgress: (progressEvent: AxiosProgressEvent) => {
                if( progressEvent.total == undefined){
                  return
                }
                const progress = (progressEvent.loaded / progressEvent.total) * 100;
                setUploadProgress(progress);
              },
            });


            // console.log(response)
            if(response?.data){
                if(response?.data?.success){
                    // 장바구니 전달할 아이디
                    console.log(response?.data?.media_id)

                    if(response?.data?.media_id){
                        const params = {
                            ...jsonObject,
                            media_id: response?.data?.media_id
                        }

                        setProgressMsg('강의을 등록중입니다')
                        // console.log(params)
                        setSubmit.mutate(params)
                    }

                } else {

                }
            }
        } catch (error) {
            setActiveModal(false)
            alert('동영상 업로드에 실패했습니다')
        }


        // console.log(jsonObject)
        // setSubmit(jsonObject);
    };

    const preData = useQuery(['getAddClassToken', idx], getAddClassView({
        no: idx
    }), {
        onSuccess: res => {
            // console.log(res.data)
            if(idx){
                if(!res) {
                    router.back()
                }
            }
            if(res?.keyword){
                setTagKeyword(res?.keyword)
            }
            if(res?.list_keyword){
                setTagClassKeyword(res?.list_keyword)
            }
        }
    })



    return (
        <MypageLayout title="강의 등록">
            <ModalLayout modalActive={ActiveModal}>
                <div className={styles.progressContainer}>
                
                    <p className={styles.num}>{`${uploadProgress.toFixed(2)}%`}</p>
                    <p className={styles.progressBar} ><span style={{ width: `${uploadProgress.toFixed(2)}%` }}></span></p>
                    <p className={styles.message}>{progressMsg}</p>

                </div>
            </ModalLayout>
            <form onSubmit={handleSubmit}>
                {preData?.data?.no && (
                    <input type="hidden" name="no" value={preData?.data?.no} />
                )}
                <div className="horizontal-form">
                    <article>
                        <h5>*제목</h5>
                        <div className="input">
                            <input 
                            type="text" 
                            name="title"
                            placeholder="제목을 입력해주세요" 
                            defaultValue={preData.data?.title}
                            required
                            />
                        </div>
                    </article>
                    <article>
                        <h5>*카테고리</h5>
                        <div className="input">
                            <AddClassCategory 
                            onChange={(val:any) => setCategoryId(val)}
                            init={preData.data?.category}
                             />
                        </div>
                    </article>
                    <article>
                        <h5>키워드</h5>
                        <div className="right">
                            <p className="guide">* 쉼표(,)로 키워드를 구분해주세요</p>
                            <div className="inline">
                                <input type="text" name="keyword" placeholder="키워드를 입력해주세요"

                                    value={tagKeyword}
                                    onChange={e => {
                                        const val = e.target.value
                                        const lastCharacter = val[val.length - 1];
                                        const arr = val.trim().split(',')

                                        if(arr.length == 5){
                                            if(lastCharacter == ','){
                                                if(arr?.[arr.length - 1]){
                                                    console.log('정지')
                                                    setTagKeyword(tagKeyword)
                                                    return
                                                }
                                            }
                                        }

                                        if(arr.length <= 5){
                                            console.log('추가')
                                            setTagKeyword(val)

                                        } else {
                                            console.log('유지')
                                            setTagKeyword(tagKeyword)
                                        }
                                        
                                        
                                      
                                    }}
                                />
                                <span className="count">{`${tagKeyword ? tagKeyword.split(',').length : 0}/5`}</span>
                            </div>
                            {tagKeyword && (
                                <div className="tagArea">
                                    {tagKeyword.split(',')?.map(keyword => (
                                        <span key={keyword} className="tag"  style={{ opacity: keyword ? 1 : 0 }}>{keyword.trim()}</span>
                                    ))}
                                    
                                </div>
                            )}
                          

                            <p className="guide">검색 및 상품 리스트에서 사용됩니다.</p>
                        </div>
                       
                    </article>
                    <article>
                        <h5>강의 목록<br />키워드</h5>
                        <div className="right">
                            <p className="guide">* 쉼표(,)로 키워드를 구분해주세요</p>
                            <div className="inline">
                                <input type="text" name="list_keyword" placeholder="키워드를 입력해주세요"
                                    defaultValue={preData.data?.list_keyword}
                                    value={tagClassKeyword}
                                    onChange={e => {
                                        const val = e.target.value
                                        const lastCharacter = val[val.length - 1];
                                        const arr = val.trim().split(',')

                                        if(arr.length == 5){
                                            if(lastCharacter == ','){
                                                if(arr?.[arr.length - 1]){
                                                    console.log('정지')
                                                    setTagClassKeyword(tagClassKeyword)
                                                    return
                                                }
                                            }
                                        }

                                        if(arr.length <= 5){
                                            console.log('추가')
                                            setTagClassKeyword(val)

                                        } else {
                                            console.log('유지')
                                            setTagClassKeyword(tagClassKeyword)
                                        }
                                        
                                        
                                      
                                    }}
                                />
                                <span className="count">{`${tagClassKeyword ? tagClassKeyword.split(',').length : 0}/5`}</span>
                            </div>
                            {tagClassKeyword && (
                                <div className="tagArea">
                                    {tagClassKeyword.split(',')?.map(keyword => (
                                        <span key={keyword} className="tag"  style={{ opacity: keyword ? 1 : 0 }}>{keyword.trim()}</span>
                                    ))}
                                    
                                </div>
                            )}
                          

                            <p className="guide">강의 상세페이지 연관 강의 노출에 사용됩니다.</p>
                        </div>
                    </article>
                    <article>
                        <h5>*금액선택</h5>
                        <div className="price">
                            <select name="type"
                            defaultValue={preData.data?.type}
                            onChange={e => setIsFree(e.target.value)}>
                                <option value="1">유료강의</option>
                                <option value="2">무료강의</option>
                            </select>
                        </div>
                    </article>
                    {isFree == '1' && (
                    <article>
                        <h5>* 금액</h5>
                        <div className="input">
                            <div className={`price ${isFree == '2' ? 'disabled' : ''}`}>
                                판매금액
                                <input
                                type="number"
                                name="amount"
                                placeholder="판매금액" 
                                disabled={isFree == '2'}
                                required
                                defaultValue={preData.data?.amount}
                                />
                                원
                            </div>
                            <div className={`price ${isFree == '2' ? 'disabled' : ''}`}>
                                공급금액
                                <input
                                type="number"
                                name="pay_amount"
                                placeholder="공급금액" 
                                disabled={isFree == '2'}
                                required
                                defaultValue={preData.data?.pay_amount}
                                />
                                원
                            </div>
                        </div>
                    </article>
                    )}
                    <article>
                        <h5>강의 소개</h5>
                        {/* <div className="edior">
                        <EditorIntroduce />
                    </div> */}
                        <div className="input">

                            <textarea 
                            name="intro"
                            placeholder="강의 소개를 입력해주세요"
                            required
                            defaultValue={preData.data?.intro}

                            ></textarea>
                        </div>
                    </article>
                    <article>
                        <h5>강의 내용</h5>
                        {/* <div className="edior">
                        <EditorIntroduce />
                    </div> */}
                        <div className="input">
                            <textarea name="contents" placeholder="강의 내용를 입력해주세요" required 
                            defaultValue={preData.data?.contents}
                            ></textarea>
                        </div>
                    </article>

                    <input type="hidden" name="media_id" value={0} />

                    <article>
                        <h5>
                            강의 첨부파일

                        </h5>
                        <div className="input">
                            

                            <CustomFileUpload idx={idx}  />
                           
                        </div>
                    </article>
             
                </div>
            </form>
            <style jsx>{`

            article + article{padding-top: 20px; border-top: 1px solid #444;}
            article .input textarea{min-height: 150px; max-height: 50vh;}

            .guide{font-size: 12px; color: #eee}
            .guide + .inline{margin-top: 10px;}
            .inline ~ .guide{margin-top: 10px;}

            .addBtn{border: 1px solid #ccc; color: #eee; border-radius: 5px; padding: 3px 8px;}

            .edior{background-color: #fff; width: 100%; color: #111}

            .count{color: #999; padding: 0 10px;}

            .inline{padding-right: 10px;}

            .price{display: flex; width: 100%;  align-items: center; gap: 10px;}
            .price + .price{margin-top: 10px;}
            .price select{min-width: 120px;}
            .price .price.disabled{opacity: 0.4;}
            .price input{max-width: 200px;}

            .tagArea{display: flex; flex-wrap: wrap; gap: 5px; margin-top: 10px;}
            .tag{display: inline-flex; align-items: center; gap: 5px; padding: 5px 10px; background-color: #555; font-size: 12px; border-radius: 3px; line-height: 1;}
        `}</style>
        </MypageLayout>
    );
}

export default AddCalssModule;