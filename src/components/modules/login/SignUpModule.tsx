import SignUpCompayList from "@/components/modules/login/SignUpCompayList";
import styles from "./SignUpModule.module.css";
import { useRouter } from "next/router";


const SignUpModule = () => {

    const router = useRouter()
    const type = router.query?.type as string


    const handleSubmit = (e:any) => {
        e.preventDefault();
    }


    /*
        일반 회원가입
        company_id
        userid
        user_nickname
        userpass
        userpassd
        usertel // 연락처 쓰이는 곳 없음
        file_name // 프로필 사진 쓰이는 곳 없음

        firebasetoken

        판매자 회원
        userid
        username // 판매점명
        userpass
        userpassd
        usertel // 연락처 쓰이는 곳 없음
        file_name // 프로필 사진 쓰이는 곳 없음

        company_no // 사업자등록번호
        
        firebasetoken

    */

    return (
        <form onSubmit={handleSubmit} className={styles.container}>
            <h3 className={styles.title}>{type == '1' ? '일반' : '판매자'} 회원가입</h3>
            {type == '1' && (
            <article>
                <h5>가맹점</h5>
                <div className="input">
                    <SignUpCompayList />
                </div>
            </article>
            )}
          

            {/* 공통 */}
            <article>
                <h5>이메일 (아이디)</h5>
                <div className="input">
                    <input type="text" name="userid" required placeholder="이메일" />
                    <button className="bColorF" type="button">중복확인</button>
                </div>
            </article>

            {type == '1' ? (
            <article>
                <h5>닉네임</h5>
                <div className="input">
                    <input type="text" name="user_nickname" placeholder="닉네임" />
                    <button className="bColorF" type="button">중복확인</button>
                </div>
            </article>
            ) : (
            <article>
                <h5>판매점명</h5>
                <div className="input">
                    <input type="text" name="username" placeholder="닉네임" />
                    <button className="bColorF" type="button">중복확인</button>
                </div>
            </article>
            )}

            {/* 공통 */}
            <article>
                <h5>비밀번호</h5>
                <div className="input">
                    <input type="password" placeholder="비밀번호" />
                </div>
            </article>
            <article>
                <h5>비밀번호 확인</h5>
                <div className="input">
                    <input type="password" placeholder="비밀번호 확인" />
                </div>
            </article>

            {/* <article>
                <h5>연락처</h5>
                <div className="input">
                    <input type="tel" name="usertel" required placeholder="연락처" />
                </div>
            </article> */}

            {type == '2' && (
                <>
                <article>
                    <h5>사업자등록번호</h5>
                    <div className="input">
                        <input type="text" name="company_no" placeholder="사업자등록번호" />
                    </div>
                </article>
                <article>
                    <h5>사업자등록증</h5>
                    <div className="file">
                        <input type="file" name="file_name" placeholder="사업자등록번호" />
                    </div>
                </article>
                
                </>
            )}

            <div className={styles.bottomBtn}>
                <button className="sColor1 mBtn wBtn">회원가입</button>
            </div>
        </form>
    );
}

export default SignUpModule;