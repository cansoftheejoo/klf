import { useMutation, useQueryClient } from 'react-query';
import styles from './ClassReviewWrite.module.css'
import { postClassReviewWrite } from '@/pages/api/class';
import { useState } from 'react';
import { useRouter } from 'next/router';

const ClassReviewWrite = () => {

    const router = useRouter()
    const idx = router.query?.idx as string

    const [textarea, setTextarea] = useState('')

    const queryClient = useQueryClient()

    const setWrite = useMutation(postClassReviewWrite, {
        onSuccess: res => {
            if(res?.result == 'success'){
                setTextarea('')
                queryClient.invalidateQueries([`getClassReviewList${idx}`])
                alert('후기가 등록되었습니다.')
            } else {
                alert(res?.msg)
            }
        }
    })

    const onWrite = () => {

        if(textarea == ''){
            alert('후기 내용을 입력해주세요')
            return
        }

        const params = {
            no : idx,      
            comment: textarea
        }
        setWrite.mutate(params)
    }

    return (
        <div className={styles.container}>
            <textarea placeholder='강의 후기를 작성해주세요'
            value={textarea}
            onChange={e => setTextarea(e.target.value)}
            ></textarea>
            <button className='sColor1' onClick={onWrite}>등록</button>
        </div>
    );
}

export default ClassReviewWrite;