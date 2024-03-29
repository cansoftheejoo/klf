import MypageLayout from "@/components/modules/mypage/MypageLayout";
import BoardList from "@/components/ui/board/BoardList";
import BoardSearch from "@/components/ui/board/BoardSearch";
import MoreBtn from "@/components/ui/btn/MoreBtn";
import { getMyCsBoardList } from "@/pages/api/mypage";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";

const MyCsBoard = () => {

    const router = useRouter()
    const id = router.query?.id as string
    const boardId = id ? id.split('_')?.[0] : null

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

    if(status == 'loading'){
        return 
    }
    
    if(status == 'error'){
        return <div>로딩 실패</div>
    }

    console.log(data)

    return (
        <MypageLayout title={title?.[id] ?? '게시판'}>
            <BoardSearch 
                id={id}
                boardParams={boardParams}
                setBoardParams={(val:any) => setBoardParams(val)}
            />
            {boardId == 'inquiry' && (
             <div style={{ textAlign: 'right', margin: '30px 0' }}>
                <Link href={'/mypage/cs/write'} className="mBtn sColor1">문의하기</Link>
            </div>
            )}
            <BoardList 
                data={data}
                boardParams={boardParams}
                setBoardParams={(val:any) => setBoardParams(val)}
                boardId={boardId}
            />
            {/* <MoreBtn /> */}
        </MypageLayout>
    );
}

export default MyCsBoard;