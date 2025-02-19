import React, { useCallback, useState } from 'react';
import './index.scss'; // Import the CSS styles for the navbar
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/userContext';
import appLogo from '../../assets/site-logo.png';

import { unlikePost, likePost } from '../../services/postService';

const Navbar: React.FC = () => {


  const { setUserData, user } = useUser();
  let params: URLSearchParams = new URLSearchParams();
  const [profileUrl, setProfileUrl] = useState<string>(''); // Store the profile URL

  const profileClicked = useCallback(async () => {
    if (user?._id) {
      params.set('id', user?._id); // Set the 'id' query parameter
      setProfileUrl(`/profile?${params.toString()}`); // Update profile URL state
    }
  }, [user?._id]);

  const { logoutUser } = useUser();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={appLogo} alt="TripsNet Logo" className="navbar-logo-img" />
        <span className="navbar-logo">TripsNet</span>
      </div>
      <div className="navbar-center">
        <Link to="/" className="navbar-link">Feed</Link>
        <Link to={profileUrl} onClick={profileClicked} className="navbar-link">Profile</Link>
      </div>
      <div className="navbar-right">
        <button onClick={logoutUser} className="btn sign-out-btn">Sign Out</button>
      </div>
    </nav>
  );
};

export default Navbar;
