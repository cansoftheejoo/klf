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

// 한글 시간 표시
export function formatTime(timeString:string) {
  const [hours, minutes, seconds] = timeString.split(':');

  const h = hours && Number(hours) > 0 ? `${parseInt(hours, 10)}시간` : ''
  const m = minutes && Number(minutes) > 0 ? `${parseInt(minutes, 10)}분` : ''
  const s = seconds && Number(seconds) > 0 ? `${parseInt(seconds, 10)}초` : ''

  return h + m + s

}

// 마지막 페이지
export function lastPage(total_results:number|string, page_count:number|string) {
  return Math.ceil(Number(total_results) / Number(page_count))
}

// 숫자 콤마 추가
export const AddCommaNum = (inputNumber:string|number) => {
  let formetedNumber = (Number(inputNumber)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  let splitArray = formetedNumber.split('.');
  if (splitArray.length > 1) {
      formetedNumber = splitArray[0];
  }
  return (formetedNumber);
};