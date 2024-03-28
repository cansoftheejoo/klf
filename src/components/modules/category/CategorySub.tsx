import { getCategory } from "@/pages/api/main";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

const CategorySub = () => {

    const router = useRouter()
    const pageNo = router.query?.no as string

    const { data, status } = useQuery('getCategory', getCategory, {
        onSuccess: res => {
            // console.log(res)
        }
    })


    if(status == 'loading'){
        return <p></p>
    }

    if (status == 'error') {
        return <p>데이터 로딩 문제가 발생했습니다</p>;
    }
    
    return (
        <div className="inner">
            <div className="container">
                {data && data?.map(({
                    no, cate_name, category_id, img_name
                }:any, i:number) => (
                <Link href={`/category/${no}`} key={`sub-category-${i}`}><span className={`btn ${no == pageNo ? 'active' : ''}`}>{cate_name}</span></Link>
                ))}
            </div>

            <style jsx>{`
                .container{display: flex; gap: 15px; flex-wrap: wrap; align-items: flex-start; justify-content: space-between; padding: 40px 0}
                .btn{font-size: 18px; color: #aaa}
                .btn.active{color: var(--color1)}
                .btn:hover{color: var(--color1)}
                @media (max-width: 1400px) {
                    .container{justify-content: center; }
                    .btn{font-size: 15px;}
                }
                @media (max-width: 900px) {
                    .inner{padding: 0 !important;}
                    .container{overflow-x: auto; flex-wrap: nowrap; justify-content: flex-start; padding: 15px 20px; background-color: #444;}
                    .btn{font-size: 13px; white-space: nowrap;}
                }
            `}</style>
        </div>
    );
}

export default CategorySub;