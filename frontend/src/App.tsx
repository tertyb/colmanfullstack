import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import './index.scss'

const App: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="content">
          <Routes>
            <Route path="/" element={<></>} />
            <Route path="/profile" element={<></>} />
            {/* Add other routes here */}
          </Routes>
        </div>
    </div>
  );
};

export default App;