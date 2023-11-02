import React, { useState } from "react";
import Header from "@/component/Header/Header";
import Footer from "@/component/Footer/Footer";
import style from "./SignUp.module.css";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    gender: "male", // 초기 값 설정
    birthdate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에서 폼 데이터를 서버로 전송하거나 다른 작업을 수행하세요.
    console.log(formData);
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
              id="phone"
              name="phone"
              value={formData.phone}
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
              <option value="male">남성</option>
              <option value="female">여성</option>
            </select>
          </div>
          <div className={style.Line}>
            <label htmlFor="birthdate">생년월일</label>
            <input
              type="date"
              id="birthdate"
              name="birthdate"
              value={formData.birthdate}
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
