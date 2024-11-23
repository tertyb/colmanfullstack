import React from 'react';
import './index.scss'; // Import the CSS styles for the navbar
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography, CardActions, Button } from '@mui/material';
import Divider from '@mui/material/Divider';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';

type PostProps = {
  text: string;
  imgUrl: string;
  userImage: string;
  userName: string;
  date: string;
};

const Post: React.FC<PostProps> = ({ text, imgUrl, userImage, userName, date }) => {
  return (
    <Card className='card-wrapper' sx={{ minWidth: 400, minHeight: 400, boxShadow: 3 }}>
      <CardContent className='post-contnet'>
        <div className='top-bar'>
          <div className='right-side'>
            <img className='profile-photo' src={userImage} width={35} height={35} />
            <div className='sub-info'>
              <p>{userName}</p>
              <p className='sub-name'>@{userName.replace(/\s+/g, "")}</p>
            </div>
          </div>
          <p className='date'>{date} </p>
        </div>
        <h4>{text}</h4>
        <div className="post-img-wrapper">
          <img className='post-img' src={imgUrl} ></img>

        </div>
        <Divider className='divider' variant="inset" />

        <div className='bottom-row'>
          <div className='left-side'>
            <p>15</p>
            <CommentIcon></CommentIcon>
            <p>25</p>
            <FavoriteBorderIcon></FavoriteBorderIcon>
          </div>
          <div className='right-side'>
            <Button variant="contained" className='edit-button' > ערוך</Button>
            <Button variant="outlined" className='edit-button' color='error'> מחק</Button>

          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Post;
