import { Router } from "express";
import { postController } from "../controllers/post.controller";

export const postRouter = Router();

postRouter.post('/:postid/like', postController.like.bind(postController));
postRouter.post('/:postid/unlike', postController.unlike.bind(postController));
postRouter.delete('/:id', postController.deleteById.bind(postController));
postRouter.post('/create', postController.create.bind(postController));
postRouter.get('/all', postController.allPosts.bind(postController));
postRouter.put('/update', postController.update
    .bind(postController));
