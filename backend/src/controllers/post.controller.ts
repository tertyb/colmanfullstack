import { Request, Response, Router } from 'express';
import express from 'express';
import { getUserData } from '../services/authService';
import { commentOnPost, createPost, likePost, unlikePost } from '../services/post.service';
import { validateUserJwt } from '../utils/user.util';

export const postRouter = Router();

postRouter.post('/:userid/create', async (req: Request, res: Response) => {
  try {

    if (req?.params?.userid) {
      const userId = req.params.userid;

      const validUserPreformingAction = await validateUserJwt(req, userId);
      if (!validUserPreformingAction) {
        throw new Error(`another user tried preforming an action behalf of ${userId}`);
      }

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

postRouter.post('/:postid/user/:userid/comment', async (req: Request, res: Response) => {
  try {
    if (req?.params?.userid && req?.params?.postid) {
      const userId = req.params.userid;
      const postid = req.params.postid;

      const validUserPreformingAction = await validateUserJwt(req, userId);
      if (!validUserPreformingAction) {
        throw new Error(`another user tried preforming an action behalf of ${userId}`);
      }

      const { text } = req.body;
      const updatePostStatus = await commentOnPost(userId, postid, text);

      res.json({ updatePostStatus });

    } else {
      throw new Error('userid or postid not provided')
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});


postRouter.post('/:postid/user/:userid/like', async (req: Request, res: Response) => {
  try {

    if (req?.params?.userid && req?.params?.postid) {
      const userId = req?.params?.userid;
      const postid = req.params.postid;

      const validUserPreformingAction = await validateUserJwt(req, userId);
      if (!validUserPreformingAction) {
        throw new Error(`another user tried preforming an action behalf of ${userId}`);
      }

      const updatePostStatus = await likePost(userId, postid);

      res.json({ updatePostStatus });
    } else {
      throw new Error('userid or postid not provided')
    }

  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }

});

postRouter.post('/:postid/user/:userid/unlike', async (req: Request, res: Response) => {
  try {

    if (req?.params?.userid && req?.params?.postid) {
      const userId = req?.params?.userid;
      const postid = req.params.postid;

      const validUserPreformingAction = await validateUserJwt(req, userId);
      if (!validUserPreformingAction) {
        throw new Error(`another user tried preforming an action behalf of ${userId}`);
      }
      
      const updatePostStatus = await unlikePost(userId, postid);

      res.json({ updatePostStatus });
    } else {
      throw new Error('userid or postid not provided')
    }

  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }

});





