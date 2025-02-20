import React, { useState } from 'react';
import userBack from '../../assets/deserted-beach-travel-1920x720.jpg';
import { CreatePost } from '../../components/create-post';
import UserCard from '../../components/user-card';
import { useUser } from '../../contexts/userContext';
import './index.scss'; // Import the CSS styles for the navbar
import { useGetFeedPosts, userPostKey } from '../../services/postService';

import { useGetUserDataById } from '../../services/userService'; // Import the hook
import { useLocation } from 'react-router-dom';
import MapComponent from '../../components/map';
import post from '../../components/post';
import { CircularProgress } from '@mui/material';

const MapView: React.FC = () => {
    const [locationName, setLocationName] = useState('');
    const [locationY, setLocationX] = useState(0);
    const [locationX, setLocationY] = useState(0);

    const { data, isLoading, mutate } = useGetFeedPosts();

    if (isLoading || !data) return <CircularProgress />
    
    return (
        <div className='page-wrapper'>
            <MapComponent
                locationNameChange={setLocationName}
                setLocationX={setLocationX}
                setLocationY={setLocationY}
                savedLocations={data?.map((post) => ({ position: [post.locationX ?? 1.0464363474, post.locationY ?? 3.0464363474] }))}
                large={true}
                wholeMapZoom={true}
                edit={false}
            />
        </div>
    );
};

export default MapView;
