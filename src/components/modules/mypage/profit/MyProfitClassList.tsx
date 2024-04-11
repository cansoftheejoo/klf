import Loading from "@/components/ui/loading/Loading";
import Pagination from "@/components/ui/pagination/Pagination";
import { getProfitHistory } from "@/pages/api/mypage";
import { AddCommaNum, lastPage } from "@/util/common";
import { useState } from "react";
import { useInfiniteQuery } from "react-query";

const MyProfitClassList = () => {

    const stateName:any = {
        "N":"신청전" ,
        "Y":"출금완료" ,
        "C":"출금신청" ,
    }

    const [boardParams, setBoardParams] = useState({
        nowPage: 1,
        trace: 'calculate_online_list',
        viewType: ''
    })



    const { status, data } = useInfiniteQuery([`getProfitHistory${boardParams.trace}`, boardParams], getProfitHistory({
        nowPage : boardParams?.nowPage, 
        trace : boardParams?.trace, 
        viewType : boardParams?.viewType, 
    }))

    if(status == 'loading'){
        return <Loading />
    }
    
    if(status == 'error'){
        return <div>로딩 실패</div>
    }

    /*
     "idx": "7",
    "online_name": "가맹사업법령",
    "cnt": "1",              //총판매건수
    "amount": "50,000",      //공급가액 
    "tot_pay_amount": "50,000",  //총공급가액
    "pay_amount": "48,000",    //판매금액
    "recive_amount": "38,400",  //수익금액
    "calculate_yn": "C",     //출금신청 상태  (N :신청전 Y:출금완료 C : 출금신청)
    "reg_date": "2023-11-10 11:03:44",    //등록일
    "calculate_date": "2023-11-14 13:18:14", //신청일
    "calculate_recive_date": ""              //입금일

    */

    return (
        <div>
            <header>
                <h3>강의별 수익금 내역</h3>
                <p className="priceDate">기준일 {(new Date().toISOString().slice(0,10))}</p>
            </header>

            {data?.pages && (
                data?.pages[0]?.data && data?.pages[0]?.data.length > 0 ? (
                <>
                    <table>
                        <colgroup>
                        <col  />
                        <col width="120px" />
                        <col width="120px" />
                    </colgroup>
                        <thead>
                            <tr>
                                <th rowSpan={2}>강의 정보</th>
                                <th colSpan={2}>정산 금액</th>
                            </tr>
                            <tr>
                                <th className="profit">공급가액</th>
                                <th className="profit">실제수입</th>
                            </tr>
                        </thead>
                            {data?.pages.map((page, idx:number) => {
                                return (
                                    <tbody key={`MyProfitList${idx}`}>
                                        {page?.data?.map(({
                                            no,
                                            online_name,
                                            cnt,
                                            amount,
                                            tot_pay_amount,
                                            pay_amount,
                                            recive_amount,
                                            calculate_yn,
                                            reg_date,
                                            calculate_date,
                                            calculate_recive_date,
                                        }:any, i:number) => (
                                            <tr key={`MyProfitList${no}`}>
                                               <td>
                                                    <p className="title">{online_name}</p>
                                                    <div className="info">
                                                        <span>총 판매 : {cnt}건</span>
                                                        <span>총 누적 공급가액 : {AddCommaNum(tot_pay_amount)}원</span>
                                                    </div>
                                                </td>
                                                <td>{AddCommaNum(amount)}원</td>
                                                <td>{AddCommaNum(recive_amount)}원</td>
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
                            nowPage: Number(num),
                        })
                    }}
                    />
                </>
                ) : (
                    <p className="nothing">등록된 리뷰가 없습니다</p>
                )
            )}


         
        
            <style jsx>{`
                header{border-bottom: 1px solid #555; margin-bottom: 25px; padding-bottom: 10px; display: flex; align-items: center; justify-content: space-between}
                h3{}
                .priceDate{color: #ccc; font-size: 14px; margin-top: 5px}
                table{width: 100%;}
                table tr th,
                table tr td{ border: 1px solid #555;}
                table tr td{padding: 20px;}
                table tr th{padding: 5px 10px; font-weight: 500; background-color: #444; font-size: 14px}
                .title{font-size: 16px;}
                .info{font-size: 14px; color: #ddd; margin-top :5px}
                .info span + span::before{content: "|"; margin: 0 10px}
                .mobile{display: none}
                
                @media (max-width: 1200px) {
                    .web{display: none}
                    .mobile{display: block}
                }

                @media (max-width: 900px) {
                    h3{font-size: 16px}
                    table tr td{padding: 15px}
                    table tr th{font-size: 14px; padding: 5px}
                    .title{font-size: 15px;}
                    .info{font-size: 13px; }
                }
            `}</style>
        </div>
    );
}

export default MyProfitClassList;