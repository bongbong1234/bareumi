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

function App() {

  const nav = useNavigate();
  const sessionId = "session-id";

  const [login,setLogin] = useState(false);

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




  return (
    <div className="mobile-container">
        <Routes>
          <Route path="/" element={<Main/>}></Route>
          <Route path="/my-page" element={<MyPage/>}></Route>
          <Route path="/history"></Route>
          <Route path="/product" element={<Product/>}></Route>
          <Route path='/login'  element={<Login setLogin = {setLogin}/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
        </Routes>
       {
        login &&  <Navigation></Navigation>
       }
    </div>
  );
}

export default App;
