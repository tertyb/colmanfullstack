import { Request, Response, Router } from 'express';
import express from 'express';

export const exractUserIdFromToken = (req: Request) => {
    const user: {userId: string} | undefined = (req as express.Request & { user?: {userId: string} }).user
    if(!user?.userId) throw new Error('authentication error')
    return user.userId;
}
