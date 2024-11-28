import { Request, Response, Router } from 'express';
import express from 'express';
import { getUserData } from '../services/authService';
import { updateUser, userPosts } from '../services/user.service';
import { exractUserIdFromToken } from '../utils/user.util';

export const userRouter = Router();

/**
 * @swagger
 * /user/data:
 *   get:
 *     description: user information
 *     responses:
 *       200:
 *         description: the user information (id is taken for jwt acsses token)
 *       400:
 *         description: problem fetching user information 
 */
userRouter.get('/data', async (req: Request, res: Response) => {
  try {
    const user = (req as express.Request & { user?: any }).user
    const userData = await getUserData(user.userId);

    res.json({ userData });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /user/:userid/posts:
 *   get:
 *     description: user posts
 *     parameters:
 *       - name: userid
 *         in: params
 *         description: The user id
 *         required: true
 *         schema:
 *           type: string
 *           example: 674873f5e5dd3a35f95ab87a 
 *     responses:
 *       200:
 *         description: the user posts 
 *       400:
 *         description: problem fetching user posts  
 */
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


/**
 * @swagger
 * /user/update:
 *   put:
 *     description: user information
 *     parameters:
 *       - name: username
 *         in: body
 *         description: The new username
 *         required: false
 *         schema:
 *           type: string
 *           example: amithakem 
 *       - name: image
 *         in: body
 *         description: The new user image
 *         required: false
 *         schema:
 *           type: string
 *           example: newimg.png 
 *     responses:
 *       200:
 *         description: the user has been updated (id is taken for jwt acsses token)
 *       400:
 *         description: problem updating user  
 */
userRouter.put('/update', async (req: Request, res: Response) => {
  try {
    const userId = await exractUserIdFromToken(req);
    const { username, image } = req.body;

    if (!username && !image) {
      throw new Error('no username or image provided');
    }

    const updateData: { username?: string, image?: string } = {};
    if (username) updateData.username = username;
    if (image) updateData.image = image;

    await updateUser(userId, updateData);

    const message = " 'User updated successfully'";
    res.json({ message });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});
