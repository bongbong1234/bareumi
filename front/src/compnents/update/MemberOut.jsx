import React from 'react';
import api from '../../config/api.config';
import './memberout.css';

const MemberOut = () => {
  const user = JSON.parse(sessionStorage.getItem("sessionUser"));

  const handleMemberOut = () => {
    if (window.confirm("정말로 회원 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.")) {
      api
        .post('/user/delete-account', { id: user.user_id })
        .then((res) => {
          alert("회원탈퇴가 완료되었습니다. 이용해주셔서 감사합니다.");
          sessionStorage.clear(); // 세션 데이터 초기화
          window.location.href = "/"; // 홈 페이지로 이동
        })
        .catch((err) => {
          console.error(err);
          alert("회원탈퇴에 실패했습니다. 다시 시도해주세요.");
        });
    }
  };

  return (
    <div className="memberout-container">
      <h3 className="memberout-title">회원탈퇴</h3>
      <p className="memberout-warning">
        회원 탈퇴 시 모든 정보가 삭제되며, 복구가 불가능합니다. 신중히 결정해주세요.
      </p>
      <button onClick={handleMemberOut} className="memberout-button">
        회원탈퇴
      </button>
    </div>
  );
};

export default MemberOut;
