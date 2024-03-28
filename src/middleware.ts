import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';


export async function middleware(req: NextRequest, event: NextFetchEvent) {
    const pathname = req.nextUrl.pathname;
    const access_token = req.cookies.get('access_token')?.value;

    if(access_token){
        // 로그인 시 접근 불가 페이지

        if (
            pathname.startsWith('/login') 
        ) {
            return NextResponse.redirect(new URL('/', req.url));
    
    
        }
    } else {
        // 로그아웃 상태일 때 접근 불가 페이지
        if (
            pathname.startsWith('/mypage') 
        ) {
            return NextResponse.redirect(new URL('/', req.url));
    
    
        }
    }

  
}