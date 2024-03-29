import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";

const BoardSearch = ({
    id,
    boardParams,
    setBoardParams = () => {},
}:any) => {

    const [value, setValue] = useState('')

    useEffect(() => {
        setValue('')
      
    },[id])

    return (
        <div className="container">
            <input type="text" placeholder="검색어를 입력해주세요" value={value} onChange={e => setValue(e.target.value)} />
            <button type="button"  onClick={() => {
                // if(value == ''){
                //     alert('검색어를 입력해주세요')
                //     return
                // }
                setBoardParams({
                    ...boardParams,
                    strKeyword: value
                })
            }} ><Icon icon="tdesign:search" color="#333" fontSize={23} /></button>
            <style jsx>{`
                .container{border: 1px solid #ccc; margin: var(--vertical-padding) auto; max-width: 425px; width: 100%; display: flex; align-items: stretch;}
                .container input{border: none; height: 45px; padding: 0 10px; background: transparent; min-width: 10px; flex: 1;}
                .container button{width: 45px; height: 45px; background-color: #fff;}

                @media (max-width: 1400px) {
                    .container input{height: 40px; font-size: 13px;}
                    .container button{height: 40px;}
                }
                @media (max-width: 900px) {
                    .container input{height: 35px; font-size: 13px;}
                    .container button{height: 35px; width: 35px;}
                }
            `}</style>
        </div>
    );
}

export default BoardSearch;