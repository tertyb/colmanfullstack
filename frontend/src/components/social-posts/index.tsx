import { CircularProgress } from "@mui/material";
import React, { useCallback } from "react";
import { useUser } from "../../contexts/userContext";
import { IPostWithUser } from "../../interfaces/post";
import { useGetFeedPosts } from "../../services/postService";
import Post from "../post";
import './index.scss'


export const SocialPosts:React.FC = () => {
    
    const {data, isLoading, mutate} = useGetFeedPosts();
    const {user} = useUser()
    const onPostChange = useCallback(() => {
        mutate();
    },[mutate])

    if(isLoading) return <CircularProgress/>

    return (
        <div className="feed-posts">
            {
                data?.map(((post: IPostWithUser) => <Post key={post._id} postId={post._id} isOwner={user?._id === post.userId} text={post.text} imgUrl={post.image} userImage={post.postUserImage} onPostChange={onPostChange} userName={post.postUsername} date={post.date} likes={post.likes} comments={post.comments}></Post>)) 
            }
        </div>
    )
}
