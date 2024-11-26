import axios from "axios";
import React, { useEffect } from "react";
import { JsxElement } from "typescript";
import { useGetAutomaticUserData } from "../../services/userService";
import { useUser } from "../../contexts/userContext";
import { useNavigate } from "react-router-dom";

interface IProp {
    children: React.ReactNode;
}

export const LoginWrapper : React.FC<IProp> = ({children}: IProp) => {
    const authtoken = localStorage.getItem('accessToken')
    const {setUserData, user} = useUser();
    const {data, isLoading} = useGetAutomaticUserData(!user && authtoken ? authtoken : null);
    const navigate = useNavigate();

    useEffect( () => {
        if(!authtoken && !user) {
            navigate('/login')
        }
        else if(!user && data) {
            setUserData(data)
        }
      }, [data, authtoken, user, navigate, setUserData]);

    if(isLoading) return <p>is loading...</p>
    return <>{children}</>
}