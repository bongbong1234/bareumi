import React, { useEffect, useRef, useState } from 'react'
import api from '../../config/api.config';

const Signup = () => {
  const idRef = useRef('');
  const pwRef = useRef('');
  const nameRef = useRef('');
  const pwChkRef = useRef('');
  const emailIdRef = useRef('');
  const emaillAddressRef = useRef('');
  
  const [idDuplicate,setIdDuplicate] = useState(false);
  const [pwValidate,setPwValidate] = useState(false);
  const [pwCurrect,setPwCurrect] = useState();
  const [emailChk, setEmailChk] = useState(false);
  const [email,setEmail] = useState(''); 

  useEffect(()=> {
    let email = emailIdRef.current.value + "@" + emaillAddressRef.current.value;
   
    if(emailChk) {
      setEmail(email);
    } else {
      setEmail(null);
    }
  },[emailChk])


  const duplicate = () => {
    const idVal = idRef.current.value;
    api.post("/user/duplicate",{
      id:idVal
    }).then(res => {
      if(res.data.message) {
        alert("중복이 아닙니다!")
        setIdDuplicate(true);
        pwRef.current.focus();
      }
    }).catch(err => {
      console.error(err);
      alert("중복입니다 아이디를 다시 입력해주세요!")
      setIdDuplicate(false);
      idRef.current.value = '';
      idRef.current.focus();
    })
  }

  const signUp = () => {
    const idVal = idRef.current.value;
    const pwVal = pwRef.current.value;
    const nameVal = nameRef.current.value;

    console.log(email)

    if(idVal === '') {
      alert("아이디를 입력하세요")
      idRef.current.focus();
    } else if (!idDuplicate) {
      alert("아이디 중복을 해주세요")
      idRef.current.focus();
    } else if(pwVal === '') {
      alert("비밀번호를 입력하세요")
      pwRef.current.focus();
    } else if (!pwCurrect) {
      alert("비밀번호가 일치하지 않습니다!")
      pwChkRef.current.focus();
    } else if (nameVal === '') {
      alert("이름을 입력해 주세요!")
      nameRef.current.focus();
    } else if (email === null) {
      alert("이메일을 입력해주세요")
      emailIdRef.current.focus();
    } else {
      api.post("/user/sign-up",{
        id: idVal,
        pwd: pwVal,
        name: nameVal,
        email: email
      }).then(res => {
        
      })
    }
    

  }


  return (
    <div>
      <div>
        <label>아이디</label>
        <input type='text' ref={idRef} placeholder='아이디를 입력해주세요'/>
        <button onClick={duplicate}>중복확인</button>
      </div>
      <div>
        <label>비밀번호</label>
        <div>
          <label>숫자, 영문자, 특수문자를 포함한 비밀번호를 만들어주세요</label>
        </div>
        <input type='password' ref={pwRef} placeholder='비밀번호를 입력해주세요' onChange={(e)=> {
          const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[\W_])[a-z\d\W_]{8,}$/i;
          if(passwordRegex.test(e.target.value)) {
            setPwValidate(true);
          } else {
            setPwValidate(false);
          }
        }}/>
      </div>
      {
        pwValidate ? <span>비밀번호가 조건에 맞습니다!</span> : <span>비밀번호가 조건에 맞지 않습니다!</span>
      }
      <div>
        <label>비밀번호 확인</label>
        <input type='password' ref={pwChkRef} onChange={e => {
          let pwVal = pwRef.current.value;
          if(pwVal === e.target.value) {
            setPwCurrect(true);
          } else {
            setPwCurrect(false);
          }
        }} placeholder='비밀번호를 다시 입력해주세요'/>
        {
          pwCurrect ? <div>비밀번호가 일치합니다</div> : <div>비밀번호가 일치하지 않습니다</div>
        }
      </div>
      <div>
        <label>이름</label>
        <input type='text' placeholder='이름을 입력해주세요' ref={nameRef}/>
      </div>
      <div>
        <label>이메일</label>
        <input type='text' ref={emailIdRef} placeholder='이메일 아이디를 입력해주세요'/>
        @
        <input type='text' ref={emaillAddressRef} placeholder='이메일 주소를 입력해주세요' onChange={e => {
          const tldRegex = /\.(com|net|org|io|co|kr|jp|edu|gov|info|biz|name|tv|xyz)$/i;
          if(tldRegex.test(e.target.value)){
            setEmailChk(true);
          } else {
            setEmailChk(false);
          }
        }}/>
      </div>

      <div>
        <button onClick={signUp}>회원가입하기</button>
      </div>
    </div>
  )
}

export default Signup