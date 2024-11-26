import { Request, Response, Router } from 'express';
import express from 'express';
import { getUserData } from '../services/authService';
import { userPosts } from '../services/user.service';

export const userRouter = Router();

userRouter.get('/data', async (req: Request, res: Response) => {
  try {
    const user = (req as express.Request & { user?: any }).user
    const userData = await getUserData(user.userId);

    res.json({ userData });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

userRouter.get('/:userid/posts', async (req: Request, res: Response) => {
  try {
    if (req?.params?.userid) {
      const userid = req.params.userid;
      const posts = await userPosts(userid);
      
      res.json({ posts });

    } else {
      throw new Error('userid not provided')
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});
