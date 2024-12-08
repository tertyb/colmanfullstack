import express, { Request, Response } from 'express';
import { IPost } from '../models/post.model';
import { IUser } from '../models/user.model';
import { UserService } from '../services/user.service';
import { exractUserIdFromToken } from '../utils/user.util';
import { BaseController } from './base.controller';

export class UserController extends BaseController<IUser, UserService> {

  constructor() {
    super(new UserService(), '_id');
  }

  override async create(req: Request, res: Response): Promise<void> {
    try {

      const message = await this.service.createUser(req.body);
      res.json(message)

    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getUserPosts(req: Request, res: Response) {
    try {
      if (req?.params?.userid) {
        const userid = req.params.userid;
        const posts: IPost[] = await this.service.getUserPosts(userid);

        res.json(posts);

      } else {
        throw new Error('userid not provided')
      }
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async userData(req: Request, res: Response) {
    try {
      const user = (req as express.Request & { user?: any }).user;
      const userData = await this.service.getById(user._id);

      res.json( userData );
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const userId = exractUserIdFromToken(req);
      const { username, image } = req.body;

      if (!username && !image) {
        throw new Error('no username or image provided');
      }

      const updateData: { username?: string, image?: string } = {};
      if (username) updateData.username = username;
      if (image) updateData.image = image;

      const message = await this.service.update(updateData, userId);

      res.json( message );

    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

}
export const userController = new UserController();

