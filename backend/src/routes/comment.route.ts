import { Router } from "express";
import { commentController } from "../controllers/comment.controller";

export const commentRouter = Router();

commentRouter.post('/create',commentController.create.bind(commentController));
commentRouter.delete('/delete/:id',commentController.deleteById.bind(commentController));
commentRouter.get('/:id',commentController.getById.bind(commentController));
commentRouter.get('/post/:postid',commentController.CommentsByPostId.bind(commentController));
commentRouter.put('/update',commentController.update.bind(commentController));
