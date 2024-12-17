import React, { useState } from 'react'

const Setting = ({setModalOn,setName}) => {
      const [vibLevel, setVibLevel] = useState(1);

    const settingChange = (name) => {
        if (name == "enhanced") {
            setModalOn(true);
            setName("enhanced");
            console.log("알림강화 변경")
        } else if (name == "min") {
            setModalOn(true);
            setName("min");
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

  return (
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
        <p>평균 알람 시간 <span>16 : 00 ~ 17 : 00</span></p>
      </div>
      <h5>알림 강화</h5>
      <div className="alert-enhancement">
        <div className="alert-content">
          <div className="alert-time">
            <label>알림 강화 시간</label>
            <p>16:00 ~ 17:00</p>
          </div>
          <div className="alert-vibration-wrapper">
            <div className="alert-vibration">
              <label>진동 세기</label>
              <p>3</p>
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
              <span>1분</span></p>
          </div>
          <div className="row">
            <div className="wear-time">
              <p>최소 착용 시간 :
                <span>8시간</span></p>
            </div>
            <div className="alert-count">
              <p>최소 알림 횟수 :
                <span>5회</span></p>
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
  )
}

export default Setting