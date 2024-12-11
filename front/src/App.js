import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Navigation from './compnents/navi/Navigation';
import Main from './compnents/main/Main';
import MyPage from './compnents/mypage/MyPage';
import Product from './compnents/Product/Product';
import Login from './compnents/login/Login';
import { useEffect } from 'react';
import api from './config/api.config';

function App() {

  const nav = useNavigate();

  const sessionId = "session-id";

  useEffect(()=> {
     api.get("./auth/session-chk",{
      headers: {
        Cookie: `session-id=${sessionId}`,
      }
     })
     .then(res => {
        if(!res.data.item) {
        }
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
          <Route path="/product"></Route>
          <Route path='/login' element={<Login/>}></Route>
        </Routes>
        <Navigation></Navigation>
    </div>
  );
}

export default App;
