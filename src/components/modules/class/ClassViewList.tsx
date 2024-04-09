import VideoVerticalCard from "@/components/ui/article/VideoVerticalCard";
import Loading from "@/components/ui/loading/Loading";
import { getClassViewSideList } from "@/pages/api/class";
import { ClassViewType } from "@/type/class";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

const ClassViewList = ({
    store_id,
    list_keyword,
}:ClassViewType) => {

    // const data = [0,0,0,0,0,0,0];
    const router = useRouter()
    const idx = router.query?.idx as string
    
    const { data, status } = useQuery(`getClassViewSideList`, getClassViewSideList({ 
        store_id: store_id,
        list_keyword: list_keyword
    }), {
        refetchOnMount: true,
        onSuccess: res => {
            // console.log(res)
        }
    })

    if(status == 'loading'){
        return <Loading />;
    }

    if (status == 'error') {
        return <p className="nothing">강의 내용을 가져오는 동안 문제가 발생했습니다</p>;
    }

    if(!data) return
    if(data?.result == 'error') return


    const filterData = data?.filter((obj:any) => obj.no != idx)

    return (
        <div>
            <h4>강의 목록</h4>
            <div className="list">
                {filterData && filterData.length > 0 ? (
                    filterData.map((item:any, i:number) => (
                        <VideoVerticalCard key={`ClassViewList${item.no}`}  item={item} />
                    ))
                ) : (
                    <p className="nothing">연관 강의가 없습니다</p>
                )}
            </div>

            <style jsx>{`
                h4{font-size: 26px; font-weight: 500; margin-bottom: 30px;}
                .list{display: flex; flex-direction: column; gap: 20px; max-height: 60vh; overflow-y: auto;}

                @media (max-width: 1400px) {
                    h4{font-size: 22px; margin-bottom: 20px;}
                    .list{gap: 15px;}
                }

                @media (max-width: 900px) {
                    h4{font-size: 16px; margin-bottom: 15px;}
                }
            `}</style>
        </div>
    );
}

export default ClassViewList;