import React from 'react';
import './index.scss'; // Import the CSS styles for the navbar
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography, CardActions, Button, Divider } from '@mui/material';
import userpost from '../../assets/userBack.jpg'
import Post from '../post';
import { Modal } from '@mui/base/Modal';
import EditProfileModal from '../edit-profile-modal';

type UserProps = {
  userProfileImage: string;
  userName: string;
  userDescription: string;
};

const UserCard: React.FC<UserProps> = ({ userProfileImage, userName, userDescription }) => {


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);


  return (
    <Card className='card-wrapper' sx={{ minWidth: 750, boxShadow: 2 }}>
      <CardContent className='card-contnet'>
        <div className='card-header'>
          <div className='header-left'>

            <img src={userProfileImage} className='profile-img' width={135} height={135}></img>

            <div className='titles'>
              <Typography variant="h4" component="div">
                {userName}
              </Typography>
              <Typography className='sub-text' variant='h6' gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                @{userName.replace(/\s+/g, "")}
              </Typography>
            </div>
          </div>
          <div className='header-right'>
            <Button variant="contained" className='edit-button' onClick={handleOpen}> Edit Profile</Button>
          </div>


        </div>

        <div>
          <Typography component="div" gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
            {userDescription}
          </Typography>
        </div>

        <div className='posts-tab'>
          <Typography className='myposts' variant="h5" >
            My Posts
          </Typography>
          <div className='posts'>
            <Post text="Yesterday i traveld to pataya it was so fun" imgUrl={userpost} userImage={userProfileImage} userName={userName} date="10/20/2024" />
            <Post text="Yesterday i traveld to pataya it was so fun" imgUrl={userpost} userImage={userProfileImage} userName={userName} date='10/20/2024' />
            <Post text="Yesterday i traveld to pataya it was so fun" imgUrl={userpost} userImage={userProfileImage} userName={userName} date='10/20/2024' />
            <Post text="Yesterday i traveld to pataya it was so fun" imgUrl={userProfileImage} userImage={userProfileImage} userName={userName} date='10/20/2024' />
          </div>
        </div>

        <EditProfileModal open={open} setOpen={setOpen}>

        </EditProfileModal>


      </CardContent>
    </Card>
  );
};

export default UserCard;
