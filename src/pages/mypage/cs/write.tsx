import MypageLayout from "@/components/modules/mypage/MypageLayout";
import { useCheckSignIn } from "@/hook/common";
import { postCsInquiryWrite } from "@/pages/api/mypage";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/router";
import { useState } from 'react';
import { useMutation, useQueryClient } from "react-query";

const MyCsWriteScreen = () => {

    const router = useRouter()

    const isLoggedIn = useCheckSignIn();

    const queryClient = useQueryClient()

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event:any) => {
      
        
        const file = event.target.files[0];
        setSelectedFile(file?.name);
    };

    const setWrite = useMutation(postCsInquiryWrite, {
        onSuccess: res => {
            if(res?.result == 'success'){
                queryClient.invalidateQueries([`getMyCsBoardListinquiry_list`])
                alert('문의가 등록되었습니다.')
                router.push('/mypage/cs/board/inquiry_list')
            } else {
                alert(res?.msg)
            }
        }
    })

    const handleSubmit = (event:any) => {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        setWrite.mutate(formData)
    }
    
    return (
        <MypageLayout title="문의하기">
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="type" value={isLoggedIn?.type} />
                <div className="horizontal-form">
                    <article>
                        <h5>제목</h5>
                        <div className="input">
                            <input type="text" name="title" required placeholder="제목을 입력해주세요" />
                        </div>
                    </article>
                    <article>
                        <h5>내용</h5>
                        <div className="input">
                            <textarea required name="contents" placeholder="자세한 내용을 입력해 주세요 (최대 1000자)" ></textarea>
                        </div>
                    </article>
                    <article>
                        <h5>파일첨부</h5>
                        <div className="input">
                         
                            <input id="addFile" name="file_name" type="file" onChange={handleFileChange} />
                            
                            {selectedFile ? (
                                <p className="fileName">
                                    {selectedFile} 
                                    <button onClick={() => setSelectedFile(null)}>
                                        <Icon icon="material-symbols:close" fontSize={18} color="#ccc" />
                                    </button>
                                </p>
                            ) : (
                                <label htmlFor="addFile" className="file">
                                    <span><Icon icon="tdesign:plus" fontSize={25} color="#ccc" /> 파일첨부</span>
                                </label>
                            )}
                          
                        </div>
                    </article>
                    <div className="bottomBtn">
                        <button className="mBtn sColor1">문의하기</button>
                    </div>
                </div>
            </form>
        </MypageLayout>
    );
}

export default MyCsWriteScreen;