import React, { useEffect ,useState } from "react";
import style from "./myPage.module.css";
import Header from "@/component/Header/Header";
import Footer from "@/component/Footer/Footer";
import jwt from "jsonwebtoken"; 
import Link from "next/link";
// ...


const myPage = () => {
    const [userName, setUserName] = useState("");
    const [userGender, setUserGender] = useState("");
    const [userBirth, setUserBirth] = useState("");
    const [userPhone, setUserPhone] = useState("");

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        
        if (storedToken) {
          // 토큰 디코드
          const decoded = jwt.decode(storedToken);
          setUserName(decoded.username);
          setUserGender(decoded.gender);
          setUserBirth(decoded.birth_date);
          setUserPhone(decoded.phone_number);
        }
      }, []);
      const formattedDate = new Date(userBirth).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
  return(
    <div>
      <Header />
      <div className={style.MyPage}>
        <div className={style.MyPageBox}>
          <h1><span className={style.color}>My</span>Page</h1>
          <p>Name : {userName}</p>
          <p>Gender : {userGender}</p>
          <p>Birth : {formattedDate}</p>
          <p>Phont : {userPhone}</p>
          {userName === "admin" && (
            <Link href="/admin"><button className={style.AdminBtn}>ADMIN PAGE</button></Link>
          )}

        </div>
      </div>
      <Footer />
    </div>
  )
}

export default myPage;
