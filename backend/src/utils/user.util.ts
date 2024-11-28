import { Request, Response, Router } from 'express';
import express from 'express';
import { getUserData } from '../services/authService';

export const exractUserIdFromToken = async (req: Request) => {

    const user = (req as express.Request & { user?: any }).user
    const userData = await getUserData(user.userId);
    return userData.id ;

}
