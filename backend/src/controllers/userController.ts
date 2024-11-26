import { Request, Response, Router } from 'express';
import express from 'express';
import { getUserData } from '../services/authService';

export const userRouter = Router();

userRouter.get('/userData', async (req: Request, res: Response) => {
    try {
      const user = (req as express.Request & { user?: any }).user
      const userData = await getUserData(user.userId);
  
      res.json({ userData });
    } catch (error:any) {
      res.status(400).json({ message: error.message });
    }
  });
  