import { Request, Response, Router } from 'express';
import express from 'express';
import { getUserData } from '../services/authService';
import { commentOnPost, createPost, likePost } from '../services/post.service';

export const postRouter = Router();


/**
 * 
 *  need to valide that userid is the real user id (do it from jwt)
 */

postRouter.post('/:userid/create', async (req: Request, res: Response) => {
  try {
    if (req?.params?.userid) {
      const userId = req.params.userid;
      const { text, image } = req.body;
      const createPostStatus = await createPost(userId, text, image);

      res.json({ createPostStatus });
    } else {
      throw new Error('userid  not provided')
    }

  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

postRouter.post('/:userid/:postid/comment', async (req: Request, res: Response) => {
  try {
    if (req?.params?.userid && req?.params?.postid) {
      const userId = req.params.userid;
      const postid = req.params.postid;

      const { text } = req.body.commentInformation;
      const updatePostStatus = await commentOnPost(userId, postid, text);

      res.json({ updatePostStatus });

    } else {
      throw new Error('userid or postid not provided')
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});


postRouter.post('/:userid/:postid/like', async (req: Request, res: Response) => {
  try {

    if (req?.params?.userid && req?.params?.postid) {
      const userId = req?.params?.userid;
      const postid = req.params.postid;
      const { text } = req.body.commentInformation;

      const updatePostStatus = await likePost(userId, postid);

      res.json({ updatePostStatus });
    } else {
      throw new Error('userid or postid not provided')
    }

  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }

});

postRouter.post('/:userid/:postid/unlike', async (req: Request, res: Response) => {
  try {

    if (req?.params?.userid && req?.params?.postid) {
      const userId = req?.params?.userid;
      const postid = req.params.postid;
      const { text } = req.body.commentInformation;

      // change to unlike
      const updatePostStatus = await likePost(userId, postid);

      res.json({ updatePostStatus });
    } else {
      throw new Error('userid or postid not provided')
    }

  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }

});




