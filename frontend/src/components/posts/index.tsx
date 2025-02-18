import { Pagination } from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import { IPostWithUser } from "../../interfaces/post";
import Post from "../post";
import './index.scss';

const POST_PER_PAGE = 3;

interface IProp {
    userid: string;
    onPostChange: () => void;
    posts: IPostWithUser[];
    classname?: string
}
export const Posts: React.FC<IProp> = ({ userid, onPostChange, posts, classname }: IProp) => {
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastPost = useMemo(() => currentPage * POST_PER_PAGE, [currentPage]);
    const indexOfFirstPost = useMemo(() => indexOfLastPost - POST_PER_PAGE, [indexOfLastPost]);
    const currentPosts = useMemo(() => posts.slice(indexOfFirstPost, indexOfLastPost), [posts, indexOfFirstPost, indexOfLastPost]);

    const handlePageChange = useCallback((_event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    }, [setCurrentPage]);

    return (
        <div className={`posts ${classname ? classname : ''}`}>
            {currentPosts?.map((post: IPostWithUser) => <Post isAiGenerated={!post.userId} isOwner={post.userId === userid} key={post._id} postId={post._id} text={post.text} imgUrl={post.image} userImage={post.postUserImage} onPostChange={onPostChange} userName={post.postUsername ?? 'Ai-Generated'} date={post.date} userId={post.userId} likes={post.likes} comments={post.comments}></Post>)}
            <Pagination
                count={Math.ceil(posts.length / POST_PER_PAGE)}
                page={currentPage}
                onChange={handlePageChange}
                style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
            />
        </div>
    )
}