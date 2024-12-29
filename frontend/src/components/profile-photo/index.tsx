import React, { useMemo } from "react";
import './index.scss'
import defaultUser from '../../assets/default-avatar-icon.jpg'
import { baseURL } from "../../services/axios/AxiosInstance";

interface IProp {
    width: number;
    height: number;
    userImage?: string;
    classnames?: string;
    ObjectUrl?: boolean
}

export const ProfilePhoto: React.FC<IProp> = ({ width, height, userImage, classnames, ObjectUrl = false }: IProp) => {
    const imageSrc = useMemo(() => {
        if (!userImage) return defaultUser;
        if (ObjectUrl) return userImage;
        return `${baseURL}/uploads/${userImage}`
    }, [ObjectUrl, userImage])
    
    return <div className={`profile-photo-container ${classnames}`}>
        <img className='profile-photo' src={imageSrc} width={width} height={height} />
    </div>
}
