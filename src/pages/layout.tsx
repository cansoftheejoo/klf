// import BottomNavi from "@/components/modules/navigation/BottomNavi";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Head from "next/head";

const BaseLayout = ({ children }: {
    children: React.ReactNode
}) => {
    return (
    <div>
        <Head>
            <title>KLF</title>
            <meta name="description" content="KLF에서 전문가와 상담하세요" />
            <meta name="keywords" content="프렌차이즈,가맹거래사,창업,변호사" />
            <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet"></link>

        </Head>
        {/* 헤더 */}
        <Header />
        <main style={{ minHeight: '80vh' }} id="test">
            {children}
        </main>
        {/* <BottomNavi /> */}
        
       
        <Footer />
    </div>
    );
}

export default BaseLayout;