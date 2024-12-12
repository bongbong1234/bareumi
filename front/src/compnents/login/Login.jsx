import React, { useContext, useRef } from 'react'
import axios from 'axios';
import api from '../../config/api.config';
import { useNavigate } from 'react-router-dom';
import './Login.css'
import { UserContext } from '../../context/UserContext';

const Login = () => {

    const {setNewId, setValidateEmail} = useContext(UserContext);

    const nav = useNavigate();

    const idRef = useRef();
    const pwRef = useRef();

  const navigate = useNavigate();

    const handleKeyLogin = (e) => {
      if (e.key === "Enter") {
        login();
      }
    }

    const login = () => {
      let idVal = idRef.current.value;
      let pwVal = pwRef.current.value;
      if(idVal && pwVal) {
        api.post('./user/login',{
          id: idVal,
          pwd: pwVal
        }).then(res => {
          if(res.status === 201) {
            console.log(res.data.item)
            if(res.data.item.email_validate === 1) {
                navigate('../')
            } 
          }
        }).catch(err => {
          console.error(err.response.data.item)
          let errRes = err.response
          if(err.status === 401) {
            idRef.current.value = '';
            pwRef.current.value = '';

            alert("ID 혹은 비밀번호를 확인해주세요!");
            
            idRef.current.focus();
          } else if (err.status === 402) {
            alert("이메일을 인증해주세요!");
            setNewId(errRes.data.item.user_id);
            setValidateEmail(errRes.data.item.user_email);
            nav('../signup/validate-email');
          }
        })
      } else if (!idVal) {
        alert("아이디를 입력해주세요!");
  const login = () => {
    let idVal = idRef.current.value;
    let pwVal = pwRef.current.value;
    if (idVal && pwVal) {
      api.post('./user/login', {
        id: idVal,
        pwd: pwVal
      }).then(res => {
        if (res.status === 201) {
          setLogin(true);
          console.log(res.data.item);
          navigate('../')
        }
      }).catch(err => {
        console.error(err)
        idRef.current.value = '';
        pwRef.current.value = '';

        alert("ID 혹은 비밀번호를 확인해주세요!");

        idRef.current.focus();
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
    navigate("../signup")
  }

  return (
    <div className="login-container">
      <h1 className="login-title">로그인</h1>
      <p className="login-subtitle">서비스를 이용하시려면 로그인하세요!</p>

      <div className="login-field">
        <label>아이디</label>
        <input type="text" placeholder="아이디를 입력해주세요" ref={idRef} />
      </div>
      <div className="login-field">
        <label>비밀번호</label>
        <input type="password" placeholder="비밀번호를 입력해주세요" ref={pwRef} />
      </div>
      <button className="btn-login" onClick={login}>로그인</button>
      <button className="btn-signup" onClick={toSignUp}>회원가입</button>
    </div>
  )
}

export default Login