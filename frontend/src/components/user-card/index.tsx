import React from 'react';
import './index.scss'; // Import the CSS styles for the navbar
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography, CardActions, Button } from '@mui/material';


const UserCard: React.FC = () => {
  return (
    <Card className='card-wrapper' sx={{ minWidth: 750, boxShadow: 2 }}>
      <CardContent className='card-contnet'>
        <div className='card-header'>
          <div className='header-left'>

            <img src='/assets/userBack.jpg' className='profile-img' width={100} height={100}></img>

            <div className='titles'>
              <Typography variant="h4" component="div">
                User name
              </Typography>
              <Typography className='sub-text' variant='h6' gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                @Username
              </Typography>
            </div>
          </div>
          <div className='header-right'>
            <Button variant="contained" className='edit-button'>Edit profile</Button>
          </div>
        </div>

        <Typography component="div" gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          This is the user description please fill this out later on
        </Typography>


        <div className='posts'>
          <Typography variant="h5" component="div">
            Posts
          </Typography>
        </div>


      </CardContent>
    </Card>
  );
};

export default UserCard;
