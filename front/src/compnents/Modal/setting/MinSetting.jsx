import React from 'react'

const MinSetting = ({setModalOn, closeModalBox}) => {
  return (
    <div className='min-setting-box modal-box'>
        <div className='modal-close-btn'>
            <img src={'http://localhost:3000/icon/close.png'} onClick={closeModalBox}/>
        </div>
        <div>
            <div>
                <div>
                    <label>비정상 자세 감지</label>
                </div>
                <div>
                    <input type='text' placeholder='불량자세 감지시간을 입력해주세요 (분)'/>
                </div>
            </div>
            <div>
                <div>
                    <label>착용 시간</label>
                </div>
                <div>
                    <input type='text' placeholder='최소 착용시간을 입력해주세요'/>
                </div>
            </div>
            <div>
                <div>
                    <label>알림 횟수</label>
                </div>
                <div>
                    <input type='text' placeholder='최소 알림횟수를 입력해주세요'/>
                </div>
            </div>
            <div>
                <button>설정 완료</button>
            </div>
        </div>
    </div>
  )
}

export default MinSetting