import React from 'react';
import userProfileImage from '../../assets/daniel.png';
import userBack from '../../assets/deserted-beach-travel-1920x720.jpg';
import UserCard from '../../components/user-card';
import { useUser } from '../../contexts/userContext';
import './index.scss'; // Import the CSS styles for the navbar
const Profile: React.FC = () => {
    const {user} = useUser();
    console.log('daniel123', user)

    return (
        <div className='profile-component'>

            <div className="img-wrapper">
                <img className="cover-img" src={userBack} />
            </div>
            <div className="user-wrapper">
               { user?.username && <UserCard userid={user._id} username={user!.username} userDescription='Hello my name is mo babma i love dancing, what to come to my tent?' userProfileImage={userProfileImage}></UserCard>}
            </div>


        </div>
    );
};

export default Profile;
