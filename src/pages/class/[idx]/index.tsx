"use client"
import CategorySub from "@/components/modules/category/CategorySub";
import ClassViewContents from "@/components/modules/class/ClassViewContents";
import ClassViewHeader from "@/components/modules/class/ClassViewHeader";
import ClassViewList from "@/components/modules/class/ClassViewList";
import ClassViewMore from "@/components/modules/class/ClassViewMore";
import { getClassView, postUpdateVideoView } from "@/pages/api/class";
import { postUserData } from "@/pages/api/post";
import { ClassViewType } from "@/type/class";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";

const ClassScreen = () => {

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

    const { data, status } = useQuery(`getClassView${idx}`, getClassView({ no: idx }), {
        onSuccess: res => {

            if(res?.resultCode == 102 || res?.resultCode == 101){
                setTimeout(() => {
                    router.back()
                }, 1000);
            }

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
        return ;
    }

    if (status == 'error') {
        return <p>강의 내용을 가져오는 동안 문제가 발생했습니다</p>;
    }

    if(data?.resultCode == 102 || data?.resultCode == 101) return <div style={{ padding: '30vh 0' }}><p className="nothing">수강중인 동영상이 아닙니다. <br />이전 페이지로 이동합니다</p></div>


    const item:ClassViewType = data

    return (
        <>
  
            <div className="inner">
                <div className="container">
                    <div className="header">
                        <ClassViewHeader 
                            title={item.title}
                            duration={item.duration}
                            store_name={item?.store_name}
                        />
                    </div>
                    <div className="contents">
                        <ClassViewContents item={item} />
                        
                    </div>
                    <div className="list">
                       <div className="fix">
                       <ClassViewList 
                       store_id={item?.store_id}
                       list_keyword={item?.list_keyword}
                       />
                       </div>
                    </div>
                </div>
            </div>
            <ClassViewMore />
            
            <style jsx>{`
                .container{
                    padding: var(--vertical-padding) 0; 
                    display: grid;
                    grid-template-areas:
                    "header header header"
                    "contents contents list";
                    grid-template-columns: repeat(3, 1fr); /* 4개의 열로 시작 */
                }
                .container .header{grid-area: header; background: #333; position: sticky; z-index: 5; top: 0; }
                .container .contents{grid-area: contents; padding-right: 50px;}
                .container .list{grid-area: list; }
                .container .list .fix{position: sticky; top: 130px;}

                @media (max-width: 1400px) {
                    .container{
                        grid-template-areas:
                        "header header header header"
                        "contents contents contents list";
                        grid-template-columns: repeat(4, 1fr); /* 4개의 열로 시작 */
                    }

                    .container .contents{padding-right: 20px;}
                    .container .list .fix{top: 101px;}
                }

                @media (max-width: 900px) {
                    .container{display: block; padding-top: 0;}
                    .container .contents{padding-right: 0;}
                    .container .list .fix{position: inherit;}
                }
            `}</style>
            <style jsx global>{`
                #header{position: relative;}
            `}</style>
        </>
    );
}

export default ClassScreen;