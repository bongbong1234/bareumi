import React, { useEffect, useRef, useState } from 'react'
import './navi.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBasketShopping, faClockRotateLeft, faHouse } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons';
import {} from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';
import api from '../../config/api.config';
const Navigation = () => {

    const nav = useNavigate();
    const [select, setSelect] = useState('')
    const naviRef = useRef();

  
    useEffect(()=> {
        setSelect(sessionStorage.getItem("currentPath"));
    },[])

    useEffect(() => {
        api.get("./auth/session-chk",{
            headers: {
               
            }
            })
            .then(res => {
                if(select === "home") {
                    nav("/");
                } else if (select === "history") {
                    nav("../history");
                } else if (select === "product") {
                    nav("../product");
                } else if (select === "mypage") {
                    nav("../my-page");
                }

                sessionStorage.setItem("currentPath",select);
                console.log(sessionStorage.getItem("currentPath"));
            }).catch(err => {
            console.error(err)
            nav("/login");
            })
    },[select])    

    const changeNavi = (e) => {
        const targetName = e.currentTarget.querySelector('p').innerText;
        setSelect(targetName.toLowerCase());
    }


  return (
    <div className='navi-container'>

        <div className={`main ${select === 'home' ? 'active' : ''}`} onClick={(e) => {changeNavi(e)}} ref={ naviRef }>
            <FontAwesomeIcon icon={faHouse} style={{
                color: select === 'home' ? '#001D6E' : ''
            }}/>
            <p style={{
            color: select === 'home' ? '#001D6E' : ''  
            }}>Home</p>
        </div>


        <div className='history' onClick={(e) => {changeNavi(e)}} ref={ naviRef }>
            <FontAwesomeIcon icon={faClockRotateLeft} style={{
                color: select === 'history' ? '#001D6E' : ''
            }}/>
            <p style={{
                color: select === 'history' ? '#001D6E' : ''
            }}>History</p>
        </div>


        <div className='product' onClick={(e) => {changeNavi(e)}} ref={ naviRef }>
            <FontAwesomeIcon icon={faBasketShopping} style={{
                color: select === 'product' ? '#001D6E' : ''
            }}/>
            <p style={{
                color: select === 'product' ? '#001D6E' : ''
            }}>Product</p>
        </div>

        <div className='my-page' onClick={(e) => {changeNavi(e)}} ref={ naviRef }>
            <FontAwesomeIcon icon={faUser} style={{
                color: select === 'mypage' ? '#001D6E' : ''
            }}/>
            <p style={{
                color: select === 'mypage' ? '#001D6E' : ''
            }}>MyPage</p>
        </div>
    </div>
  )
}

export default Navigation