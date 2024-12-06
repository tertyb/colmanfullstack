import React, { useCallback, useMemo, useState } from 'react';
import './index.scss'; // Import the CSS styles for the navbar
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography, CardActions, Button } from '@mui/material';
import Divider from '@mui/material/Divider';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import { CommentModel, IPost } from '../../interfaces/post';
import { deletePost, editPost, likePost, unlikePost } from '../../services/postService';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditPostModal from '../edit-post-model';
import { useUser } from '../../contexts/userContext';
import classNames from 'classnames';
import { CommentsView } from '../comments-view';

type PostProps = {
  postId: string
  text: string;
  imgUrl: string;
  userImage: string;
  userName: string;
  date: string;
  likes: string[];
  comments: CommentModel[];
  onPostChange: () => void
};

const Post: React.FC<PostProps> = ({ postId, text, imgUrl, userImage, userName, date, likes, comments, onPostChange }) => {
  const [isEditPopupOpen, setIsEditPopupOpen] = useState<boolean>(false);
  const [isCommentViewOpen, setIsCommentViewOpen] = useState<boolean>(false);
  const [showAnimation, setShowAnimation] = useState(false);

  const { user } = useUser()
  const isLiked = useMemo(() => user?.username && likes.includes(user?._id), [user, likes]);

  const onClickLike = useCallback(async () => {
    const postChangeLikeMode = isLiked ? unlikePost : likePost;
    await postChangeLikeMode(postId);
    onPostChange();
    
    if(!isLiked) {
      setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 1000);
    }
  }, [setShowAnimation, isLiked, postId, onPostChange])

  const formatedDate = useMemo(() => new Date(date).toLocaleDateString(), [date]);
  const toggleEditPopUp = useCallback(() => setIsEditPopupOpen((prevState) => !prevState), [setIsEditPopupOpen]);
  const toggleCommentsPopUp = useCallback(() => setIsCommentViewOpen((prevState) => !prevState), [setIsCommentViewOpen]);

  const onEdit = useCallback(async (updatedPost: Partial<IPost>) => {
    await editPost(postId, updatedPost);
    onPostChange();
    toggleEditPopUp();
  }, [postId, onPostChange])

  const onDelete = useCallback(async () => {
    await deletePost(postId);
    onPostChange();
  }, [postId, onPostChange]);

  return (
    <Card className='card-wrapper' sx={{ minWidth: 400, minHeight: 400, boxShadow: 3 }}>
      <CardContent className='post-contnet-container'>
        <div className="post-contnet">
        <div className='top-bar'>
          <div className='right-side'>
            <img className='profile-photo' src={userImage} width={35} height={35} />
            <div className='sub-info'>
              <p>{userName}</p>
              <p className='sub-name'>@{userName.replace(/\s+/g, "")}</p>
            </div>
          </div>
          <p className='date'>{formatedDate} </p>
        </div>
        <h4>{text}</h4>
        <div className="post-img-wrapper">
          <img className='post-img' src={imgUrl} ></img>
          {showAnimation && <div className="like-animation"><FavoriteIcon className='like-icon' /></div>}
        </div>
        <Divider className='divider' variant="inset" />

        <div className='bottom-row'>
          <div className='left-side'>
            <p>{comments.length}</p>
            <span onClick={toggleCommentsPopUp}><CommentIcon/></span>
            <p>{likes.length}</p>
            <span onClick={onClickLike}><FavoriteIcon className={classNames({'liked-icon':isLiked})} /></span>
          </div>
          <div className='right-side'>
            <Button onClick={toggleEditPopUp} variant="contained" className='edit-button' > Edit</Button>
            <Button onClick={onDelete} variant="outlined" className='edit-button' color='error'> Delete</Button>

          </div>
        </div>
        <CommentsView isOpen={isCommentViewOpen} onSubmitComments={onPostChange} comments={comments} toggleIsOpen={toggleCommentsPopUp}/>
        <EditPostModal onSubmit={onEdit} isOpen={isEditPopupOpen} setIsOpen={setIsEditPopupOpen} defaultValues={{ text, image: imgUrl }} />
      
        </div>
        </CardContent>
    </Card>
  );
};

export default Post;
