import React, { useRef, useState } from 'react';
import api from '../../config/api.config';
import './userChange.css';
import { useNavigate, useParams } from 'react-router-dom';
import PwChange from './PwChange';
import MemberOut from './MemberOut';
import Update from './UpDate';

const UserChange = () => {
  const {path} = useParams();
  console.log(path);

  const nav = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("sessionUser"));
  const [chkPwd, setChkPwd] = useState(false); // 비밀번호 확인 상태

  const pwdRef = useRef();

  const toMypage = () => {
    nav("../my-page")
  }

  const onKeyDownPwChk = (e) => {
    if(e.key === "Enter") {
      sendPwd()
    }
  }

  const sendPwd = () => {
    const inputPwd = pwdRef.current.value;
    if (inputPwd === '') {
      alert("비밀번호를 입력해주세요!");
    } else {
      api
        .post('/user/pwd-chk', {
          id: user.user_id,
          pwd: inputPwd,
        })
        .then((res) => {
          if (res.data.message) {
            alert("비밀번호가 확인 되었습니다!");
            setChkPwd(true);
            pwdRef.current.value = '';
          }
        })
        .catch((err) => {
          console.error(err);
          alert("비밀번호를 확인해주세요");
          pwdRef.current.value = '';
        });
    }
  };


  return (
    <div className="pwchk-wrapper">
      {chkPwd ? <>
        { path === 'update' && <Update user={user} />}

        {
            path === 'pwchange' && <PwChange user={user}/>
        }
        {
            path === 'memberout' && <MemberOut user={user}/>
        }
        <button className='to-mypage' onClick={toMypage}>돌아가기</button>
      </>
        : (
        <>
          <div className="pwchk-container">비밀번호를 확인해주세요.</div>
          <input
            type="password"
            ref={pwdRef}
            placeholder="비밀번호를 입력하세요"
            className="pwchk-input"
            onKeyDown={e => onKeyDownPwChk(e)}
          />
          <button onClick={sendPwd} className="pwchk-button">
            확인
          </button>
        </>
      )}
    </div>
  );
};

export default UserChange;
