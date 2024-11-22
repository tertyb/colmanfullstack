import React from 'react';
import Navbar from './components/navbar';
import { Link, Route, Routes } from 'react-router-dom';

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
