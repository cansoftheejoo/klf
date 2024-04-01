import { useRouter } from "next/router";
import styles from './dist/MypageLayout.module.css';
import Link from "next/link";
import { useState, useEffect } from 'react';
import { Icon } from "@iconify/react/dist/iconify.js";
import { navigationItems } from "./mypage_menu";
import { useCheckSignIn } from "@/hook/common";
import { getMyMenuCount } from "@/pages/api/mypage";
import { useQuery } from "react-query";

const MyMenu = () => {

    const router = useRouter()

    const isLoggedIn = useCheckSignIn();


    // 고객센터 토글
    const  [csToggle, setCsToggle] = useState(true)

    
    const { data, status } = useQuery('getMyMenuCount', getMyMenuCount, {
        onSuccess: res => {
            // console.log(res.data)
        }
    })

    if(status == 'loading'){
        return  <footer className={styles.footer}></footer>;
    }

    if (status == 'error') {
        return <p>사이트정보 가져오는 동안 문제가 발생했습니다</p>;
    }


    return (
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

                        {item.id == 'manage' && (
                            <ol>
                                <li
                                className={
                                    router.asPath === "/mypage/open/write" ? styles.active : ''
                                }
                                >
                                    <Link href={"/mypage/open/write"}>강의 등록</Link>
                                </li>
                                {data && data?.map(({
                                    state,
                                    state_nm,
                                    cnt,
                                }:any, i:number) => (
                                    <li
                                    key={`manage${i}`}
                                    className={
                                        router.asPath === `/mypage/open?type=${state}` ? styles.active : ''
                                    }
                                    >
                                    <Link href={`/mypage/open?type=${state}`}>{state_nm} ({cnt})</Link>
                                    </li>
                                ))}
                            </ol>
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
    );
}

export default MyMenu;