import React, { useState } from "react";
import "./mypage.css";

function MyPage() {
  const [vibLevel, setVibLevel] = useState(1);
  const [activeTab, setActiveTab] = useState("alertSettings");

  // 설정 변경 버튼

  const SettingChange = () => {
    console.log("설정변경 클릭!")
  }

  const increaseVib = () => {
    if (vibLevel < 3) {
      setVibLevel(vibLevel + 1);
    }
  };

  const decreaseVib = () => {
    if (vibLevel > 1) {
      setVibLevel(vibLevel - 1);
    }
  }

  const sessionUser = JSON.parse(sessionStorage.getItem("sessionUser"));

  // 날짜 형식 변경
  const isoDate = sessionUser.signup_date;
  const date = new Date(isoDate);

  const formattedDate = date.toISOString().split("T")[0];

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
            <div className="vibration-control">
              <h4>진동 세기 변경</h4>
              <div className="vibration-bar-wrapper">
                <div
                  className="vibration-bar-fill"
                  style={{ width: `${(vibLevel / 3) * 100}%` }}
                ></div>
              </div>
              <div className="button-container">
                <button className="vibration-button" onClick={increaseVib}>
                  +
                </button>
                <button className="vibration-button" onClick={decreaseVib}>
                  -
                </button>
              </div>
            </div>

            {/* 알림 강화 */}
            <h4>알림 강화</h4>
            <div className="alert-box">
              <div className="sub-box1">
                <p>평균 알람 시간 <span>00 : 00 ~ 00 : 00</span></p>
              </div>
              <h5>알림 강화</h5>
              <div className="alert-enhancement">
                <div className="alert-content">
                  <div className="alert-time">
                    <label>알림 강화 시간</label>
                    <p>00:00 ~ 00:00</p>
                  </div>
                  <div className="alert-vibration-wrapper">
                    <div className="alert-vibration">
                      <label>진동 세기</label>
                      <p>n</p>
                    </div>
                    <div className="settings-change" onClick={SettingChange}>
                      설정변경
                    </div>
                  </div>
                </div>
              </div>
              <h5>최소 시간</h5>
              <div className="sub-box3">
                <div className="mini-box">
                  <p>비정상 자세 체크 시간 : n분</p>
                  <p>최소 착용 시간 : n시간</p>
                  <p>최소 알림 횟수 : n</p>
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
            <div className="userinfo">
              {/* 프로필 섹션 */}
              <div className="profile-img">
                <div className="circle"></div>
              </div>
              <div className="profile-details">
                <h3>{sessionUser.user_name}</h3>
                <p>가입일 : {formattedDate}</p>
              </div>
            </div>

            {/* 사용자 설정 섹션 */}
            <div className="user-settings">
              <h4>사용자 설정</h4>
              <div className="settings-item" onClick={() => console.log("정보 수정 클릭됨!")}>
                <span>정보 수정</span>
                <span className="arrow">&gt;</span>
              </div>
              <div className="settings-item" onClick={() => console.log("비밀번호 변경 클릭!")}>
                <span>비밀번호 변경</span>
                <span className="arrow">&gt;</span>
              </div>
              <div className="settings-item" onClick={() => console.log("기록 초기화 클릭!")}>
                <span>기록 초기화</span>
                <span className="arrow">&gt;</span>
              </div>
              <div className="settings-item" onClick={() => console.log("회원 탈퇴 클릭!")}>
                <span>회원탈퇴</span>
                <span className="arrow">&gt;</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
};

export default MyPage;
