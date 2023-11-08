import React, { useState, useEffect } from "react";
import style from "./AdminNotices.module.css";

const AdminNotices = () => {
  const [notices, setNotices] = useState([]);

  const [newNotice, setNewNotice] = useState({
    title: "",
    content: ""
  });
 // AdminNotices 컴포넌트 내부에 추가
const handleDeleteNotice = async (noticeId) => {
    if (window.confirm('해당 공지사항을 삭제하시겠습니까?')) {
      try {
        // POST 메소드와 함께 공지사항의 ID를 바디에 담아 전송
        const res = await fetch(`http://localhost:3000/api/deleteNotice`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: noticeId }),
        });
  
        if (!res.ok) throw new Error('공지사항 삭제 실패');
        // UI 업데이트
        setNotices(notices.filter(notice => notice.id !== noticeId));
        alert('공지사항이 삭제되었습니다.');
      } catch (error) {
        console.error('공지사항 삭제 중 에러 발생:', error);
        alert(error.message);
      }
    }
  };
  
    // 인풋 변경 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewNotice({ ...newNotice, [name]: value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await fetch('http://localhost:3000/api/addNotice', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newNotice),
          });
    
          if (!res.ok) throw new Error('공지사항 추가 실패');
          const addedNotice = await res.json();
          setNotices([...notices, addedNotice]);
          setNewNotice({ title: "", content: "" }); // 폼 초기화
        } catch (error) {
          console.error('공지사항 추가 중 에러 발생:', error);
        }
      };

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/notice');
        const data = await res.json();
        setNotices(data.notices);
      } catch (error) {
        console.error('Failed to fetch notices:', error);
      }
    };

    fetchNotices();
  }, []);

  return (
    <div className={style.AdminNotices}>
      <h1>공지사항 관리</h1>
      <table className={style.NoticeTable}>
        <thead>
          <tr>
            <th>제목</th>
            <th>내용</th>
            <th>날짜</th>
            {/* 관리자 기능인 경우, 삭제 버튼 추가 */}
            <th>작업</th>
          </tr>
        </thead>
        <tbody>
          {notices.map(notice => (
            <tr key={notice.id}>
              <td className={style.title}><span>{notice.title}</span></td>
              <td>{notice.content}</td>
              <td>{new Date(notice.created_at).toLocaleDateString()}</td>
              <td className={style.X}>
                {/* 삭제 버튼 - 실제 기능 구현 필요 */}
                <span className={style.X} onClick={() => handleDeleteNotice(notice.id)}>X</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleSubmit}>
        <div className={style.InputBox}>
            <input
            type="text"
            name="title"
            value={newNotice.title}
            onChange={handleChange}
            placeholder="제목을 입력하세요"
            required
            />
        </div>
        <div className={style.InputBox}>

            <textarea
            name="content"
            value={newNotice.content}
            onChange={handleChange}
            placeholder="내용을 입력하세요"
            required
            />

            <button type="submit">공지사항 추가</button>
        </div>

      </form>

    </div>
  );
};

export default AdminNotices;
