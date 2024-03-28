import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import logo from '/public/images/logo.png';
import styles from './Header.module.css';
import { checkLogin } from '@/pages/api/auth';
import { Icon } from '@iconify/react';
import { useCheckSignIn, useSignOut } from '@/hook/common';



const Header = () => {

    const router = useRouter()
    const { pathname } = router

    const isLoggedIn = useCheckSignIn();

    const signOut = useSignOut()

    // useEffect(() => {
    //     let check = checkLogin()
    //     setIsLoggedIn(check);
     
    // }, [router]);

    return (
        <>
            <header id='header' className={styles.header}>
                <div className='inner'>
                    <div className={styles.headerInner}>
                        <Link className={styles.web} href={'/'}>
                            <Image
                                src={logo}
                                alt="KLF"
                                height={50}
                            />
                        </Link >
                        <div className={styles.mobile}>
                            {pathname == '/' ? (
                                <Link href={'/'}>
                                    <Image
                                        src={logo}
                                        alt="FCLAW"
                                        height={50}
                                    />
                                </Link >
                            ) : (
                               <>
                                <button onClick={() => router.back()}><Icon icon="mdi:arrow-left" fontSize={30} color="#fff" /></button>
                                 <Link href={'/'} className={styles.centerLogo}>
                                    <Image
                                        src={logo}
                                        alt="FCLAW"
                                        height={50}
                                    />
                                </Link >
                               </>
                            )}
    
                          
                        </div>
                        
                        <div className={styles.web}>
                            {isLoggedIn ? (
                                <>
                                <button className={styles.myBtn} onClick={() => signOut()}>로그아웃</button>
                                <Link 
                                href="/mypage/info"
                                className={styles.myBtn}
                                >나의 강의</Link>
                                </>
                            ) : (
                                <Link 
                                href={'/login'}
                                className={styles.myBtn}
                                >로그인</Link>
                            )}
                           
                            
                        </div>
                    </div>
                </div>

            </header>
        </>
       
    );
}

export default Header;