import React, { useContext, useEffect, useRef, useState } from 'react'
import api from '../../config/api.config'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import './ValidateEmail.css'

const ValidateEmail = () => {

    const {newId,validateEmail} = useContext(UserContext);

    console.log("인증 이메일:", validateEmail)

    const nav = useNavigate();
    const [value, setValue] = useState('');

    const userRef = useRef();

    useEffect(()=> {
        api.post('/mail/send-validate',{
            to: validateEmail,
        }).then(res => {
            setValue(res.data.validateVal);
            console.log(value);
        })
    },[])

    const onValidate = () => {
        let userVal = userRef.current.value;
        if(value === userVal) {
            api.put('/user/validate',{
                id: newId,
                value: true
            }).then(res => {
                if(res.data.message) {
                    nav('../../login')
                    userRef.current.value = '';
                }
            }).catch(err => {
                console.error(err);
            })
        } else {
            alert("인증번호가 맞지 않습니다!")
        }
    }

  return (
    <div>
        <div className="email-container">
            <p>이메일로 인증번호를 보냈습니다!</p>
            <p>인증번호를 적어주세요!!</p>
            <input type='text' ref={userRef} placeholder="인증번호를 입력하세요"/>
            <div>
                 <button onClick={onValidate}>인증하기</button>
            </div>
        </div>
    </div>
  )
}

export default ValidateEmail