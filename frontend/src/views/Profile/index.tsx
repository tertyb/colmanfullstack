import React from 'react';
import './index.scss'; // Import the CSS styles for the navbar
import { Link } from 'react-router-dom';
import userBack from '../../assets/giphy.gif'
import UserCard from '../../components/user-card';
import userProfileImage from '../../assets/daniel.png'
const Profile: React.FC = () => {
    return (
        <div className='profile-component'>

            <div className="img-wrapper">
                <img className="cover-img" src={userBack} />
            </div>
            <div className="user-wrapper">
                <UserCard userName='יוני חטאים' userProfileImage={userProfileImage}></UserCard>
            </div>


        </div>
    );
};

export default Profile;
