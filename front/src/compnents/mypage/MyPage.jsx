import React, { useState } from "react";
import "./mypage.css";

function MyPage() {
  const [activeTab, setActiveTab] = useState("alertSettings");


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
        {activeTab === "alertSettings" && (
          <div>
            {/* 진동 세기 변경 */}
            <h4>진동 세기 변경</h4>
            <div className="vib-box">
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
            <div className="alert-box">
              <div className="sub-box1">
                <p>평균 알람 시간 <span>00 : 00 ~ 00 : 00</span></p>
              </div>
              <h5>알림 강화</h5>
              <div className="sub-box2">
                <div className="row">
                  <div className="col">
                    <label>알림 강화 시간</label>
                    <p>00:00 ~ 00:00</p>
                  </div>
                  <div className="col">
                    <label>진동 세기</label>
                    <p>n</p>
                  </div>
                </div>
                <button className="btn">설정 변경</button>

              </div>
              <h5>최소 시간</h5>
              <div className="sub-box3">
                <div className="mini-box">
                  <p>바탕값 최소 세기 시간: n분</p>
                  <p>최소 적용 시간: n시간</p>
                  <p>최소 알림량: n</p>
                </div>
              </div>
              <button className="btn">초기화</button>
            </div>

            {/* 알림 일시정지 */}
            <h4>알림 일시정지</h4>
            <div className="pause-box">
              <div className="pause-subox">
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
