import SubLayout from "@/components/layout/SubLayout";
import CategorySub from "@/components/modules/category/CategorySub";
import CategpryList from "@/components/modules/category/CategpryList";
import Loading from "@/components/ui/loading/Loading";
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
            // console.log(res)
        }
    })




    if (status == 'error') {
        return <p>강의 리스트를 가져오는 동안 문제가 발생했습니다</p>;
    }


    return (
        <SubLayout>
            <div style={{ opacity: status == 'success' ? 1 : 0, transition: 'all 0.6s' }}>
                {status == 'success' && (
                    <>
                        <PageHeader
                            title={data?.cate_name}
                            cate_name_detail={data?.cate_name_detail}
                        />
                        <SortHeader 
                            title={data?.cate_name}
                        />
                        <CategpryList  />
                    </>
                )}
            </div>
        </SubLayout>
    );
}

export default CategoryScreen;