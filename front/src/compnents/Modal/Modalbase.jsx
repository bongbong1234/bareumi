import React from 'react'
import './modal.css'
import EnhancedSetting from './setting/EnhancedSetting'

const Modalbase = ({name,setName,setModalOn}) => {
    console.log(name);
    const closeModalBox = () => {
        setName("");
        setModalOn(false);
    }
  return (
    <div className='modal-container'>

       <div className='modal-box'>
       <div className='modal-close-btn'>
            <img src={'http://localhost:3000/icon/close.png'} onClick={closeModalBox}/>
       </div>
            {name === 'enhanced' && <EnhancedSetting/>}
       </div>
    </div>
  )
}

export default Modalbase