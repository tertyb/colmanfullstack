import { Router } from "express";
import { authController } from "../controllers/auth.controller";

export const authRouter = Router();
authRouter.post('/register',authController.register.bind(authController));
authRouter.post('/login',authController.login.bind(authController));
authRouter.post('/logout',authController.logout.bind(authController));
authRouter.post('/refresh',authController.refresh.bind(authController));

