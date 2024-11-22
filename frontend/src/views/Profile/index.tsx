import React from 'react';
import './index.scss'; // Import the CSS styles for the navbar
import { Link } from 'react-router-dom';
import UserCard from '../../components/user-card';

const Profile: React.FC = () => {
    return (
        <div className='profile-component'>

            <img className="cover-img"  src='/assets/userBack.jpg' />
            <UserCard></UserCard>


        </div>
    );
};

export default Profile;
