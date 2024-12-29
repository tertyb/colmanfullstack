import React from 'react';
import userBack from '../../assets/deserted-beach-travel-1920x720.jpg';
import { CreatePost } from '../../components/create-post';
import UserCard from '../../components/user-card';
import { useUser } from '../../contexts/userContext';
import './index.scss'; // Import the CSS styles for the navbar
import { userPostKey } from '../../services/postService';
const Profile: React.FC = () => {
    const {user} = useUser();
    console.log('daniel123', user)

    return (
        <div className='profile-component'>

            <div className="img-wrapper">
                <img className="cover-img" src={userBack} />
            </div>
            <div className="user-wrapper">
               { user?.username && <UserCard userid={user._id} username={user!.username} userDescription={user.description} userProfileImage={user.image }></UserCard>}
            </div>
            <CreatePost keyToRefetch={userPostKey}/>

        </div>
    );
};

export default Profile;
