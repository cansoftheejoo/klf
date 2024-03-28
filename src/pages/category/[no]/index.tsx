import CategorySub from "@/components/modules/category/CategorySub";
import CategpryList from "@/components/modules/category/CategpryList";
import PageHeader from "@/components/ui/page/PageHeader";
import SortHeader from "@/components/ui/page/SortHeader";
import { getCategoryInfo } from "@/pages/api/class";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";

const CategoryScreen = () => {

    // getCategoryInfo


    const router = useRouter()
    const no = router.query?.no as string
     
    const { data, status } = useQuery(`getCategoryInfo${no}`, getCategoryInfo({ no: no }), {
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
        <>
            <CategorySub />
            <div className="inner">
              
                <PageHeader
                    title={data?.cate_name}
                    cate_name_detail={data?.cate_name_detail}
                />
                <SortHeader 
                    title={data?.cate_name}
                />
                <CategpryList  />
            </div>
        </>
    );
}

export default CategoryScreen;