import { Request, Response, Router } from 'express';
import express from 'express';

export const exractUserIdFromToken = (req: Request) => {
    const user: {_id: string} | undefined = (req as express.Request & { user?: {_id: string} }).user
    if(!user?._id) throw new Error('authentication error')
    return user._id;
}
