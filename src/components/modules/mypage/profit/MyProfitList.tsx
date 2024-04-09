import Pagination from "@/components/ui/pagination/Pagination";
import { getProfitHistory } from "@/pages/api/mypage";
import { AddCommaNum, lastPage } from "@/util/common";
import { useState } from "react";
import { useInfiniteQuery } from "react-query";

const MyProfitList = () => {

    const stateName:any = {
        "1":"출금신청" ,
        "2":"확인중" ,
        "3":"출금완료" ,
        "4":"반려",
    }

    const [boardParams, setBoardParams] = useState({
        nowPage: 1,
        trace: 'calculate_list',
        viewType: ''
    })



    const { status, data } = useInfiniteQuery([`getProfitHistory${boardParams.trace}`, boardParams], getProfitHistory({
        nowPage : boardParams?.nowPage, 
        trace : boardParams?.trace, 
        viewType : boardParams?.viewType, 
    }))

    if(status == 'loading'){
        return (
            <div>
                <h3>출금 내역</h3>
            </div>
        )
    }
    
    if(status == 'error'){
        return <div>로딩 실패</div>
    }


    return (
        <div>
            <h3>출금 내역</h3>

            {data?.pages && (
                data?.pages[0]?.data && data?.pages[0]?.data.length > 0 ? (
                <>
                    <table>
                        <colgroup>
                            <col width="120px" />
                        </colgroup>
                            {data?.pages.map((page, idx:number) => {
                                return (
                                    <tbody key={`MyProfitList${idx}`}>
                                        {page?.data?.map(({
                                            no,
                                            pay_amount,
                                            recive_amount,
                                            state,
                                            reg_date,
                                            end_date,
                                        }:any, i:number) => (
                                            <tr key={`MyProfitList${no}`}>
                                                <th>{stateName?.[state]}</th>
                                                <td>
                                                    <p className="title">수익금  {AddCommaNum(recive_amount)}원</p>
                                                    <div className="info">
                                                        <span>판매금액 : {AddCommaNum(pay_amount)}원</span>
                                                        <span>신청일 {reg_date}</span>
                                                        {end_date && <span>완료일 {end_date}</span>}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                )
                            })}
                    </table>
                
                    <Pagination 
                    currentPage={Number(boardParams?.nowPage ?? 1) } 
                    totalPages={lastPage(data?.pages[0]?.meta.total_results, data?.pages[0]?.meta.page_count)} 
                    result={num => {
                        setBoardParams({
                            ...boardParams,
                            nowPage: num,
                        })
                    }}
                    />
                </>
                ) : (
                    <p className="nothing">등록된 리뷰가 없습니다</p>
                )
            )}

         
           
            <style jsx>{`
                h3{border-bottom: 1px solid #555; margin-bottom: 25px; padding-bottom: 10px}
                table{width: 100%;}
                table tr th,
                table tr td{padding: 25px; border: 1px solid #555;}
                table tr th{font-weight: 500; background-color: #444;}
                .title{font-size: 16px;}
                .info{font-size: 14px; color: #ddd; margin-top :5px}
                .info span + span::before{content: "|"; margin: 0 10px}

                @media (max-width: 900px) {
                    h3{font-size: 16px}
                    table tr th,
                    table tr td{padding: 15px}
                    table tr th{font-size: 14px}
                    .title{font-size: 15px;}
                    .info{font-size: 13px; }
                }
            `}</style>
        </div>
    );
}

export default MyProfitList;