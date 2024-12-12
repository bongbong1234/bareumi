import React, { useEffect, useRef, useState } from 'react';
import api from '../../config/api.config';
import './Signup.css';

const Signup = () => {
  const idRef = useRef('');
  const pwRef = useRef('');
  const nameRef = useRef('');
  const pwChkRef = useRef('');
  const emailIdRef = useRef('');
  const emaillAddressRef = useRef('');

  const [idDuplicate, setIdDuplicate] = useState(false);
  const [pwValidate, setPwValidate] = useState(false);
  const [pwCurrect, setPwCurrect] = useState();
  const [emailChk, setEmailChk] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    let email = emailIdRef.current.value + '@' + emaillAddressRef.current.value;

    if (emailChk) {
      setEmail(email);
    } else {
      setEmail(null);
    }
  }, [emailChk]);

  const duplicate = () => {
    const idVal = idRef.current.value;
    api
      .post('/user/duplicate', {
        id: idVal,
      })
      .then((res) => {
        if (res.data.message) {
          alert('사용가능한 아이디입니다!');
          setIdDuplicate(true);
          pwRef.current.focus();
        }
      })
      .catch((err) => {
        console.error(err);
        alert('중복된 아이디 입니다. 아이디를 다시 입력해주세요!');
        setIdDuplicate(false);
        idRef.current.value = '';
        idRef.current.focus();
      });
  };

  const signUp = () => {
    const idVal = idRef.current.value;
    const pwVal = pwRef.current.value;
    const nameVal = nameRef.current.value;

    if (idVal === '') {
      alert('아이디를 입력하세요');
      idRef.current.focus();
    } else if (!idDuplicate) {
      alert('아이디 중복을 해주세요');
      idRef.current.focus();
    } else if (pwVal === '') {
      alert('비밀번호를 입력하세요');
      pwRef.current.focus();
    } else if (!pwCurrect) {
      alert('비밀번호가 일치하지 않습니다!');
      pwChkRef.current.focus();
    } else if (nameVal === '') {
      alert('이름을 입력해 주세요!');
      nameRef.current.focus();
    } else if (email === null) {
      alert('이메일을 입력해주세요');
      emailIdRef.current.focus();
    } else {
      api.post('/user/sign-up', {
        id: idVal,
        pwd: pwVal,
        name: nameVal,
        email: email,
      });
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">회원가입</h1>
      <p className="signup-subtitle">회원이 되어 다양한 혜택을 경험해 보세요!</p>

      <div className="signup-field">
        <label>아이디</label>
        <input type="text" ref={idRef} placeholder="아이디를 입력해주세요" />
        <button className="btn-check" onClick={duplicate}>중복확인</button>
      </div>

      <div className="signup-field">
        <label>비밀번호</label>
        <input
          type="password"
          ref={pwRef}
          placeholder="비밀번호를 입력해주세요"
          onChange={(e) => {
            const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[\W_])[a-z\d\W_]{8,}$/i;
            setPwValidate(passwordRegex.test(e.target.value));
          }}
        />
        {pwValidate ? (
          <span className="valid-text">비밀번호가 조건에 맞습니다!</span>
        ) : (
          <span className="invalid-text">비밀번호가 조건에 맞지 않습니다!</span>
        )}
      </div>

      <div className="signup-field">
        <label>비밀번호 확인</label>
        <input
          type="password"
          ref={pwChkRef}
          placeholder="비밀번호를 다시 입력해주세요"
          onChange={(e) => {
            setPwCurrect(pwRef.current.value === e.target.value);
          }}
        />
        {pwCurrect ? (
          <span className="valid-text">비밀번호가 일치합니다</span>
        ) : (
          <span className="invalid-text">비밀번호가 일치하지 않습니다</span>
        )}
      </div>

      <div className="signup-field">
        <label>이름</label>
        <input type="text" placeholder="이름을 입력해주세요" ref={nameRef} />
      </div>

      <div className="signup-field">
        <label>이메일</label>
        <input
          type="text"
          ref={emailIdRef}
          placeholder="이메일 아이디를 입력해주세요"
        />
        @
        <input
          type="text"
          ref={emaillAddressRef}
          placeholder="이메일 주소를 입력해주세요"
          onChange={(e) => {
            const tldRegex = /\.(com|net|kr)$/i;
            setEmailChk(tldRegex.test(e.target.value));
          }}
        />
      </div>

      <button className="btn-submit" onClick={signUp}>
        회원가입하기
      </button>
    </div>
  );
};

export default Signup;
