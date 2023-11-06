import React, { useState } from "react";
import Header from "@/component/Header/Header";
import Footer from "@/component/Footer/Footer";
import style from "./SignUp.module.css";
import { useRouter } from 'next/router'; // 라우팅을 위한 훅 추가

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    phone_number: "", // 초기 상태 필드명 수정
    gender: "남성", // 'male' 대신 '남성' 사용
    birth_date: "", // 초기 상태 필드명 수정
  });
  
  const router = useRouter(); // 라우터 인스턴스 사용

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 서버로 데이터 전송
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          name: formData.name,
          phone_number: formData.phone_number, // 필드명 수정: 'phone' -> 'phone_number'
          gender: formData.gender,
          birth_date: formData.birth_date // 필드명 수정: 'birthdate' -> 'birth_date'
        }),
      });

      if (res.status === 201) {
        // 회원가입 성공 처리, 예: 로그인 페이지로 이동
        router.push('/login');
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error('회원가입 중 에러 발생:', error);
      // 사용자에게 에러 메시지 표시
      alert('회원가입에 실패하였습니다.');
    }
  };

  return (
    <div>
      <Header></Header>
      <div className={style.SignUpPage}>
        <h1>
          B.dot <span className={style.Color}>Sign Up</span>
        </h1>
        <form className={style.SignUpBox} onSubmit={handleSubmit}>
          <div className={style.Line}>
            <label htmlFor="username">아이디</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>
          <div className={style.Line}>
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className={style.Line}>
            <label htmlFor="name">이름</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className={style.Line}>
            <label htmlFor="name">전화번호</label>
            <input
              type="number"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
            />
          </div>
          <div className={style.Line}>
            <label>성별</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
            >
              <option value="남성">남성</option>
              <option value="여성">여성</option>
            </select>
          </div>
          <div className={style.Line}>
            <label htmlFor="birth_date">생년월일</label>
            <input
              type="date"
              id="birth_date"
              name="birth_date"
              value={formData.birth_date}
              onChange={handleInputChange}
            />
          </div>
          <button className={style.SignUpBtn} type="submit">가입하기</button>
        </form>
      </div>
      <div className={style.footerbox}> 
      <Footer></Footer>
      </div>
    </div>
  );
};

export default SignUpPage;
