import React, { useCallback, useState } from "react";
import './index.scss'
import { ProfilePhoto } from "../../profile-photo";
import userProfileImage from '../../../assets/daniel.png';

interface IProp {
    onSubmit: (newComment: string) => void;
}

export const CommentInput: React.FC<IProp> = ({onSubmit}: IProp) => {
    const [newComment, setNewComment] = useState<string>("");

    const handleAddComment= useCallback(() => {
        if(newComment.trim().length) {
            onSubmit(newComment); 
            setNewComment('');  
        }
    },[setNewComment, newComment, onSubmit])

    return <div className="comment-input-container">
        <ProfilePhoto width={25} height={25} userImage={userProfileImage} />
         <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleAddComment}>Post</button>
    </div>
}