import { Button, CircularProgress, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import React, { useCallback, useState } from 'react';
import userpost from '../../assets/userBack.jpg';
import { IPost } from '../../interfaces/post';
import EditProfileModal from '../edit-profile-modal';
import Post from '../post';
import './index.scss'; // Import the CSS styles for the navbar
import { useGetUserPosts } from '../../services/postService';

type UserProps = {
  userProfileImage: string;
  username: string;
  userDescription: string;
  userid: string;
};

const UserCard: React.FC<UserProps> = ({ userProfileImage, username, userDescription, userid }) => {
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const { data, isLoading, mutate } = useGetUserPosts(userid);
 
  const toggleEditPopUp = useCallback(() => setIsEditOpen((prevState) => !prevState), [setIsEditOpen])
  
  const onChangePost = useCallback(() => {
    mutate();
  }, [mutate])

  if (isLoading) return <CircularProgress />

  return (
    <Card className='card-wrapper' sx={{ minWidth: 750, boxShadow: 2 }}>
      <CardContent className='card-contnet'>
        <div className='card-header'>
          <div className='header-left'>

            <img src={userProfileImage} className='profile-img' width={135} height={135}></img>

            <div className='titles'>
              <Typography variant="h4" component="div">
                {username}
              </Typography>
              <Typography className='sub-text' variant='h6' gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                @{username.replace(/\s+/g, "")}
              </Typography>
            </div>
          </div>
          <div className='header-right'>
            <Button variant="contained" className='edit-button' onClick={toggleEditPopUp}> Edit Profile</Button>
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
            {
              data?.map((post: IPost) => <Post key={post._id} postId={post._id} text={post.text} imgUrl={userpost} userImage={userProfileImage} onPostChange={onChangePost} userName={username} date={post.date} likes={post.likes} comments={post.comments} ></Post>)
            }
          </div>
        </div>

        <EditProfileModal userid={userid} defaultValues={{ username, userDescription }} isOpen={isEditOpen} toggleIsOpen={toggleEditPopUp}>

        </EditProfileModal>


      </CardContent>
    </Card>
  );
};

export default UserCard;
