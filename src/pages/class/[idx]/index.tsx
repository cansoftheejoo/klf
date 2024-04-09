"use client"

import ClassViewModule from "@/components/modules/class/ClassViewModule";
import Loading from "@/components/ui/loading/Loading";
import { getClassView } from "@/pages/api/class";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

const ClassScreen = () => {

    const router = useRouter()
    const idx = router.query?.idx as string

    const { data, status } = useQuery(`getClassView${idx}`, getClassView({ no: idx }), {
        onSuccess: res => {

        }
    })


    if(status == 'loading'){
        return <Loading />;
    }

    if (status == 'error') {
        return <p className="nothing">강의 내용을 가져오는 동안 문제가 발생했습니다</p>;
    }

    return (
       <ClassViewModule data={data} />
    );
}

export default ClassScreen;