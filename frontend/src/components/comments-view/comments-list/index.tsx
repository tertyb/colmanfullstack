import React, { useMemo } from "react";
import { CommentModel } from "../../../interfaces/post";
import './index.scss'
import { ProfilePhoto } from "../../profile-photo";
import { formatDate } from "../../../utils/functions/date";
import { baseURL } from "../../../services/axios/AxiosInstance";


interface IProp {
    comments: CommentModel[];
}

export const CommentsList: React.FC<IProp> = ({ comments }: IProp) => {
    return <div className="comments-container">
        {comments.length > 0 ? (
            comments.map((comment, index) => (
                <CommentRow key={index} comment={comment}/>
            ))
        ) : (
            <p className="no-comments">No comments yet. Be the first!</p>
        )}
    </div>
}

interface ICommentRowProp {
    comment: CommentModel
}
const CommentRow: React.FC<ICommentRowProp> = ({ comment }: ICommentRowProp) => {
    const formatedDate = useMemo(() => formatDate(new Date(comment.date)), [comment])

    return <div className="comment">
        <div className="comment-data-with-profile">
        <ProfilePhoto width={20} height={20} userImage={comment.image}/>
        <div className="comment-info">
            <span className="username">@{comment.username}</span>
            <span className="text">{comment.text}</span>
        </div>
        </div>

        <span>{formatedDate}</span>
    </div>
}