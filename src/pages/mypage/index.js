import React, { useEffect ,useState } from "react";
import style from "./myPage.module.css";
import Header from "@/component/Header/Header";
import Footer from "@/component/Footer/Footer";
import jwt from "jsonwebtoken"; 
import Link from "next/link";
// ...


const myPage = () => {
    const [userID, setUserID] = useState("");

    const [userName, setUserName] = useState("");
    const [userGender, setUserGender] = useState("");
    const [userBirth, setUserBirth] = useState("");
    const [userPhone, setUserPhone] = useState("");
    function formatPhoneNumber(phoneNumber) {
      // 전화번호 형식을 확인하고 하이픈을 삽입하는 정규식
      const cleaned = ('' + phoneNumber).replace(/\D/g, '');
      const match = cleaned.match(/^(\d{3})(\d{3,4})(\d{4})$/);
      if (match) {
        return `${match[1]}-${match[2]}-${match[3]}`;
      }
      return null;
    }
    
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        
        if (storedToken) {
          // 토큰 디코드
          const decoded = jwt.decode(storedToken);
          setUserName(decoded.name);
          setUserGender(decoded.gender);
          setUserBirth(decoded.birth_date);
          setUserID(decoded.username)
          setUserPhone(formatPhoneNumber(decoded.phone_number));
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
          <p>Phone : {userPhone}</p>
          {userID === "admin" && (
            <Link href="/admin"><button className={style.AdminBtn}>ADMIN PAGE</button></Link>
          )}

        </div>
      </div>
      <Footer />
    </div>
  )
}

export default myPage;
