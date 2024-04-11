import BoardList from "@/components/ui/board/BoardList";
import BoardSearch from "@/components/ui/board/BoardSearch";
import Loading from "@/components/ui/loading/Loading";
import { getMyCsBoardList } from "@/pages/api/mypage";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";

const BoardListScreen = () => {

    const router = useRouter()
    const id = router.query?.id as string

    
    const title:any = {
        'notice_list': '공지사항',
        'fag_list': '자주 묻는 질문',
        'inquiry_list': '문의 내역',
    }

    const [boardParams, setBoardParams] = useState({
        nowPage: 1,
        strKeyword: '',
        id: '',
    })


    useEffect(() => {
        setBoardParams({
            nowPage: 1,
            strKeyword: '',
            id: id,
        })
      
    },[id])

    const { status, data } = useInfiniteQuery([`getMyCsBoardList${boardParams.id}`, boardParams], getMyCsBoardList({
        id: boardParams.id, 
        strKeyword: boardParams.strKeyword, 
        nowPage : boardParams?.nowPage , 
    }))

    
    if(status == 'error'){
        return <div>로딩 실패</div>
    }


    return (
        <div className="inner">
            {status == 'loading' ? (
                <Loading />
            ) : (
                <div style={{ padding: '80px 0' }}>
                    <h3>{title?.[id] ?? '게시판'}</h3>
                    <BoardSearch
                        id={id}
                        boardParams={boardParams}
                        setBoardParams={(val:any) => setBoardParams(val)}
                    />
                    <BoardList
                        data={data}
                        boardParams={boardParams}
                        setBoardParams={(val:any) => setBoardParams(val)}
                        boardId={id}
                    />
                </div>
            )}
        </div>
    );
}

export default BoardListScreen;