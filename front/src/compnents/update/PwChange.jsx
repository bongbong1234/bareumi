import React, { useRef, useState } from 'react';
import api from '../../config/api.config';
import './pwchange.css';

const PwChange = ({user}) => {
  const currentPwdRef = useRef();
  const newPwdRef = useRef();
  const confirmPwdRef = useRef();

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // 특수문자 정규식
  const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[\W_])[a-z\d\W_]{8,}$/i;

  const handleChangePassword = () => {
    const currentPwd = currentPwdRef.current.value;
    const newPwd = newPwdRef.current.value;
    const confirmPwd = confirmPwdRef.current.value;

    // 입력 검증
    if (!currentPwd || !newPwd || !confirmPwd) {
      setErrorMessage("모든 필드를 입력해주세요.");
      return;
    }
    if (newPwd !== confirmPwd) {
      setErrorMessage("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }
    if (!passwordRegex.test(newPwd)) {
      setErrorMessage("비밀번호의 조건에 맞지 않습니다.");
      return;
    }

    // 서버에 비밀번호 변경 요청
    api
      .post('/user/change-password', {
        id: user.user_id,
        currentPwd: currentPwd,
        newPwd: newPwd,
      })
      .then((res) => {
        if (res.data.success) {
          setSuccessMessage("비밀번호가 성공적으로 변경되었습니다!");
          setErrorMessage('');
          currentPwdRef.current.value = '';
          newPwdRef.current.value = '';
          confirmPwdRef.current.value = '';
        } else {
          setErrorMessage(res.data.message || "비밀번호 변경에 실패했습니다.");
          setSuccessMessage('');
        }
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage("서버 오류가 발생했습니다. 다시 시도해주세요.");
        setSuccessMessage('');
      });
  };

  return (
    <div className="pwchange-container">
      <h3>비밀번호 변경</h3>
      <div className="pwchange-input-group">
        <label>현재 비밀번호</label>
        <input
          type="password"
          placeholder="현재 비밀번호 입력"
          ref={currentPwdRef}
          className="pwchange-input"
        />
      </div>
      <div className="pwchange-input-group">
        <label>새 비밀번호</label>
        <input
          type="password"
          placeholder="새 비밀번호 입력"
          ref={newPwdRef}
          className="pwchange-input"
        />
      </div>
      <div className="pwchange-input-group">
        <label>새 비밀번호 확인</label>
        <input
          type="password"
          placeholder="새 비밀번호 확인"
          ref={confirmPwdRef}
          className="pwchange-input"
        />
      </div>
      {errorMessage && <div className="pwchange-error">{errorMessage}</div>}
      {successMessage && <div className="pwchange-success">{successMessage}</div>}
      <button onClick={handleChangePassword} className="pwchange-button">
        비밀번호 변경하기
      </button>
    </div>
  );
};

export default PwChange;