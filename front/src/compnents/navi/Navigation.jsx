import React, { useEffect, useRef, useState } from 'react'
import './Navi.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBasketShopping, faClockRotateLeft, faHouse } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons';
import {} from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
const Navigation = () => {

    const [select, setSelect] = useState('home')
    
    const naviRef = useRef();

    useEffect(() => {
    },[select])

    const changeNavi = (e) => {
        const targetName = e.currentTarget.querySelector('p').innerText;
        console.log(targetName);
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