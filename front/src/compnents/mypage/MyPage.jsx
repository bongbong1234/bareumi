import React, { useState } from "react";
import "./mypage.css";
import { useNavigate } from "react-router-dom";
import UserInfo from "./UserInfo";
import Setting from "./Setting";
import Modalbase from "../Modal/Modalbase";

function MyPage() {
  const [activeTab, setActiveTab] = useState("alertSettings");
  const [modalOn, setModalOn] = useState(false);
  const [name,setName] = useState("");

  // 설정 변경 버튼
  const sessionUser = JSON.parse(sessionStorage.getItem("sessionUser"));

  return (
    <div className="container mypage-container">
      {/* 상단 탭 네비게이션 */}
      <div className="tabs">
        <button
          className={activeTab === "alertSettings" ? "active" : ""}
          onClick={() => setActiveTab("alertSettings")}
        >
          알림 설정
        </button>
        <button
          className={activeTab === "userInfo" ? "active" : ""}
          onClick={() => setActiveTab("userInfo")}
        >
          회원 정보
        </button>
      </div>

      {/* 탭 내용 */}
      <div className="tab-content">
        {activeTab === "alertSettings" && <Setting setModalOn={setModalOn} setName={setName} />}
        {activeTab === "userInfo" && <UserInfo sessionUser={sessionUser}/>}
      </div>
      {
        modalOn ? <Modalbase name={name} setModalOn={setModalOn} setName={setName} /> : ''
      }
    </div>
  )
};

export default MyPage;
