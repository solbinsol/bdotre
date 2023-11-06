import React, { useState } from "react";
import Header from "@/component/Header/Header";
import style from "./admin.module.css";
import AdminClothes from "../../component/AdminClothes/AdminClothes";

const AdminPage = () => {
  // 현재 선택된 탭을 추적하는 state
  const [activeTab, setActiveTab] = useState("");

  // 탭을 변경하는 함수
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div>
      <Header></Header>
      <div className={style.AdminPage}>
        <h1>ADMIN PAGE</h1>
        <div className={style.AdminNav}>
          <ul>
            <li onClick={() => handleTabChange("clothes")}>의류 추가/삭제</li>
            <li onClick={() => handleTabChange("notices")}>공지사항 작성/삭제</li>
          </ul>
        </div>
        {/* 탭에 따라 컴포넌트 렌더링 */}
        {activeTab === "clothes" && <AdminClothes />}
        {/* 여기에 다른 탭에 해당하는 컴포넌트를 추가할 수 있습니다 */}
      </div>
    </div>
  );
};

export default AdminPage;
