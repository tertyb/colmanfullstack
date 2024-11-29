import { Request, Response, Router } from 'express';
import express from 'express';
import { getUserData } from '../services/authService';
import { allPosts, commentOnPost, createPost, deletePost, likePost, postOwner, unlikePost, updatePost } from '../services/post.service';
import { exractUserIdFromToken } from '../utils/user.util';

export const postRouter = Router();

/**
 * @swagger
 * /post/create:
 *   post:
 *     description: create post
 *     parameters:
 *       - name: text
 *         in: body
 *         description: The post text
 *         required: true
 *         schema:
 *           type: string
 *           example: wow this was so fun! 
 *       - name: image
 *         in: body
 *         description: The post image
 *         required: true
 *         schema:
 *           type: string
 *           example: image.png 
 *     responses:
 *       200:
 *         description: created post 
 *       400:
 *         description: problem creating post  
 */
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

/**
 * @swagger
 * /post/all:
 *   get:
 *     description: create post
 *     responses:
 *       200:
 *         description: all posts in the system 
 *       400:
 *         description: problem fetching all posts  
 */
postRouter.get('/all', async (req: Request, res: Response) => {
  try {
    const posts = await allPosts();

    res.json({ posts });

  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /post/:postid/comment:
 *   post:
 *     description: commenting on a post
 *     parameters:
 *       - name: postid
 *         in: params
 *         description: The post id
 *         required: true
 *         schema:
 *           type: string
 *           example: 674873f5e5dd3a35f95ab87a 
 *       - name: text
 *         in: body
 *         description: The post text
 *         required: true
 *         schema:
 *           type: string
 *           example: wow this was so fun! 
 *     responses:
 *       200:
 *         description: sucssesfully commented on post 
 *       400:
 *         description: problem commenting on post
 */
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


/**
 * @swagger
 * /post/:postid/like:
 *   post:
 *     description: liking a post
 *     parameters:
 *       - name: postid
 *         in: params
 *         description: The post id
 *         required: true
 *         schema:
 *           type: string
 *           example: 674873f5e5dd3a35f95ab87a 
 *     responses:
 *       200:
 *         description: sucssesfully liked post 
 *       400:
 *         description: problem liking on post
 */
postRouter.post('/:postid/like', async (req: Request, res: Response) => {
  try {
    if (req?.params?.postid) {

      const postid = req.params.postid;

      const userId = await exractUserIdFromToken(req);


      const updatePostStatus = await likePost(userId, postid);

      res.json({ message: updatePostStatus });

    } else {
      throw new Error('postid not provided')
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});


/**
 * @swagger
 * /post/:postid/unlike:
 *   post:
 *     description: unliking a post
 *     parameters:
 *       - name: postid
 *         in: params
 *         description: The post id
 *         required: true
 *         schema:
 *           type: string
 *           example: 674873f5e5dd3a35f95ab87a 
 *     responses:
 *       200:
 *         description: sucssesfully unliked post 
 *       400:
 *         description: problem unliking on post
 */
postRouter.post('/:postid/unlike', async (req: Request, res: Response) => {
  try {
    if (req?.params?.postid) {

      const postid = req.params.postid;

      const userId = await exractUserIdFromToken(req);


      const { text } = req.body;
      const updatePostStatus = await unlikePost(userId, postid);

      res.json({ message: updatePostStatus });

    } else {
      throw new Error('postid not provided')
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});


/**
 * @swagger
 * /post/:postid/update:
 *   put:
 *     description: updating a post
 *     parameters:
 *       - name: postid
 *         in: params
 *         description: The post id
 *         required: true
 *         schema:
 *           type: string
 *           example: 674873f5e5dd3a35f95ab87a 
 *       - name: text
 *         in: body
 *         description: The new post text
 *         required: false
 *         schema:
 *           type: string
 *           example: wow this was so fun! 
 *       - name: image
 *         in: body
 *         description: The new post image
 *         required: false
 *         schema:
 *           type: string
 *           example: image.png 
 *     responses:
 *       200:
 *         description: sucssesfully updated post 
 *       400:
 *         description: problem updating post
 */
postRouter.put('/:postid/update', async (req: Request, res: Response) => {
  try {
    if (req?.params?.postid) {
      const userId = await exractUserIdFromToken(req);
      const postOwnerId = await postOwner(req?.params?.postid);

      if (postOwnerId !== userId) {
        throw new Error('the user is not the post owner, did not update')
      }

      const { text, image } = req.body;

      if (!text && !image) {
        throw new Error('no text or image provided')
      }

      const updateData: { text?: string, image?: string } = {};
      if (text) updateData.text = text;
      if (image) updateData.image = image;

      await updatePost(req?.params?.postid, updateData);

      const message = " 'Post updated successfully'";
      res.json({ message });
    } else {
      throw new Error('postId not provided')
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});


postRouter.delete('/:postid', async (req: Request, res: Response) => {
  try {
    if (req?.params?.postid) {

      const postid = req.params.postid;

      const userId = await exractUserIdFromToken(req);
      const postOwnerId = await postOwner(req?.params?.postid);

      if (postOwnerId !== userId) {
        throw new Error('the user is not the post owner, did not update')
      }

      const message = await deletePost(postid);

      res.json({ message });

    } else {
      throw new Error('postid not provided')
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});







