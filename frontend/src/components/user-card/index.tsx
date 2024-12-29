import { Button, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import React, { useCallback, useState } from 'react';
import EditProfileModal from '../edit-profile-modal';
import { UserPosts } from '../user-posts';
import './index.scss'; // Import the CSS styles for the navbar
import { baseURL } from '../../services/axios/AxiosInstance';
import { ProfilePhoto } from '../profile-photo';
import { useUser } from '../../contexts/userContext';
import { useProfile } from '../../contexts/profileContext';

type UserProps = {
  userProfileImage?: string;
  username: string;
  userDescription?: string;
  userid: string;
};

const UserCard: React.FC<UserProps> = ({ userProfileImage, username, userDescription, userid }) => {
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);

  const { setProfileData, userProfile } = useProfile();
  const { setUserData, user } = useUser();

  const displayEdit = () => userProfile === user?._id


  const toggleEditPopUp = useCallback(() => setIsEditOpen((prevState) => !prevState), [setIsEditOpen])

  return (
    <Card className='card-wrapper' sx={{ minWidth: 750, boxShadow: 2 }}>
      <CardContent className='card-contnet'>
        <div className='card-header'>
          <div className='header-left'>
            <ProfilePhoto userImage={userProfileImage} width={135} height={135} />

            <div className='titles'>
              <Typography variant="h4" component="div">
                {username}
              </Typography>
              <Typography className='sub-text' variant='h6' gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                @{username.replace(/\s+/g, "")}
              </Typography>
            </div>
          </div>
          {displayEdit() &&
            <div className='header-right'>
              <Button variant="contained" className='edit-button' onClick={toggleEditPopUp}> Edit Profile</Button>
            </div>
          }

        </div>

        <div>
          <Typography component="div" gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
            {userDescription ?? 'add a describe to your profile'}
          </Typography>
        </div>

        <div className='posts-tab'>
          <Typography className='myposts' variant="h5" >
            Posts
          </Typography>

          <UserPosts isOwner={displayEdit()} userid={userid} username={username} userProfileImage={userProfileImage} />
        </div>

        <EditProfileModal userid={userid} defaultValues={{ username, description: userDescription, file: userProfileImage }} isOpen={isEditOpen} toggleIsOpen={toggleEditPopUp}>

        </EditProfileModal>


      </CardContent>
    </Card>
  );
};

export default UserCard;
