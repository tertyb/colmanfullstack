import React from "react";
import './index.scss'

interface IProp {
    width: number;
    height: number;
    userImage: string
}

export const ProfilePhoto: React.FC<IProp> = ({width, height, userImage}: IProp) => {
    return <div className="profile-photo-container">
         <img className='profile-photo' src={userImage} width={width} height={height} />
    </div>
}
