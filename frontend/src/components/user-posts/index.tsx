import React, { useCallback } from "react";
import userpost from '../../assets/userBack.jpg';
import { IPost } from "../../interfaces/post";
import { useGetUserPosts } from "../../services/postService";
import Post from "../post";
import './index.scss';

interface IProp {
    userid: string;
    userProfileImage?: string;
    username: string;
    isOwner: boolean;
}
export const UserPosts: React.FC<IProp> = ({ userid, userProfileImage, username,isOwner }: IProp) => {

    const { data, isLoading, mutate } = useGetUserPosts(userid);
    const onChangePost = useCallback(() => {
        mutate();
    }, [mutate])

    if (isLoading) return <></>
    return (<div className='posts'>
        {data?.map((post: IPost) => <Post isOwner ={isOwner} key={post._id} postId={post._id} text={post.text} imgUrl={post.image} userId={userid} userImage={userProfileImage} onPostChange={onChangePost} userName={username} date={post.date} likes={post.likes} comments={post.comments}></Post>)}
    </div>
    )
} 