import { Request, Response, Router } from 'express';
import express from 'express';
import { getUserData } from '../services/authService';
import { allPosts, commentOnPost, createPost, likePost, unlikePost } from '../services/post.service';
import { exractUserIdFromToken } from '../utils/user.util';

export const postRouter = Router();

postRouter.post('/create', async (req: Request, res: Response) => {
  try {

      const userId = await exractUserIdFromToken(req);
      const { text, image } = req.body;
      const createPostStatus = await createPost(userId, text, image);

      res.json({ createPostStatus });
   

  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

postRouter.get('/all', async (req: Request, res: Response) => {
  try {
    const posts = await allPosts();

    res.json({ posts });

  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

postRouter.post('/:postid/comment', async (req: Request, res: Response) => {
  try {
    if (req?.params?.postid) {

      const postid = req.params.postid;

      const userId = await exractUserIdFromToken(req);


      const { text } = req.body;
      const updatePostStatus = await commentOnPost(userId, postid, text);

      res.json({ updatePostStatus });

    } else {
      throw new Error('postid not provided')
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});


postRouter.post('/:postid/like', async (req: Request, res: Response) => {
  try {
    if (req?.params?.postid) {

      const postid = req.params.postid;

      const userId = await exractUserIdFromToken(req);


      const { text } = req.body;
      const updatePostStatus = await likePost(userId, postid);

      res.json({ updatePostStatus });

    } else {
      throw new Error('postid not provided')
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});


postRouter.post('/:postid/unlike', async (req: Request, res: Response) => {
  try {
    if (req?.params?.postid) {

      const postid = req.params.postid;

      const userId = await exractUserIdFromToken(req);


      const { text } = req.body;
      const updatePostStatus = await unlikePost(userId, postid);

      res.json({ updatePostStatus });

    } else {
      throw new Error('postid not provided')
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});





