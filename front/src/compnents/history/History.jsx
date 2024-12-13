import { faPause, faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react'
import ReactApexChart from 'react-apexcharts';
import { useStopwatch } from 'react-timer-hook';
import { UserContext } from '../../context/UserContext';
import "./history.css";

const History = () => {
     const {seconds, minutes, hours, start, pause, reset} = useContext(UserContext);
     const [baseTime, setBaseTime] = useState(8);
     const [log,setLog] = useState([]);

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
                labels: ["최소착용시간","착용시간"],
                legend: {
                show: false,
                },
                states: {
                    hover: {
                        filter: {
                            type: 'none'
                        }
                    }
                }
            },
        };
    
  return (
    <div className='history-container'>
        <div className='stopwatch-container'>
            <div className='chart'>
                  <ReactApexChart
                    options={minHourOptions.options}
                    series={minHourOptions.series}
                    type="donut"
                    height={300}
                    />
            </div>
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
            <div className='history-log'>
                <table>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>시작시간</th>
                            <th>지속시간</th>
                            <th>날짜</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            log.length !== 0 ? <></> :
                            <>
                                <tr>
                                    <td colSpan={4}>정보가없습니다!</td>
                                </tr>
                            </>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default History