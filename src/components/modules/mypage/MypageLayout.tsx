import styles from './dist/MypageLayout.module.css';
import MyMenu from "./MyMenu";

const MypageLayout = ({ 
    title = '', 
    subTitle = '', 
    children 
}:any) => {


    

    return (
        <div className="inner">
            <div className={styles.wrap}>
            
                <div className={styles.container}>
                    <MyMenu />
                    <div className={styles.contents}>
                       <header className={styles.header}>
                        <h4>{title}</h4>
                            {subTitle && <p className={styles.subTitle}>| {subTitle}</p>}
                       </header>

                        <div className={styles.myContents}>
                            {children}
                        </div>
                    </div>
                </div>
            
            </div>
        </div>
    );
}

export default MypageLayout;