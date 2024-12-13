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

function App() {

  const nav = useNavigate();
  const [newId,setNewId] = useState('');
  const [validateEmail, setValidateEmail] = useState('');
  const sessionId = "session-id";

  const [login,setLogin] = useState(false);


  const {seconds, minutes, hours, start, pause, reset} = useStopwatch({autoStart : false});

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
      console.error(err)
      nav("/login");
     })
  },[])

  const logout = () => {
    console.log("로그아웃")
    api.get("/user/logout").then(
      res => {
        if(res.data.message === true) {
          window.location.reload();
        }
      }
    );
  }
  
  return (
    <div className="mobile-container">
      <UserContext.Provider value ={{newId,
        validateEmail,
        setNewId,
        setValidateEmail,
        seconds, 
        minutes, 
        hours, 
        start, 
        pause, 
        reset}}>
        <Routes>
          <Route path="/" element={<Main/>}></Route>
          <Route path="/my-page" element={<MyPage/>}></Route>
          <Route path="/history" element={<History/>} ></Route>
          <Route path="/product" element={<Product/>}></Route>
          <Route path='/login' element={<Login setLogin={setLogin}/>}></Route>
          <Route path='/signup' element={<Signup  />}></Route>
          <Route path='/signup/validate-email' element={<ValidateEmail/>}></Route>
          <Route path='/pw-chk/:path'></Route>
        </Routes>
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
