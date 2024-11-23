import React from 'react';
import './index.scss'; // Import the CSS styles for the navbar
import { Link } from 'react-router-dom';
import userBack from '../../assets/userBack.jpg'
import UserCard from '../../components/user-card';

const Profile: React.FC = () => {
    return (
        <div className='profile-component'>

            <div className="daniel">
            <img className="cover-img"  src={userBack} />
                </div> 
            <div className="ilay">
            <UserCard></UserCard>
                </div> 


        </div>
    );
};

export default Profile;
