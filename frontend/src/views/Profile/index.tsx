import React from 'react';
import userBack from '../../assets/deserted-beach-travel-1920x720.jpg';
import { CreatePost } from '../../components/create-post';
import UserCard from '../../components/user-card';
import { useUser } from '../../contexts/userContext';
import './index.scss'; // Import the CSS styles for the navbar
import { userPostKey } from '../../services/postService';
import { useProfile } from '../../contexts/profileContext';
import { useGetUserDataById } from '../../services/userService'; // Import the hook

const Profile: React.FC = () => {
    const { userProfile } = useProfile();

    // Use the custom hook to fetch user data by id
    const { data, error, isLoading } = useGetUserDataById(userProfile || null);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className='profile-component'>
            <div className="img-wrapper">
                <img className="cover-img" src={userBack} />
            </div>
            <div className="user-wrapper">
                {data?.username && (
                    <UserCard 
                        userid={data._id} 
                        username={data!.username} 
                        userDescription={data.description} 
                        userProfileImage={data.image}
                    />
                )}
            </div>
            <CreatePost keyToRefetch={userPostKey} />
        </div>
    );
};

export default Profile;
