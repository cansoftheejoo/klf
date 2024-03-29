import { getMyCsBoardView } from "@/pages/api/mypage";
import { imgUrl } from "@/util/common";
import { useQuery } from "react-query";

const BoardArticleView = ({
    boardId,
    idx,
}:any) => {

    const handleDownload = async (url:string) => {
       // 1. fetch 실행이 끝나면 FETCH API는 내부적으로 Body Object를 상속받아 Response 인스턴스를 생성
        // const res = await fetch(url)
        // 2. blob() 메소드는 Body Object의 메서드로 상속이 되어있으므로 res.blob() 가능, blob 인스턴스 반환
        const blob = await res.blob()
        // 3. 여기서 이 작업을 해주지않으면 link.download에 있는 파일명으로 다운로드하지 못한다.
        // createObjectURL()는 URL을 DOMString으로 반환한다. (URL 해제는 revokeObjectURL())
        const downloadUrl = window.URL.createObjectURL(blob) // 이 과정이 필요하다.

        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = '다운로드명.xlsx'
        link.click()
      };

       
    const { data, status } = useQuery(`getMyCsBoardView${idx}`, getMyCsBoardView({
        id: boardId,
        no: idx,
    }), {
        onSuccess: res => {
            console.log(res)
        }
    })
    

    if(boardId == 'inquiry'){
        return (
            <div className="container">
                <div className="con" dangerouslySetInnerHTML={{ __html: data?.info?.contents }} />
                {data?.info?.file_name && data?.info?.real_file_name && (
                <div className="file">
                    파일첨부: <a target="_blank" href={imgUrl(data?.info?.file_name)} download>{data?.info?.real_file_name}</a>
                    {/* <button onClick={() => handleDownload(imgUrl(data?.info?.file_name))}>다운로드</button> */}
                </div>
                )}

                <div className="answer">
                    <h5>답변</h5>
                    <div className="con" dangerouslySetInnerHTML={{ __html: data?.answer?.contents }} />
                  
                    <div className="info">
                        <span>{data?.answer?.status?.step}</span>
                        <span>{data?.answer?.status?.name}</span>
                        <span>{data?.answer?.status?.date}</span>
                    </div>
                </div>

                <style jsx>{`
                    .container{padding: 15px; background-color: #444;}
                    .con{font-size: 13px; line-height: 1.6;}
                    .info{color: #999; font-size: 12px; margin-top: 10px;}

                    .answer{margin-top: 20px; padding-top: 20px; border-top: 1px solid #666;}
                    .answer h5{font-weight: 500; font-size: 15px; margin-bottom: 10px;}

                    .file{font-size: 12px; background-color: #222; padding: 10px; color: #999; margin: 10px 0; border-radius: 5px;}
                    .file a{text-decoration: underline; color: #ccc}
                `}</style>
            </div>
        )
    }


    return (
        <div className="container">
            <div className="con" dangerouslySetInnerHTML={{ __html: data?.contents }} />
            <div className="info">
                {data?.regdate}
            </div>

            <style jsx>{`
                .container{padding: 15px; background-color: #444;}
                .con{font-size: 13px; line-height: 1.6;}
                .info{color: #999; font-size: 12px; margin-top: 10px;}
            `}</style>
        </div>
    );
}

export default BoardArticleView;