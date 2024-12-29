import CommentIcon from '@mui/icons-material/Comment';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import classNames from 'classnames';
import React, { useCallback, useMemo, useState } from 'react';

import { useUser } from '../../contexts/userContext';
import { CommentModel, IPost } from '../../interfaces/post';
import { deletePost, editPost, likePost, unlikePost } from '../../services/postService';
import { CommentsView } from '../comments-view';
import EditPostModal from '../edit-post-model';
import './index.scss'; // Import the CSS styles for the navbar
import { ProfilePhoto } from '../profile-photo';
import { UpsertPost } from '../upsert-post';
import { PostPhoto } from '../post-photo';
import { formatDate } from '../../utils/functions/date';

type PostProps = {
  postId: string
  text: string;
  imgUrl: string;
  userImage?: string;
  userName: string;
  date: string;
  likes: string[];
  comments: CommentModel[];
  onPostChange: () => void
  isOwner: boolean
};

const Post: React.FC<PostProps> = ({ postId, text, imgUrl, userImage, userName, date, likes, comments, onPostChange, isOwner }) => {
  const [isEditPopupOpen, setIsEditPopupOpen] = useState<boolean>(false);
  const [isCommentViewOpen, setIsCommentViewOpen] = useState<boolean>(false);
  const [showAnimation, setShowAnimation] = useState(false);

  const { user } = useUser()
  const isLiked = useMemo(() => user?.username && likes.includes(user?._id), [user, likes]);

  const onClickLike = useCallback(async () => {
    const postChangeLikeMode = isLiked ? unlikePost : likePost;
    await postChangeLikeMode(postId);
    onPostChange();

    if (!isLiked) {
      setShowAnimation(true);
      setTimeout(() => setShowAnimation(false), 1000);
    }
  }, [setShowAnimation, isLiked, postId, onPostChange])

  const formatedDate = useMemo(() => formatDate( new Date(date)), [date]);
  const toggleEditPopUp = useCallback(() => setIsEditPopupOpen((prevState) => !prevState), [setIsEditPopupOpen]);
  const toggleCommentsPopUp = useCallback(() => setIsCommentViewOpen((prevState) => !prevState), [setIsCommentViewOpen]);

  const onEdit = useCallback(async (updatedPost: FormData) => {
    await editPost(updatedPost);
    onPostChange();
  }, [postId, onPostChange])

  const onDelete = useCallback(async () => {
    await deletePost(postId);
    onPostChange();
  }, [postId, onPostChange]);

  return (
    <Card className='card-wrapper' sx={{ minWidth: 400, minHeight: 400, boxShadow: 3 }}>
      <CardContent style={{paddingBottom: '16px', boxSizing: 'border-box'}} className='post-contnet-container'>
        <div className="post-contnet">
          <div className='top-bar'>
            <div className='right-side'>
              <ProfilePhoto userImage={userImage} width={35} height={35} />
              <div className='sub-info'>
                <p>{userName}</p>
                <p className='sub-name'>@{userName.replace(/\s+/g, "")}</p>
              </div>
            </div>
            <p className='date'>{formatedDate} </p>
          </div>
          <h4>{text}</h4>
          <div className="post-img-wrapper">
            <PostPhoto classnames='post-img' userImage={imgUrl} />
            {showAnimation && <div className="like-animation"><FavoriteIcon className='like-icon' /></div>}
          </div>
          <Divider className='divider' variant="inset" />

          <div className='bottom-row'>
            <div className='left-side'>
              <span>{comments.length}</span>
              <span onClick={toggleCommentsPopUp}><CommentIcon /></span>
              <span>{likes.length}</span>
              <span onClick={onClickLike}><FavoriteIcon className={classNames({ 'liked-icon': isLiked })} /></span>
            </div>
            {
              isOwner && <div className='right-side'>
              <EditIcon onClick={toggleEditPopUp}  className='button edit-button' />
              <DeleteIcon onClick={onDelete} className='button edit-button' />

            </div>
            }
            
          </div>
          <CommentsView postId={postId} isOpen={isCommentViewOpen} onSubmitComments={onPostChange} comments={comments} toggleIsOpen={toggleCommentsPopUp} />
          {/* <EditPostModal onSubmit={onEdit} isOpen={isEditPopupOpen} setIsOpen={setIsEditPopupOpen} defaultValues={{ text, image: imgUrl }} /> */}
          <UpsertPost postId={postId} onSave={onEdit} post={{text, image: imgUrl}}  toggleIsOpen={toggleEditPopUp} isOpen={isEditPopupOpen} />
        </div>
      </CardContent>
    </Card>
  );
};

export default Post;

