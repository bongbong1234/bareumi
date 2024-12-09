import React, { useState } from 'react';
import './main.css';
import { useStopwatch } from 'react-timer-hook';
import { faPause, faPlay, faStop } from '@fortawesome/free-solid-svg-icons'
import {} from '@fortawesome/free-regular-svg-icons';
import {} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ApexChart from 'react-apexcharts';

const Main = () => {

    const [count,setCount] = useState(0);
    const [baseTime, setBaseTime] = useState(8);
    const [minAlertCount,setMinAlertCount] = useState(8);
    const [alertCtn,setAlertCtn] = useState(0);
    const [left,setLeft] = useState(50);
    const [right,setRight] = useState(50);

    const {seconds, minutes, hours, start, pause, reset} = useStopwatch({autoStart : false});
    
    const stopRecord = () => {
        pause()
        reset(0,false);
    }

    const formatTime = (value) => {
        return String(value).padStart(2, '0'); // 한 자리 숫자 앞에 0 추가
      };



    const minHourOptions = {
    series: [(baseTime-hours),hours],
    options: {
            chart: {
            type: 'donut',
            },
            colors:['#D9D9D9','#001D6E'],
            legend: {
            show: false,
            }
        },
    };

    const minCountOptions = {
        series: [(minAlertCount-alertCtn),alertCtn],
        options: {
                chart: {
                type: 'donut',
                },
                colors:['#D9D9D9','#001D6E'],
                legend: {
                show: false,
                }
            },
        };
    const twistOptions = {
        series: [left,right],
        options: {
                chart: {
                type: 'donut',
                },
                colors:['#B8001F','#001D6E'],
                legend: {
                show: false,
                }
            },
        };

  return (
    <div className='main-container'>
        <div className='stopwatch-box'>
            <div className='time'><span>{formatTime(hours)}</span> : <span>{formatTime(minutes)}</span> : <span>{formatTime(seconds)}</span></div>
            <div>
                <button onClick={start}>
                    <FontAwesomeIcon className='fa-icon' icon={faPlay} />
                </button>
                <button onClick={pause}>
                    <FontAwesomeIcon className='fa-icon' icon={faPause} />
                </button>
                <button onClick={stopRecord}>
                    <FontAwesomeIcon className='fa-icon' icon={faStop} />
                </button>
            </div>
        </div>
        <div className='day-total-box'>
            <div className='day-total-num'>
                <p>오늘 착용시간  : <span> {formatTime(hours)} 시간</span></p>
                <p>오늘 알림횟수 : <span> {count} 회</span></p>
            </div>
            <div className='charts'>
                 <div className='chart'>
                    <p>착용 시간</p>
                    <ApexChart
                    options={minHourOptions.options}
                    series={minHourOptions.series}
                    type="donut"
                    height={160}/>
                </div>
                <div className='chart'>
                    <p>알림 횟수</p>
                    <ApexChart
                    options={minCountOptions.options}
                    series={minCountOptions.series}
                    type="donut"
                    height={160}/>
                </div>
                <div className='chart'>
                    <p>틀어짐 현황</p>
                    <ApexChart
                    options={twistOptions.options}
                    series={twistOptions.series}
                    type="donut"
                    height={160}/>
                </div>
            </div>
        </div>
        <div className='analysis-container'>
            <p>사용자 상세분석</p>
            <div className='analysis-box'>
                <div>
                    <div className='danger_num'>
                        <p>현재 위험등급 : <span>없음</span></p>
                    </div>
                    <div className='analysis'>
                        <p>분석현황</p>
                        <div className='text'>
                            <p>측정된 기록이 없습니다!</p>
                        </div>
                    </div>
                </div>
                <div className='chart-box'>
                    <div className='chart'>
                        <p>틀어짐 현황</p>
                        <ApexChart
                        options={twistOptions.options}
                        series={twistOptions.series}
                        type="donut"
                        height={160}/>
                    </div>
                </div>
            </div>

        </div>

    </div>
  )
}

export default Main