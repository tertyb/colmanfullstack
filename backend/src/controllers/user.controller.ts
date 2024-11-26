// import { Request, Response, Router } from 'express';
// import { userInfo } from '../services/user.service';

// export const userRouter = Router();

// userRouter.get('/info/:username', async (req: Request, res: Response) => {
//   const username = req.query.username;
//   try {
//     const userInformation = await userInfo(username as string);
//     res.status(201).json(userInformation);
//   } catch (error: any) {
//     res.status(400).json({ message: error.message });
//   }
// });

