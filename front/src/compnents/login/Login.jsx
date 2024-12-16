import React, { useContext, useRef } from 'react'
import axios from 'axios';
import api from '../../config/api.config';
import { useNavigate } from 'react-router-dom';
import './login.css'
import { UserContext } from '../../context/UserContext';

const Login = ({setLogin}) => {

    const {setNewId, setValidateEmail} = useContext(UserContext);

    const nav = useNavigate();

    const idRef = useRef();
    const pwRef = useRef();

    const handleKeyLogin = (e) => {
      if (e.key === "Enter") {
        console.log("누름")
        login();
      }
    }

  const login = () => {
    console.log("로그인 누름");
    let idVal = idRef.current.value;
    let pwVal = pwRef.current.value;
    if (idVal && pwVal) {
      api.post('./user/login', {
        id: idVal,
        pwd: pwVal
      }).then(res => {
        if (res.status === 201) {
          setLogin(true);
          sessionStorage.setItem("sessionUser",JSON.stringify(res.data.item));
          sessionStorage.setItem("currentPath","home");
          nav('../')
        }
      }).catch(err => {
        console.error(err)


        if(err.status === 401) {
          alert("아이디 혹은 비밀번호를 확인해주세요");
          idRef.current.value = '';
          pwRef.current.value = '';
        } else if (err.status === 402) {
          const errResponsData = err.response.data;
          alert("이메일을 인증해주세요!");
          setNewId(errResponsData.item.user_id);
          setValidateEmail(errResponsData.item.user_email);
          nav("../signup/validate-email");
        }
        
      })
    } else if (!idVal) {
      alert("아이디를 입력해주세요!");
      idRef.current.focus();
    } else if (idVal && !pwVal) {
      alert("비밀번호를 입력해주세요!");
      pwRef.current.focus();
    }
  }

  const toSignUp = () => {
    nav("../signup")
  }

  return (
    <div className="login-container">
      <h1 className="login-title">로그인</h1>
      <p className="login-subtitle">서비스를 이용하시려면 로그인하세요!</p>

      <div className="login-field">
        <label>아이디</label>
        <input type="text" placeholder="아이디를 입력해주세요" ref={idRef} onKeyDown={e => handleKeyLogin(e)}/>
      </div>
      <div className="login-field">
        <label>비밀번호</label>
        <input type="password" placeholder="비밀번호를 입력해주세요" ref={pwRef}  onKeyDown={e => handleKeyLogin(e)}/>
      </div>
      <button className="btn-login" onClick={login}>로그인</button>
      <button className="btn-signup" onClick={toSignUp}>회원가입</button>
    </div>
  )
}

export default Login