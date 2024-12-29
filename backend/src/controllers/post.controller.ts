import { Request, Response } from 'express';
import { IPost } from '../models/post.model';
import { PostService } from '../services/post.service';
import { exractUserIdFromToken } from '../utils/user.util';
import { BaseController } from './base.controller';


export class PostController extends BaseController<IPost, PostService> {
  constructor() {
    super(new PostService());
  }

  async like(req: Request, res: Response) {
    this.changeLikeMode(req, res, true)
  }

  async unlike(req: Request, res: Response) {
    this.changeLikeMode(req, res, false)
  }

  private async changeLikeMode(req: Request, res: Response, isLiked: boolean) {
    try {
      if (req?.params?.postid) {

        const postid = req.params.postid;

        const userId = exractUserIdFromToken(req);

        const updatePostStatus = await this.service.changeLikeMode(userId, postid, isLiked);

        res.json(updatePostStatus);

      } else {
        throw new Error('postid not provided')
      }
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async allPosts(req: Request, res: Response) {
    try {

      const posts = await this.service.getAll();
      res.json(posts);

    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export const postController = new PostController();

