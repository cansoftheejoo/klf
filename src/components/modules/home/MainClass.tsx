import ClassCard from "@/components/ui/article/ClassCard";
import { getMainVideo } from "@/pages/api/main";
import { useQuery } from "react-query";

const MainClass = () => {

    const sample = [0,0,0];

    
    const { data, status } = useQuery(`getMainVideo-recom`, getMainVideo('recom', 3), {
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

    if(!data) return


    console.log(data)
    return <div></div>

    return (
        <div className="inner">
            <div className="container">
                {data?.map(({
                    no,
                    title,
                    store_name,
                    category,
                    keyword,
                    list_keyword,
                    amount,
                    pay_amount,
                    duration,
                    poster_url,
                }:any, i:number) => (
                <ClassCard
                    key={`MainClass-ClassCard-${no}`}
                    link={`/class/${no}`}
                    poster_url={poster_url}
                    title={title}
                    maker={store_name}
                    min={10}
                />
                ))}
               
    
                <style jsx>{`
                    .container{display: flex; gap: 20px; justify-content: stretch; margin: 60px 0;}

                    @media (max-width: 900px) {
                        .container{flex-direction: column; align-items: center; margin: 30px 0}
              
                    }
                `}</style>
            </div>
        </div>
    );
}

export default MainClass;