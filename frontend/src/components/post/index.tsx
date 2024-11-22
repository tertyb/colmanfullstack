import React from 'react';
import './index.scss'; // Import the CSS styles for the navbar
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography, CardActions, Button } from '@mui/material';


type PostProps = {
  text: string;
  imgUrl: string;

};

const Post: React.FC<PostProps> = ({ text, imgUrl }) => {
  return (
    <Card className='card-wrapper' sx={{ minWidth: 400,minHeight:400, boxShadow: 3 }}>
      <CardContent className='card-contnet'>
        <h4>{text}</h4>
        <img className='post-img' src={imgUrl} ></img>
      </CardContent>
    </Card>
  );
};

export default Post;
