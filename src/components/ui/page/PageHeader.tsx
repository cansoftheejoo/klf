const PageHeader = ({
    title = '',
    cate_name_detail = ''
}) => {
    return (
        <header>
            <h3>{title}</h3>
            <p>{cate_name_detail} </p>
            <style jsx>{`
                header{border-bottom: 1px solid #555; margin-bottom: 30px; padding:  var(--vertical-padding) 0;}
                header h3{font-size: 35px; font-weight: 700; color: #fff; margin-bottom: 20px;}
                header p{font-size: 15px; color: #fff; opacity: 0.7; white-space: pre-line;}

                @media (max-width: 1400px) {
                    header {
                        max-width: 960px;
                        margin: 0 auto;
                        margin-bottom: 30px;
                    }
                }
                @media (max-width: 900px) {
                    header {
                        max-width: 530px;
                    }
                    header h3{font-size: 25px;}
                    header p{font-size: 13px;}
                    header p br{display: none;}
                }
            `}</style>
        </header>
    );
}

export default PageHeader;