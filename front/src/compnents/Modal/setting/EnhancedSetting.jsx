import React, { useContext, useEffect, useState } from 'react';
import { TimePicker } from "antd";
import "antd/dist/reset.css"; // Ant Design CSS
import { ModalContext } from '../../../context/ModalContext';
import dayjs from 'dayjs';

const EnhancedSetting = ({setModalOn,closeModalBox}) => {

  const {enhanceStartVal,
          enhanceEndVal,
          enhanceVibe,
          setEnhanceStartVal,
          setEnhanceEndVal,
          setEnhanceVibe} = useContext(ModalContext);

  const [selStartVal, setSelStartVal] = useState(null);
  const [selEndVal, setSelEndVal] = useState(null);
  const [selVibe, setSelVibe] = useState(null);

  useEffect(() => {
    setSelStartVal(enhanceStartVal);
    setSelEndVal(enhanceEndVal);
    setSelVibe(enhanceVibe);
  },[])

  const handleTimeChange = (newTime,type) => {
    console.log("Selected Time:", newTime?.format("HH:mm")); // 선택된 시간 출력
    if(type === "start") {
      setSelStartVal(newTime.format("HH:mm"));
      console.log(selEndVal < newTime)
      setSelEndVal(selEndVal < newTime ? selEndVal : newTime.format("HH:mm"))
    } else if (type === "end") {
      setSelEndVal(selStartVal < newTime ? selStartVal : newTime.format("HH:mm"))
    }
  };

  const setEnhanceTime = () => {
    setEnhanceStartVal(selStartVal );
    setEnhanceEndVal(selEndVal);
    setEnhanceVibe(selVibe);
    setModalOn(false);
  }

  return (
    <div className='enhanced-setting modal-box'>
      <div className='modal-close-btn'>
          <img src={'http://localhost:3000/icon/close.png'} onClick={closeModalBox}/>
      </div>
      <div>
        <label>시간 변경</label>
        <div>
          <TimePicker
            value={selStartVal ? dayjs(selStartVal,"HH:mm") : dayjs(enhanceStartVal,"HH:mm")}           // 현재 선택된 시간
            onChange={(time) => handleTimeChange(time,"start")}    // 시간 선택 시 콜백
            minuteStep = {10}
            format="HH:mm"         // 24시간 형식
            allowClear={true}      // 초기화 버튼 표시
          />
          <span>~</span>
          <TimePicker
            value={selEndVal ? dayjs(selEndVal,"HH:mm") : dayjs(enhanceEndVal,"HH:mm")}           // 현재 선택된 시간
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
      </div>
      <div>
        <label>진동 세기</label>
        <div>
          <select defaultValue={selVibe} onChange={e => setSelVibe(e.target.value)}>
            <option disabled>값을 선택해주세요</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <button onClick={setEnhanceTime}>저장하기</button>
      </div>
    </div>
  )
}

export default EnhancedSetting;