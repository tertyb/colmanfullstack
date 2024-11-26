import React from 'react';
import './index.scss'; // Import the CSS styles for the navbar
import { Link } from 'react-router-dom';
import userBack from '../../assets/deserted-beach-travel-1920x720.jpg'
import UserCard from '../../components/user-card';
import userProfileImage from '../../assets/daniel.png'
const Profile: React.FC = () => {
    return (
        <div className='profile-component'>

            <div className="img-wrapper">
                <img className="cover-img" src={userBack} />
            </div>
            <div className="user-wrapper">
                <UserCard userName='Mo bamba' userDescription='Hello my name is mo babma i love dancing, what to come to my tent?' userProfileImage={userProfileImage}></UserCard>
            </div>


        </div>
    );
};

export default Profile;
