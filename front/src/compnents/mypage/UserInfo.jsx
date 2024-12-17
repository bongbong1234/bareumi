import React from 'react'
import { useNavigate } from 'react-router-dom';

const UserInfo = ({sessionUser}) => {

    const nav = useNavigate();
    // 날짜 형식 변경
    const isoDate = sessionUser.signup_date;
    const date = new Date(isoDate);

    const formattedDate = date.toISOString().split("T")[0];

    const toPwChk = (path) => {
        if (path == 'update') {
          nav(`/pw-chk/${path}`);
        }else if(path == 'pwchange'){
          nav(`/pw-chk/${path}`);
        }else if(path == 'memberout'){
          nav(`/pw-chk/${path}`);
        }
      }
    

  return (
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
  )
}

export default UserInfo