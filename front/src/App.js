import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Navigation from './compnents/navi/Navigation';
import Main from './compnents/main/Main';
import MyPage from './compnents/mypage/MyPage';
import Product from './compnents/Product/Product';
import Login from './compnents/login/Login';
import { useEffect, useState } from 'react';
import api from './config/api.config';
import Signup from './compnents/signup/Signup';
import ValidateEmail from './compnents/validateEmail/ValidateEmail';
import { UserContext } from './context/UserContext';
import History from './compnents/history/History';
import { useStopwatch } from 'react-timer-hook';
import flask from './config/flask.config';
import UserChange from './compnents/update/UserChange';
import { TimeContext } from './context/TimeContext';
import { ModalContext } from './context/ModalContext';

function App() {

  const nav = useNavigate();
  const [newId,setNewId] = useState('');
  const [validateEmail, setValidateEmail] = useState('');
  const [sensorSet,setSensorSet] = useState(false);
  const [enhanceStartVal,setEnhanceStartVal] = useState("16:10");
  const [enhanceEndVal, setEnhanceEndVal] = useState("17:00");
  const [enhanceVibe, setEnhanceVibe] = useState(1);
  const [login,setLogin] = useState(false);

  const {seconds, minutes, hours, start, pause, reset} = useStopwatch({autoStart : false});

  const sessionId = "session-id";

  useEffect(()=> {
     api.get("./auth/session-chk",{
      headers: {
        Cookie: `session-id=${sessionId}`,
      }
     })
     .then(res => {
        sessionStorage.setItem("sessionUser",JSON.stringify(res.data.item));
        setLogin(true);
     }).catch(err => {
      setLogin(false);
      console.error(err)
      nav("/login");
     })
  },[])

  const logout = () => {
    console.log("로그아웃")
    api.get("/user/logout").then(
      res => {
        if(res.data.message === true) {
          nav("/")
          sessionStorage.clear();
          window.location.reload();
        }
      }
    );
  }
  
  const onSensorStart = () => {
    flask.get(`/sensor/on`)
    .then(res => {
      console.log(res.data.message)
      setSensorSet(res.data.sensorSet);
      console.log(sensorSet)
      if(res.data.sensorSet) {
        start()
      }
    })
    .catch(err => console.error(err));
  }

  const onSensorPause = () => {
    flask.get(`/sensor/pause`)
    .then(res => {
      console.log(res.data.message)
      setSensorSet(res.data.sensorSet);
      console.log(sensorSet)
      if(!res.data.sensorSet) {
        pause()
      }
    })
    .catch(err => console.error(err));
  }

  const onSensorStop = () => {
    flask.get(`/sensor/off`)
    .then(res => {
      console.log(res.data.message)
      setSensorSet(res.data.sensorSet);
      console.log(sensorSet)
      if(!res.data.sensorSet) {
        pause()
        reset(0,false);
      }
    })
    .catch(err => console.error(err));
  }
  
  return (
    <div className="mobile-container">
      <UserContext.Provider value = {{newId,validateEmail,setNewId,setValidateEmail,logout}}>
          <TimeContext.Provider value = {{seconds,minutes,hours,onSensorStart,onSensorPause,onSensorStop,}}>
            <ModalContext.Provider value = {{enhanceStartVal,
              enhanceVibe,
              enhanceEndVal,
              setEnhanceStartVal,
              setEnhanceEndVal,
              setEnhanceVibe}}>
              <Routes>
                <Route path="/" element={<Main/>}></Route>
                <Route path="/my-page" element={<MyPage/>}></Route>
                <Route path="/history" element={<History/>} ></Route>
                <Route path="/product" element={<Product/>}></Route>
                <Route path='/login' element={<Login setLogin={setLogin}/>}></Route>
                <Route path='/signup' element={<Signup />}></Route>
                <Route path='/signup/validate-email' element={<ValidateEmail/>}></Route>
                <Route path='/pw-chk/:path' element={<UserChange/>}></Route>
              </Routes>
            </ModalContext.Provider>
        </TimeContext.Provider>
      </UserContext.Provider>
      
       {
        login &&  <>
          <button className='fix-btn' onClick={logout}>Logout</button>
          <Navigation></Navigation>
        </>
        }
    </div>
  );
}

export default App;
