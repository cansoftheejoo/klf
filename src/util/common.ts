export const imgUrl = (url:string) => process.env.NEXT_PUBLIC_API_URL + url

// 쿠키 저장
export const setCookie = (name:string, value:string, hours:number) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + hours * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

export function deleteCookie(name:string) {
    const expires = new Date(0);  // 쿠키를 만료시키기 위해 1970년 1월 1일로 설정
    document.cookie = `${name}=;expires=${expires.toUTCString()};path=/`;
};
  
export const getCookie = (name: string) => {
    const cookieString = document.cookie;
    const cookies = cookieString.split(';');
  
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.trim().split('=');
  
      if (cookieName === name) {
        return cookieValue;
      }
    }
  
    return null;
};