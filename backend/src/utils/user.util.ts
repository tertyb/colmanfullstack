import { Request, Response, Router } from 'express';
import express from 'express';
import { getUserData } from '../services/authService';

export const validateUserJwt = async (req: Request, userId: string) => {

    const user = (req as express.Request & { user?: any }).user
    const userData = await getUserData(user.userId);
    return userData.id === userId;

}
