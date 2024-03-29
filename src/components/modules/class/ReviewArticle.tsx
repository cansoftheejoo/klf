import { useMutation, useQueryClient } from 'react-query'
import styles from './ReviewArticle.module.css'
import { postClassReviewDel } from '@/pages/api/class'
import { useRouter } from 'next/router'
import { Icon } from '@iconify/react'
import { useCheckSignIn } from '@/hook/common'

const ReviewArticle = ({
    item
}:{
    item: {
        no?:string,
        name?:string,
        comment?:string,
        reg_date?:string,
    }
}) => {

    const router = useRouter()
    const idx = router.query?.idx as string

    const isLoggedIn = useCheckSignIn();

    const queryClient = useQueryClient()

    const setWrite = useMutation(postClassReviewDel, {
        onSuccess: res => {
            if(res?.result == 'success'){
                queryClient.invalidateQueries([`getClassReviewList${idx}`])
                alert('후기가 삭제되었습니다.')
            } else {
                alert(res.message)
            }
        }
    })

    const onWrite = () => {

        const params = {
            no : item.no,      
        }
        setWrite.mutate(params)
    }

    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <span>{item.name}</span>
                <span>{item.reg_date}</span>
            </div>
            <div className={styles.contents}>{item.comment}</div>

            {isLoggedIn?.userid == '' && (
            <button className={styles.del} onClick={onWrite}> <Icon icon="material-symbols:close" fontSize={18} color="#ccc" /></button>
            )}
        </div>
    );
}

export default ReviewArticle;