import React, { useState } from 'react'
import Link from 'next/link';
import logo from '/public/images/logo-gray.png';
import Image from 'next/image';
import { useQuery } from 'react-query';
import styles from './dist/Footer.module.css';
import { getFooterInfo } from '@/pages/api/layout';
import { footerInfoType } from '@/type/layout';


const Footer = () => {

    const { data, status } = useQuery('getFooterInfo', getFooterInfo, {
        onSuccess: res => {
            // console.log(res.data)
        }
    })

    if(status == 'loading'){
        return  <footer className={styles.footer}></footer>;
    }

    if (status == 'error') {
        return <p className="nothing">사이트정보 가져오는 동안 문제가 발생했습니다</p>;
    }

    

    return (
        <footer className={styles.footer}>
            <div className={styles.top}>
                <div className='inner'>
                    <div className={styles.inner}>
                        <div className='left'>
                            <Link href={'/notice'}>공지사항</Link>
                            <Link href={'/policy/policy'}>이용약관</Link>
                            <Link href={'/policy/private'}>개인정보취급방침</Link>
                        </div>
                        <ul className="right">
                            <li><Link href={'/faq'}>자주묻는 질문</Link></li>
                            <li><Link href={'/notice'}>기업/단체 교육문의</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={styles.bottom}>
                <div className='inner'>
                    <div className={styles.inner}>
                        <div className={styles.footerLogo}>
                            <Image
                                src={logo}
                                alt={data?.company_info.name ?? '-'}
                                height={65}
                            />
                        </div>
                        <div className={styles.info}>
                            <p className={styles.company}>{data?.company_info.name ?? '-'}</p>
                            <div className={styles.info}>
                                <span>대표이사: {data?.company_info.ceo ?? '-'}</span>
                                <span>개인정보보호책임자: {data?.company_info.personal_manager ?? '-'}</span>
                                <br />
                                <span>사업자등록번호: {data?.company_info.business_number ?? '-'}</span>
                                <br />
                                <span>email: {data?.contact.email ?? '-'}</span>
                                <span>개인정보보호책임자 이메일: {data?.company_info.personal_manager_email ?? '-'}</span>
                                <br />
                                <span>주소: {data?.contact.address ?? '-'}</span>
                            </div>
                            <p className={styles.copyright}>{data?.company_info.copyright}</p>
                        </div>
                      
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;


