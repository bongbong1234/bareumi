import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navigation from './compnents/navi/Navigation';
import Main from './compnents/main/Main';

function App() {
  // 테스트중
  return (
    <div className="mobile-container">
        <Routes>
          <Route path="/" element={<Main/>}></Route>
          <Route path="/my-page"></Route>
          <Route path="/history"></Route>
          <Route path="/product"></Route>
        </Routes>
        <Navigation></Navigation>
    </div>
  );
}

export default App;
