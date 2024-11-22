import React from 'react';
import './index.scss'; // Import the CSS styles for the navbar
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography, CardActions, Button } from '@mui/material';
import Post from '../post';


const UserCard: React.FC = () => {
  return (
    <Card className='card-wrapper' sx={{ minWidth: 750, boxShadow: 2 }}>
      <CardContent className='card-contnet'>
        <div className='card-header'>
          <div className='header-left'>

            <img src='/assets/userBack.jpg' className='profile-img' width={100} height={100}></img>

            <div className='titles'>
              <Typography variant="h4" component="div">
                שם משתמש
              </Typography>
              <Typography className='sub-text' variant='h6' gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                @שם משתמש
              </Typography>
            </div>
          </div>
          <div className='header-right'>
            <Button variant="contained" className='edit-button'> ערוך פרופיל</Button>
          </div>
        </div>

        <Typography component="div" gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          דניאל צבי היה פה דניאל צבי היה פה דניאל צבי היה פה
        </Typography>


        <div className='posts'>
          <Typography variant="h5" component="div">
            הפוסטים שלי
          </Typography>
          <Post text="איזה כיף היום מצאתי דרך להנות מהשטות הזאת" imgUrl='fff'></Post>
          <Post text="איזה כיף היום מצאתי דרך להנות מהשטות הזאת" imgUrl='fff'></Post>
          <Post text="איזה כיף היום מצאתי דרך להנות מהשטות הזאת" imgUrl='fff'></Post>
          <Post text="איזה כיף היום מצאתי דרך להנות מהשטות הזאת" imgUrl='fff'></Post>
       
        </div>


      </CardContent>
    </Card>
  );
};

export default UserCard;
