import { formatTime } from "@/util/common";
import { Icon } from "@iconify/react/dist/iconify.js";
import ClassBookMark from "./ClassBookMark";

const ClassViewHeader = ({
    title = '',
    duration = '',
    store_name = '',
}) => {
    return (
        <div className="container">
            <header>
                <h3 className="ellipsis1">{title}</h3>
                <p>{store_name} · {formatTime(duration)}</p>
            </header>
            <div className="action">
                <ClassBookMark />
                <button>
                    <Icon icon="lucide:share" color="#fff" fontSize={26} />
                </button>
            </div>
            <style jsx>{`
                .container{display: flex; align-items: center;}
                .container header{width: 85%; padding: 30px 0}
                .container header h3{color: #fff; font-size: 30px; font-weight: 500;}
                .container header p{font-size: 15px; color: #999; margin-top: 5px;}
                .container .action{width: 15%; display: flex; align-items: center; justify-content: flex-end; gap: 15px;}

                @media (max-width: 1400px) {
                    .container header{padding: 20px 0}
                    .container header h3{font-size: 22px;}
                }
                @media (max-width: 900px) {
                    .container{display: block;}
                    .container header{width: 100%;}
                    .container header h3{font-size: 16px;}
                    .container header p{font-size: 12px;}
                    .container .action{display: none;}
                }
            `}</style>
        </div>
    );
}

export default ClassViewHeader;