import React, { useContext, useEffect, useRef, useState } from 'react'
import api from '../../config/api.config'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const ValidateEmail = () => {

    const {newId,validateEmail} = useContext(UserContext);

    const nav = useNavigate();
    const [value, setValue] = useState('');

    const userRef = useRef();

    useEffect(()=> {
        api.post('/mail/send-validate',{
            to: validateEmail,
        }).then(res => {
            setValue(res.data.validateVal);
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
        <div>
            <p>이메일로 인증번호를 보냈습니다!</p>
            <p>인증번호를 적어주세요!!</p>

            <p>인증번호</p>
            <input type='text' ref={userRef}/>
            <div>
                 <button onClick={onValidate}>인증하기</button>
            </div>
        </div>
    </div>
  )
}

export default ValidateEmail