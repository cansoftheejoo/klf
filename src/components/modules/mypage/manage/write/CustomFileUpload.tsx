import { Icon } from '@iconify/react/dist/iconify.js';
import axios, { AxiosProgressEvent } from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

function CustomFileUpload({

  change,
  toggle,
}:{
  change?:any,
  toggle?:(val:any) => void,
}) {

  const router = useRouter()
  
  const queryClient = useQueryClient()

  // 장바구니 전달 아이템 설정


  const addCart = () => {

  
 
  }


  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  useEffect(() => {
    handleUpload()
  }, [file])


  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (file) {
      console.log('file append')
      const formData = new FormData();
      formData.append('file', file);


      try {
      

        setUploadStatus('업로드가 완료되었습니다');
      } catch (error) {
        console.error('Upload error:', error);
        setUploadStatus('업로드에 실패했습니다');
      }
    }
  };

  return (
    <div className='container'>
        <input type="file" name="file" id='file' onChange={handleFileChange}
              accept="mp4"
          />
        <div className="uploadContainer">
          {file != null ? (
             <>
              <div className="fileBox">
                  <button className="del" onClick={() => setFile(null)}><Icon icon="material-symbols-light:close" color='#555' fontSize={17} /></button>
                  <div className="box">
                  <Icon icon="ic:sharp-check" fontSize={28} color='var(--color1)' />
                  </div>
              </div>
              <p className="fileName ellipsis1" style={{ margin: 0 }}>{file && file.name}</p>
          </>
          ) : (
             <p>
              <Icon icon="iconamoon:file-add-light" fontSize={50} />
             </p>
          )}
        {/* {uploadStatus && <p>{uploadStatus}</p>} */}
            
        {file == null && (
        <div className='uploadBtn'>
            <label htmlFor='file'>
           
              <span className="nBtn sColor1 rBtn">업로드</span>
            </label>
        </div>
        )}
  
        <p className="guide">4GB 미만 
        
        동영상파일을 업로드해주세요</p>
        </div>

        <div className="cartBtn">
       {file != null ? (
          <button className="mBtn sColor1" type='submit' onClick={addCart}>등록하기</button>
        ) : (
          <button className="mBtn sColorG" type='button' onClick={() => alert('강의 영상을 올려주세요')}>등록하기</button>
        )}
       </div>

      <style jsx>{`
        .container{}

        .uploadContainer{text-align: center; max-width: 300px; background-color: #222; border-radius: 10px; padding: 20px 10px}

        .uploadBtn{margin: 10px 0;}
        .uploadBtn label{position: relative;}
        .uploadBtn label input{opacity: 0; position: absolute; top: 0; left: 0; width: 100%; height: 100%;}
        .uploadBtn label span{width: 160px;}

        .guide{font-size: 14px; color: #aeaeae; margin: 15px 0;}

        .cartBtn{width: 100%; text-align: center; margin-top: 30px;}
        .cartBtn button{width: 280px; height: 55px}

        .fileBox{position: relative; margin: 10px auto; width: 52px;}
        .fileBox .del{width: 24px; height: 24px; border-radius: 50%; border: 1px solid #ddd; background: #fff; position: absolute; top: -12px; left: -12px; display: inline-flex; align-items: center; justify-content: center; line-height: 1;}
        .fileBox .box{background: #f8f8f8; border-radius: 5px; border: 1px solid #aeaeae; display: flex; align-items: center; justify-content: center; width: 52px; height: 60px;}
        .fileName{font-size: 12px; width: 100%; margin: 0; justify-content: center;}
      `}</style>
    </div>
  );
}

export default CustomFileUpload;
