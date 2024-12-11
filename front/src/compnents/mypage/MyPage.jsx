import React, { useState } from "react";
import "./mypage.css";

function MyPage() {
  const [activeTab, setActiveTab] = useState("alertSettings");


  return (
    <div className="mypage-container">
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
        {activeTab === "alertSettings" && (
          <div>
            {/* 진동 세기 변경 */}
            <h4>진동 세기 변경</h4>
            <div className="box">
              <div className="vibration-control">
                <input type="range" min="1" max="10" className="slider" />
                <div className="buttons">
                  <button className="btn">+</button>
                  <button className="btn">-</button>
                </div>
              </div>
            </div>

            {/* 알림 강화 */}
            <h4>알림 강화</h4>
            <div className="box">
              <div className="sub-box1">
                <p>평균 알람 시간 <span>00 : 00 ~ 00 : 00</span></p>
              </div>
              <h5>알림 강화</h5>
              <div className="sub-box">
                <div className="row">
                  <label>알림 알림 시간</label>
                  <input type="time" />
                  <label>진동 세기</label>
                  <input type="number" />
                  <button className="btn">설정 변경</button>
                </div>
              </div>
              <div className="sub-box">
                <h3>최소 시간</h3>
                <p>바탕값 최소 세기 시간: n분</p>
                <p>최소 적용 시간: n시간</p>
                <p>최소 알림량: n</p>
                <button className="btn">추가</button>
              </div>
            </div>

            {/* 알림 일시정지 */}
            <h4>알림 일시정지</h4>
            <div className="box">
              <div className="sub-box">
                <h3>일시 정지 시간</h3>
                <p>00:00 ~ 00:00</p>
                <button className="btn">설정 변경</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "userInfo" && (
          <div>
            <h2>회원 정보</h2>
            <p>회원 정보 내용을 여기에 작성하세요.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyPage;
