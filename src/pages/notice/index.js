// pages/notice.js
import React from "react";
import style from "./notice.module.css";
import Header from "@/component/Header/Header";
import Footer from "@/component/Footer/Footer";

export async function getServerSideProps(context) {
  let notices = [];
  try {
    // API 라우트를 호출하여 공지사항 데이터를 가져옵니다.
    const res = await fetch('http://localhost:3000/api/notice');
    const data = await res.json();
    notices = data.notices;
  } catch (error) {
    console.error('Failed to fetch notices:', error);
  }
  
  return {
    props: { notices },
  };
}

const NoticePage = ({ notices }) => {
  return(
    <div>
      <Header />
      <div className={style.NoticePage}>
        <div className={style.Notice}>
          <h1>공지사항</h1>
          <table className={style.NoticeTable}>
            <thead>
              <tr>
                <th>제목</th>
                <th>내용</th>
                <th>날짜</th>
              </tr>
            </thead>
            <tbody>
              {notices.map(notice => (
                <tr key={notice.id}>
                  <td>{notice.title}</td>
                  <td>{notice.content}</td>
                  <td>{new Date(notice.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default NoticePage;
