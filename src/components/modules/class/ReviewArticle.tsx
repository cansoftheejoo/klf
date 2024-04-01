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
        id?:string,
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
            } else {
                alert(res?.msg)
            }
        }
    })

    const onWrite = () => {

        if(!confirm('후기를 삭제하시겠습니까?')) return
        const params = {
            no : item.no,      
        }
        setWrite.mutate(params)
    }

    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <span>{item?.name}</span>
                <span>{item?.reg_date}</span>
            </div>
            <div className={styles.contents}>{item?.comment}</div>

            {isLoggedIn?.userid == item?.id && (
            <button className={styles.del} onClick={onWrite}> <Icon icon="material-symbols:close" fontSize={18} color="#ccc" /></button>
            )}
        </div>
    );
}

export default ReviewArticle;