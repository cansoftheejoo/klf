
import Pagination from "../pagination/Pagination";
import BoardListArticle from "./BoardListArticle";
import { lastPage } from "@/util/common";

const BoardList = ({
    data,
    boardParams,
    setBoardParams = () => {},
    boardId,
}:any) => {
    return (
        <div className="container">

            {data?.pages && (
                data?.pages[0]?.data && data?.pages[0]?.data.length > 0 ? (
                <>
                    {data?.pages.map((page:any, idx:number) => {
                        return (
                            <div className="list" key={`CsBoardList${idx}`}>
                                {page?.data?.map((item:any, i:number) => (
                                <BoardListArticle 
                                    key={`BoardList${item?.no}`}
                                    idx={item?.no}
                                    title={item?.title}
                                    date={item?.register_date}
                                    boardId={boardId}
                                    />
                                ))}
                            </div>
                        )
                    })}
                
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
                    <p className="nothing">등록된 글이 없습니다</p>
                )
            )}

       
           

         

            <style jsx>{`
                .container{width: 100%;}    
                header{display: flex; align-items: center; padding: 20px 0; border: 1px solid #eee; border-width: 1px 0;}
                header .title{width: 80%; padding-left: 20px}
                header .date{width: 20%;}

                @media (max-width: 1400px) {
                    header{padding: 10px 0; font-size: 14px;}
                }
                @media (max-width: 900px) {
                    header{font-size: 13px;}
                }
            `}</style>
        </div>
    );
}

export default BoardList;