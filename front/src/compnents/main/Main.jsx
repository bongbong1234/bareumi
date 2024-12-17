import React, { useContext, useState } from 'react';
import './main.css';
import { useStopwatch } from 'react-timer-hook';
import { faPause, faPlay, faStop } from '@fortawesome/free-solid-svg-icons'
import {} from '@fortawesome/free-regular-svg-icons';
import {} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ApexChart from 'react-apexcharts';
import { UserContext } from '../../context/UserContext';

const Main = () => {

    const [count,setCount] = useState(0);
    const [baseTime, setBaseTime] = useState(8);
    const [minAlertCount,setMinAlertCount] = useState(5);
    const [todayAlertCtn,setTodayAlertCtn] = useState(0);
    const [left,setLeft] = useState(50);
    const [right,setRight] = useState(50);
    const [weekHour, setWeekHour] = useState([]);
    const [totalHour, setTotalHour] = useState(10);
    const [totalAlert,setTotalAlert] = useState(5);

    const {seconds, minutes, hours, onSensorStart, onSensorPause, onSensorStop} = useContext(UserContext);
    

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

    const minCountOptions = {
        series: [(minAlertCount-todayAlertCtn),todayAlertCtn],
        options: {
                chart: {
                type: 'donut',
                },
                colors:['#D9D9D9','#001D6E'],
                labels: ["최소알림횟수","알림횟수"],
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
    const twistOptions = {
        series: [left,right],
        options: {
                chart: {
                type: 'donut',
                },
                colors:['#B8001F','#001D6E'],
                labels: ["우측","좌측"],
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

    const twistTotalOptions = {
        series: [right,left],
        options: {
                chart: {
                type: 'donut',
                },
                colors:['#B8001F','#001D6E'],
                labels: ["우측","좌측"],
                legend: {
                    show: true,
                    position: 'bottom',
                    fillColors: ['#B8001F', '#001D6E'],
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

        const weekAnalysisOptions = {

            series:[
                {
                    name: "시간",
                    type: "bar",
                    data: [5,4,6,7,3]
                },
                {
                    name:"알림 횟수",
                    type: "line",
                    data: [0,5,3,6,7]
                }
            ],

            options : {
                chart: {
                    type: "bar",
                    zoom: {
                        enabled: false,
                        allowMouseWheelZoom: false
                    },
                    pan: {
                        enabled:false,
                    },
                    toolbar: {
                        show: false,
                    },
                    selection: {
                        enabled: false
                    },
                },
                plotOptions: {
                    bar: {
                      borderWidth: 0,
                      columnWidth: '30%',
                    },
                },
                xaxis: {
                    categories: ['월','화','수','목','금']
                },
                markers: {
                  size: 5,
                  strokeWidth: 0,
                },
                stroke: {
                    width: [0,4]
                },
                datalabes: {
                    enable: false
                },
                colors: ['#001D6E','#B8001F'],
                states: {
                    hover: {
                        filter: {
                            type: 'none'
                        }
                    }
                }
            }
        }

        const wearOptions = {
            series: [totalHour,totalAlert],
            options: {
                chart: {
                type: 'donut',
                },
                colors:['#001D6E','#B8001F'],
                labels: ["사용시간","알림횟수"],
                legend: {
                    show: true,
                    position: "bottom"
                },
                states: {
                    hover: {
                        filter: {
                            type: 'none'
                        }
                    }
                }
            },
        }

    const hourTiwst = {
        series: [
            {
                name: "좌측",
                data: [-5,-10,-3,-2,-1,-9,-10]
            }, {
                name:"우측",
                data: [5,9,7,8,6,10,11]
            }
        ],

        options: {
            chart:{
                type:"bar",
                stacked: true,
                zoom: {
                    enabled: false,
                    allowMouseWheelZoom: false
                },
                pan: {
                    enabled:false,
                },
                toolbar: {
                    show: false,
                },
                selection: {
                    enabled: false
                },
            },
            colors:['#001D6E','#B8001F'],
            plotOptions: {
                bar: {
                    horizontal: true,
                    columnWidth: "10%"
                }
            }, xaxis: {
                min: -15, // 왼쪽 범위
                max: 15,  // 오른쪽 범위  
            }
        }
    }
  return (
    <div className='container main-container'>
        <div className='stopwatch-box'>
            <div className='time'><span>{formatTime(hours)}</span> : <span>{formatTime(minutes)}</span> : <span>{formatTime(seconds)}</span></div>
            <div>
                <button onClick={onSensorStart}>
                    <FontAwesomeIcon className='fa-icon' icon={faPlay} />
                </button>
                <button onClick={onSensorPause}>
                    <FontAwesomeIcon className='fa-icon' icon={faPause} />
                </button>
                <button onClick={onSensorStop}>
                    <FontAwesomeIcon className='fa-icon' icon={faStop} />
                </button>
            </div>
        </div>
        <div className='day-total-box'>
            <div className='day-total-num'>
                <p>오늘 착용시간  : <span> 7 시간</span></p>
                <p>오늘 알림횟수 : <span> 5 회</span></p>
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
                        <p>현재 위험등급 : <span>증후군</span></p>
                    </div>
                    <div className='analysis'>
                        <p>분석현황</p>
                        <div className='text'>
                            <p>
                                틀어짐 상황이 점점 좋아지고 있어요!<br/>
                                열심히 하고 계시군요!<br/>
                            </p>
                        </div>
                    </div>
                </div>
                <div className='chart-box'>
                    <div className='chart'>
                        <p>틀어짐 현황</p>
                        <ApexChart
                        options={twistTotalOptions.options}
                        series={twistTotalOptions.series}
                        type="donut"
                        height={200}/>
                    </div>
                </div>
            </div>
        </div>

        <div className='week-container'>
            <p>이번주 착용시간</p>
            <div className='chart-box'>
                {/* <div className='chart'>
                    <ApexChart 
                    series={weekAnalysisOptions.series} 
                    options={weekAnalysisOptions.options}
                    height={250}
                    />
                </div> */}
            </div>
        </div>

        <div className='totalwear-container'>
            <p>총 사용시간 분석</p>
            <div className='contents'>
                <div className='total-sub'>
                    <p>총 착용시간 : <span>20시간</span></p>
                    <p>총 알람횟수 : <span>30회</span></p>
                </div>
                <div className='content'>
                   <div className='wear-time'>
                        <div>
                            <p>평균 알림 시간</p>
                            <p>16:00 ~ 17:00</p>
                        </div>
                        <div>
                            <p>알림 강화 시간</p>
                            <p>16:00 ~ 17:00</p>
                        </div>
                   </div>
                   <div>
                        <div className='chart'>
                            <div>
                                <ApexChart
                                options={wearOptions.options}
                                series={wearOptions.series}
                                type="donut"
                                height={300}/>
                            </div>
                        </div>
                   </div>
                </div>
            </div>
        </div>

        <div className='twist-analysis-container'>
            <p>시간대별 틀어짐 정보</p>
            <div className='twist-time'>
                <div>
                    <ApexChart
                        options={hourTiwst.options}
                        series={hourTiwst.series}
                        type='bar'
                        height={350}
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Main