import Link from 'next/link';
import styles from './dist/MainCategory.module.css';
import { getCategory } from '@/pages/api/main';
import { useQuery } from 'react-query';
import Image from 'next/image';
import { imgUrl } from '@/util/common';

const MainCategory = () => {

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
            <div className={styles.container}>
                {data && data?.map(({
                    no, cate_name, category_id, img_name
                }:any, i:number) => (
                <Link href={`/category/${no}`} key={`main-category-${category_id}`}>
                    <div className={styles.icon}>
                        
                        <Image
                            src={imgUrl(img_name)}
                            alt={cate_name}
                            width={24}
                            height={24}
                        />
                    </div>
                    <p>{cate_name}</p>
                </Link>
                ))}
            </div>
        </div>
        
    );
}

export default MainCategory;