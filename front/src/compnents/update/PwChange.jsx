import React, { useContext, useRef, useState } from 'react';
import api from '../../config/api.config';
import './userChange.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const PwChange = ({user}) => {

  const {logout} = useContext(UserContext);

  const nav = useNavigate();

  const currentPwdRef = useRef();
  const newPwdRef = useRef();
  const confirmPwdRef = useRef();

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // 특수문자 정규식
  const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[\W_])[a-z\d\W_]{8,}$/i;
  const currentPwd = currentPwdRef.current;
  const newPwd = newPwdRef.current;
  const confirmPwd = confirmPwdRef.current;

  const handleChangePassword = () => {

    const currentPwdVal = currentPwd.value;
    const newPwdVal = newPwd.value;
    const confirmPwdVal = confirmPwd.value;

    // 입력 검증
    if (!currentPwdVal || !newPwdVal || !confirmPwdVal) {
      setErrorMessage("모든 필드를 입력해주세요.");
      return;
    }

    console.log(user.user_num);

    // 서버에 비밀번호 변경 요청
    api
      .put('/user/change-password', {
        userNum: user.user_num,
        currentPwd: currentPwdVal,
        newPwd: newPwdVal,
      })
      .then((res) => {
        if (res.data.success) {
          setSuccessMessage("비밀번호가 성공적으로 변경되었습니다!");
          setErrorMessage('');
          currentPwdRef.current.value = '';
          newPwdRef.current.value = '';
          confirmPwdRef.current.value = '';
          alert("비밀번호가 성공적으로 변경되었습니다!");
          logout();
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
          placeholder="현재 비밀번호를 입력해주세요"
          ref={currentPwdRef}
          className="pwchange-input"
        />
      </div>
      <div className="pwchange-input-group">
        <label>새 비밀번호</label>
        <input
          type="password"
          placeholder="영문자,숫자, 특수기호를 포함한 비밀번호를 적어주세요"
          ref={newPwdRef}
          className="pwchange-input"
          onChange={e => {
            console.log(passwordRegex.test(e.target.value))
            if (!passwordRegex.test(e.target.value)) {
              setErrorMessage("비밀번호의 조건에 맞지 않습니다.");
            } else {
              setErrorMessage(null);
              setSuccessMessage("비밀번호 조건에 맞습니다!");
            }
          }}
        />
      </div>
      <div className="pwchange-input-group">
        <label>새 비밀번호 확인</label>
        <input
          type="password"
          placeholder="새 비밀번호 확인"
          ref={confirmPwdRef}
          className="pwchange-input"
          onChange={e => {
            if (newPwd.value !== e.target.value) {
              setErrorMessage("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
            } else {
              setErrorMessage(null);
              setSuccessMessage("비밀번호가 일치합니다!");
            }
          }}
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