"use client"
import ClassViewModule from "@/components/modules/class/ClassViewModule"
import MyClassViewModule from "@/components/modules/class/MyClassViewModule"
import Loading from "@/components/ui/loading/Loading"
import { getClassView, getMyClassView, postUpdateVideoView } from "@/pages/api/class"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useMutation, useQuery } from "react-query"

const MyClassViewScreen = () => {

        
    const router = useRouter()
    const idx = router.query?.idx as string


    const [updateParams, setUpdateParams] = useState({
        channel_id: '',
        object_id: '',
        study_idx: '',
    })

    // 시청 업데이트
    const setUpdate = useMutation(postUpdateVideoView, {
        onSuccess: res => {
            // console.log('setUpdate')
            // console.log(res)
        }
    })

    const { data, status } = useQuery(`getMyClassView${idx}`, getMyClassView({ no: idx }), {
        onSuccess: res => {

            // if(res?.resultCode == 102 || res?.resultCode == 101){
            //     setTimeout(() => {
            //         router.back()
            //     }, 1000);
            // }

        }
    })

    useEffect(() => {
        setUpdateParams({
            channel_id: data?.channel_id,
            object_id: data?.object_id,
            study_idx: data?.no,
        })
    },[data])


    useEffect(() => {
        return () => {
            // 시청 업데이트
            setUpdate.mutate(updateParams)
        }
    },[])

    if(status == 'loading'){
        return <Loading />;
    }

    if (status == 'error') {
        return <p className="nothing">강의 내용을 가져오는 동안 문제가 발생했습니다</p>;
    }

    return (
        <MyClassViewModule data={data} />
    );
}

export default MyClassViewScreen;