import { useRouter } from "next/router";
import styles from './dist/MypageLayout.module.css';
import Link from "next/link";
import { getUserStorage, logout } from "@/pages/api/auth";
import { useState, useEffect } from 'react';
import { Icon } from "@iconify/react/dist/iconify.js";
import { navigationItems } from "./mypage_menu";
import { useCheckSignIn } from "@/hook/common";

const MypageLayout = ({ 
    title = '', 
    subTitle = '', 
    children 
}:any) => {

    const router = useRouter()

    const isLoggedIn = useCheckSignIn();

    const onLogout = () => {
        if(confirm('로그아웃 하시겠습니까?')){
            // logout();
            router.push('/')
        }
        // location.href = '/';
    }


    // 고객센터 토글
    const  [csToggle, setCsToggle] = useState(true)
    

    return (
        <div className="inner">
            <div className={styles.wrap}>
            
                <div className={styles.container}>
                    <nav>
                        <h3><Link href={'/mypage/info'}>마이페이지</Link></h3>
                        <ul>
                        {navigationItems.map((item) => {

                            if(isLoggedIn?.type == "1"){
                                if(item.type == "t"){
                                    return
                                }
                            }


                            if(isLoggedIn?.type == "2"){
                                if(item.type == "s"){
                                    return
                                }
                            }

                            return (
                                <li
                                    key={item.path}
                                    className={router.asPath === item.path ? styles.active : ''}
                                >
                                    {item.subItems ? (
                                        <button onClick={() => setCsToggle(!csToggle)}>
                                            {item.label}{' '}
                                            <Icon icon={`ep:arrow-${csToggle ? 'down' : 'up'}`} />
                                        </button>
                                    ) : (
                                        <Link href={item.path}>{item.label}</Link>
                                    )}

                                    {item.subItems && csToggle && (
                                        <ol>
                                            {item.subItems.map((subItem) => (
                                                <li
                                                    key={subItem.path}
                                                    className={
                                                        router.asPath === subItem.path ? styles.active : ''
                                                    }
                                                >
                                                    <Link href={subItem.path}>{subItem.label}</Link>
                                                </li>
                                            ))}
                                        </ol>
                                    )}
                                </li>
                            )
                        })}

                        </ul>
                    </nav>
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