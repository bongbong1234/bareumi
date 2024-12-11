import React, { useRef } from 'react'
import axios from 'axios';
import api from '../../config/api.config';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const idRef = useRef();
    const pwRef = useRef();

    const navigate = useNavigate();

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
    <div>
        <div>
            <label>id</label>
            <input type='text' placeholder='아이디를 입력해주세요' ref={idRef}/>
        </div>
        <div>
            <label>password</label>
            <input type='password' placeholder='비밀번호를 입력해주세요' ref={pwRef}/>
        </div>
        <div>
          <button onClick={login}>로그인</button>
          <button onClick={toSignUp}>회원가입</button>
        </div>
    </div>
  )
}

export default Login