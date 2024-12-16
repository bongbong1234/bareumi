import React, { useState } from "react";
import "./mypage.css";
import { useNavigate } from "react-router-dom";

function MyPage() {
  const [vibLevel, setVibLevel] = useState(1);
  const [activeTab, setActiveTab] = useState("alertSettings");

  // 설정 변경 버튼

  const nav = useNavigate();

  const settingChange = (name) => {
    if (name == "enhanced") {
      console.log("알림강화 설정변경!")
    } else if (name == "min") {
      console.log("최소시간 설정변경!")
    } else if (name == "reset") {
      console.log("초기화 클릭!")
    } else {
      console.log("일시정지 설정!!")
    }
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

  const toPwChk = (path) => {
    if (path == 'update') {
      nav(`/pw-chk/${path}`);
    }else if(path == 'pwchange'){
      nav(`/pw-chk/${path}`);
    }else if(path == 'memberout'){
      nav(`/pw-chk/${path}`);
    }
  }

  const sessionUser = JSON.parse(sessionStorage.getItem("sessionUser"));

  // 날짜 형식 변경
  const isoDate = sessionUser.signup_date;
  const date = new Date(isoDate);

  const formattedDate = date.toISOString().split("T")[0];

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
              <div className="alert-avg">
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
                    <div className="alert-setting" onClick={() => settingChange("enhanced")}>
                      설정변경
                    </div>
                  </div>
                </div>
              </div>
              <h5>최소 시간</h5>
              <div className="mini-box">
                <div className="mini-time">
                  <div className="check-time">
                    <p>비정상 자세 체크 시간 :
                      <span>n분</span></p>
                  </div>
                  <div className="row">
                    <div className="wear-time">
                      <p>최소 착용 시간 :
                        <span>n시간</span></p>
                    </div>
                    <div className="alert-count">
                      <p>최소 알림 횟수 :
                        <span>n</span></p>
                    </div>
                  </div>
                </div>
                <div className="min-setting" onClick={() => settingChange("min")}>설정변경</div>
              </div>
              <div className="reset-button" onClick={() => settingChange("reset")}>초기화</div>
            </div>

            {/* 알림 일시정지 */}
            <h4>알림 일시정지</h4>
            <div className="pause-box">
              <h3>일시 정지 시간</h3>
              <div className="pause-time">
                <span>00 : 00 ~ 00: 00</span>
              </div>
              <div className="pause-setting" onClick={() => settingChange("pause")}>설정변경</div>
            </div>
          </div>
        )}

        {activeTab === "userInfo" && (
          <div>
            <div className="userinfo">
              {/* 프로필 섹션 */}
              <div className="profile-img">
                {sessionUser.profile_img ? (
                  <img
                    src={sessionUser.profile_img}
                    alt="프로필 이미지"
                    className="profile-img-content"
                  />
                ) : (
                  <div className="profile-img-placeholder"></div> // 이미지가 없을 때
                )}
              </div>
              <div className="profile-details">
                <h3>{sessionUser.user_name}</h3>
                <p>가입일 : {formattedDate}</p>
              </div>
            </div>

            {/* 사용자 설정 섹션 */}
            <div className="user-settings">
              <h4>사용자 설정</h4>
              <div className="settings-item" onClick={() => toPwChk('update')}>
                <span>정보 수정</span>
                <span className="arrow">&gt;</span>
              </div>
              <div className="settings-item" onClick={() => toPwChk('pwchange')}>
                <span>비밀번호 변경</span>
                <span className="arrow">&gt;</span>
              </div>
              <div className="settings-item" onClick={() => console.log("기록초기화 클릭!")}>
                <span>기록 초기화</span>
                <span className="arrow">&gt;</span>
              </div>
              <div className="settings-item" onClick={() => toPwChk("memberout")}>
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
