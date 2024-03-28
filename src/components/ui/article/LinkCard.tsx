import Link from "next/link";

const LinkCard = ({
    no = '',
    title = '',
    contents = '',
    btn = '',
    setFilter = () => {}
}) => {


    return (
        <div className="container">
            <h5>{title}</h5>
            <p>{contents}</p>
            <button className="btn" onClick={setFilter}>{btn}</button>
            <style jsx>{`
                .container{background: #444; border: 1px solid #666; border-radius: 5px; padding: 55px 45px; width: 100%;}
                .container h5{font-size: 20px; margin-bottom: 35px;}
                .container p{font-size: 14px; color: #eee; min-height: 135px; padding-bottom: 40px; margin: 35px 0;}
                .container .btn{display: flex; align-items: center; justify-content: center; width: 100%; height: 48px; font-size: 16px; font-weight: 500; color: #333; background-color: var(--color1); border-radius: 8px; opacity: 0.9;}
                .container .btn:hover{opacity: 1;}

                @media (max-width: 1400px) {
                    .container{padding: 30px;}
                }
                @media (max-width: 900px) {
                    .container{padding: 20px;}
                    .container h5{font-size: 16px; margin-bottom: 10px;}
                    .container p{min-height: auto; margin: 20px 0; font-size: 13px;}
                    .container .btn{opacity: 1; font-size: 14px;}
                }

            `}</style>
        </div>
    );
}

export default LinkCard;