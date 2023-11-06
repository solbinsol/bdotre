import React, { useEffect } from "react";
import style from "./myPage.module.css";
import Header from "@/component/Header/Header";
import Footer from "@/component/Footer/Footer";
import jwt from "jsonwebtoken"; 

// ...


const myPage = () => {

    useEffect(() => {
        // 로컬 스토리지에서 'token' 키를 사용하여 토큰 가져오기
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
          // 토큰 디코드
          const decoded = jwt_decode(storedToken);
          console.log('디코드된 토큰:', decoded);
          
          // 디코드된 객체에서 username에 접근
          const username = decoded.username;
          console.log(username);
        }
      }, []);
      
  return(
    <div>
      <Header />
      <div className={style.MyPage}>
        <div className={style.MyPageBox}>
          <h1>MyPage</h1>
 
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default myPage;
