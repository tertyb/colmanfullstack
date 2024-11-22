import React from 'react';
import './index.scss'; // Import the CSS styles for the navbar
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="navbar-logo">SocialNet</span>
      </div>
      <div className="navbar-center">
      <Link to="/" className="navbar-link">Feed</Link>
        <Link to="/profile" className="navbar-link">Profile</Link>
      </div>
      <div className="navbar-right">    
        <button className="btn sign-out-btn">Sign Out</button>
      </div>
    </nav>
  );
};

export default Navbar;
