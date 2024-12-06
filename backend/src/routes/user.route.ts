import { Router } from "express";
import { userController } from "../controllers/user.controller";

export const userRouter = Router();

userRouter.get('/:userid/posts', userController.getUserPosts.bind(userController));
userRouter.get('/data', userController.userData.bind(userController));
userRouter.put('/update', userController.updateUser.bind(userController));
userRouter.post('/create', userController.create.bind(userController));
userRouter.delete('/:id', userController.deleteById.bind(userController));
