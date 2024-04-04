import { getMyCsBoardView } from "@/pages/api/mypage";
import { imgUrl } from "@/util/common";
import { useQuery } from "react-query";

const BoardArticleView = ({
    boardId,
    idx,
}:any) => {


       
    const { data, status } = useQuery(`getMyCsBoardView${idx}`, getMyCsBoardView({
        id: boardId,
        no: idx,
    }), {
        onSuccess: res => {
            console.log(res)
        }
    })


    // if(!data?.answer?.contents) return
    

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
                        <span>{data?.answer?.status}</span>
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