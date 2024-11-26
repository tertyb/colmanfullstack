import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import './index.scss'
import Profile from './views/Profile';
import { LoginScreen } from './views/Login';
import { LoginWrapper } from './components/loginWrapper';

const App: React.FC = () => {
  return (
    <div className='whole-app'>
      <Navbar />
      <div className="content">
        <LoginWrapper>
         <>
          <Routes>
            <Route path="/" element={<></>} />
            <Route path="/profile" element={<Profile/>} />
            {/* Add other routes here */}
          </Routes>
          </>
          </LoginWrapper>
          <Routes>
          <Route path="/login" element={<LoginScreen/>} />
          </Routes>
        </div>
    </div>
  )
};

export default App;
