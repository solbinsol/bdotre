import React from "react";
import style from "./Login.module.css"
import Header from "@/component/Header/Header";
import Footer from "@/component/Footer/Footer";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
const LoginPage = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const router = useRouter();
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setCredentials({ ...credentials, [name]: value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        });
  
        if (res.ok) {
          const { token } = await res.json();
          // Token을 저장 (예: cookie, localStorage)
          localStorage.setItem('token', token); // 토큰을 localStorage에 저장

          console.log('로그인 성공:', token);
          // 로그인 후 이동할 페이지로 리디렉션
          window.alert("로그인성공");
          router.push('./');
        } else {
          throw new Error('로그인 실패');
        }
      } catch (error) {
        console.error('로그인 중 에러 발생:', error);
        alert('로그인에 실패하였습니다.');
      }
    };

    return(
        <div>
            <Header></Header>
            <div className={style.LoginPage}>
                <div className={style.LoginBox}>
                    <h2>BDOT</h2>
                    <form onSubmit={handleSubmit}>

                        <div className={style.LoginForm}>
                            
                            <p className={style.LoginP}>아이디<input
                            type="text"
                            name="username" // name 속성 추가
                            value={credentials.username} // value 속성 연결
                            onChange={handleInputChange} // onChange 이벤트 핸들러 연결
                            placeholder="ID"
                        />
                        </p>
                            <p className={style.LoginP}>패스워드  <input
                            type="password" // password 유형으로 변경
                            name="password" // name 속성 추가
                            value={credentials.password} // value 속성 연결
                            onChange={handleInputChange} // onChange 이벤트 핸들러 연결
                            placeholder="Password"
                        /></p>
                        <button className={style.LoginBtn} type="submit">로그인</button>

                            <div className={style.LoginLi}>
                                <Link href="signup"><li>회원가입</li></Link>
                                <li className={style.R}>아이디/비밀번호 찾기</li>
                            </div>
                        </div>

                    </form>
                    
                </div>
            </div>
            <div className={style.Footerbox}>
            <Footer></Footer>
            </div>
        </div>
    )

}


export default LoginPage