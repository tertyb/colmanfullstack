import React, { useCallback } from 'react';
import './index.scss'; // Import the CSS styles for the navbar
import { Link } from 'react-router-dom';
import { useUser } from '../../contexts/userContext';
import { useProfile } from '../../contexts/profileContext';
import { unlikePost, likePost } from '../../services/postService';

const Navbar: React.FC = () => {

  const { setProfileData, userProfile } = useProfile();
  const { setUserData, user } = useUser();

   const profileClicked = useCallback(async () => {

    if (user?._id) {

      setProfileData(user._id);
    }
    },[user?._id])

  const {logoutUser} = useUser();


  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="navbar-logo">SocialNet</span>
      </div>
      <div className="navbar-center">
      <Link to="/" className="navbar-link">Feed</Link>
        <Link to="/profile" onClick={profileClicked} className="navbar-link">Profile</Link>
      </div>
      <div className="navbar-right">    
        <button onClick={logoutUser} className="btn sign-out-btn">Sign Out</button>
      </div>
    </nav>
  );
};

export default Navbar;
