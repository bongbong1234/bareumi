import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navigation from './compnents/navi/Navigation';
import Main from './compnents/main/Main';
import MyPage from './compnents/mypage/MyPage';
import Product from './compnents/Product/Product';

function App() {
  // 테스트중

  return (
    <div className="mobile-container">
        <Routes>
          <Route path="/" element={<Main/>}></Route>
          <Route path="/my-page" element={<MyPage/>}></Route>
          <Route path="/history"></Route>
          <Route path="/product" element={<Product/>}></Route>
        </Routes>
        <Navigation></Navigation>
    </div>
  );
}

export default App;
