import { getPolicy } from "@/pages/api/layout";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import styles from './PolicyModule.module.css'

const PolicyModule = () => {
    const router = useRouter()
    const id = router.query?.id as string

    const { data, status } = useQuery(`getPolicy${id}`, getPolicy(id), {
        onSuccess: res => {
            console.log(res)
        }
    })


    if(status == 'loading'){
        return 
    }

    if (status == 'error') {
        return <p>배너를 가져오는 동안 문제가 발생했습니다</p>;
    }

    return (
        <div className={`inner ${styles.container}`} >
            <h3>{id == 'policy' ? '이용약관' : '개인정보취급방침'}</h3>
            <div dangerouslySetInnerHTML={{ __html: data?.contents }} />
        </div>
    );
}

export default PolicyModule;