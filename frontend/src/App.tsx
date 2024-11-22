import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import './index.scss'
import Profile from './views/Profile';

const App: React.FC = () => {
  return (
    <div className='whole-app'>
      <Navbar />
      <div className="content">
          <Routes>
            <Route path="/" element={<></>} />
            <Route path="/profile" element={<Profile/>} />
            {/* Add other routes here */}
          </Routes>
        </div>
    </div>
  );
};

export default App;
