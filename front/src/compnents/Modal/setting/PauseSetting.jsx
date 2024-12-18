import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react'

const PauseSetting = ({setModalOn, closeModalBox}) => {

    const [selStartVal, setSelStartVal] = useState(null);
    const [selEndVal, setSelEndVal] = useState(null);


    const handleTimeChange = (newTime,type) => {
        console.log("Selected Time:", newTime?.format("HH:mm")); // 선택된 시간 출력
        if(type === "start") {
          setSelStartVal(newTime.format("HH:mm"));
        } else if (type === "end") {
          setSelEndVal(selStartVal < newTime ? selStartVal : newTime.format("HH:mm"))
        }
      };

  return (
    <div className='pause-setting-box modal-box'>
        <div className='modal-close-btn'>
            <img src={'http://localhost:3000/icon/close.png'} onClick={closeModalBox}/>
        </div>
        <div>
                <TimePicker
                    value={dayjs(selStartVal,"HH:mm")}           // 현재 선택된 시간
                    onChange={(time) => handleTimeChange(time,"start")}    // 시간 선택 시 콜백
                    minuteStep = {10}
                    format="HH:mm"         // 24시간 형식
                    allowClear={true}      // 초기화 버튼 표시
                />
                <span>~</span>
                <TimePicker
                    value={dayjs(selEndVal,"HH:mm")}           // 현재 선택된 시간
                    onChange={(time) => handleTimeChange(time,"end")}  // 시간 선택 시 콜백
                    minuteStep = {10}
                    disabledHours = {() => {
                        let hours = []
                        for (let i=1; i <= selStartVal?.split(":")[0]; i++ ) {
                        hours.push(i)
                        }
                        return hours
                    }}  
                    format="HH:mm"         // 24시간 형식
                    allowClear={true}      // 초기화 버튼 표시
                />
            </div>

            <div>
                <button>설정완료</button>
            </div>
    </div>
  )
}

export default PauseSetting