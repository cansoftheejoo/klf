import LinkCard from "@/components/ui/article/LinkCard";
import { getCustomInquiry } from "@/pages/api/main";
import { useQuery } from "react-query";
import MainContactWrite from "./MainContactWrite";
import { useState } from "react";

const MainContact = () => {

    // getCustomInquiry


    
    const [filter, setFilter] = useState({
        type: '',
        title: '',
        active: false,
    })

    const toggle = () => setFilter({
        ...filter,
        active: !filter.active
    })


    const { data, status } = useQuery('getCustomInquiry', getCustomInquiry, {
        onSuccess: res => {
            // console.log(res)
        }
    })

    if(status == 'loading'){
        return <div></div>
    }

    if (status == 'error') {
        return <p>배너를 가져오는 동안 문제가 발생했습니다</p>;
    }

    if(!data) return
    

    return (
        <div className="container">
            <div className="inner">
                {data.map(({
                    no,
                    title,
                    sub_title,
                    btn_name,
                }:any) => (
                <LinkCard 
                    key={`MainContact${no}`}
                    no={no}
                    title={title}
                    contents={sub_title}
                    btn={btn_name}
                    setFilter={() => {
                        setFilter({
                            type: no,
                            title: title,
                            active: true,
                        })
                    }}
                />
                ))}
               
            </div>
            <MainContactWrite 
                filter={filter}
                toggle={toggle}
            />
            <style jsx>{`
                .container{background: #292929; padding: 110px 0;}
                .inner{display: flex; gap: 32px; align-items: stretch; justify-content: center;}

                @media (max-width: 1400px) {
                    .container{padding: 80px 0;}
                    .inner{gap: 15px;}
 
                }

                @media (max-width: 900px) {
                    .container{padding: 40px 0;}
                   .inner{flex-direction: column;}
                }

            `}</style>
        </div>
    );
}

export default MainContact;