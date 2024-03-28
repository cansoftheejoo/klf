import { useCategoryClassList } from "@/hook/class";
import { useEffect, useState } from "react";

const SortHeader = ({
    title = '',
}) => {

    const [active, setActive] = useState('1')

    const [filter, setFilter] = useCategoryClassList()

    useEffect(() => {
        setFilter({
            ...filter,
            sort: active
        })
    }, [active])

    const sortBtns = [
        {
            name: '최신순',
            value: '1',
        },
        {
            name: '추천순',
            value: '2',
        },
        {
            name: '인기순',
            value: '3',
        },
    ]

    return (
        <header>
            <h4>{title}</h4>
            <div className="right">
                {sortBtns.map(({
                    name, value
                }) => (
                    <button 
                    key={`sort${value}`} 
                    className={active == value ? 'active' : ''}
                    onClick={() => setActive(value)}
                    >{name}</button>
                ))}
            </div>
            <style jsx>{`
                header{margin: var(--vertical-padding) 0; display: flex; align-items: center; justify-content: space-between;}
                header h4{font-size: 24px; border-bottom: 2px solid var(--color1); padding-bottom: 5px;}
                header .right{display: inline-flex; align-items: stretch; border: 1px solid #555;}
                header .right button{height: 35px; padding: 0 15px; color: #fff}
                header .right button + button{border-left: 1px solid #555;}
                header .right button.active{background: var(--color1);}

                @media (max-width: 1400px) {
                    header {
                        max-width: 960px;
                        margin: var(--vertical-padding) auto;
                    }
                    header .right button{font-size: 14px;}
                }
                @media (max-width: 900px) {
                    header {
                        max-width: 530px;
                    }
                    header h4{font-size: 16px; font-weight: 500;}
                    header .right button{font-size: 11px; height: 28px; padding: 0 10px;}
                }
            `}</style>
        </header>
    );
}

export default SortHeader;