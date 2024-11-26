import { Request, Response, Router } from 'express';
import { loginUser, registerUser } from '../services/authService';
import { IAuthTokens } from '../interfaces/auth';
const passport = require('passport')

export const authRouter = Router();


authRouter.post('/register', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const authTokens: IAuthTokens = await registerUser(username, password);
    res.status(201).json(authTokens);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

authRouter.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const authTokens: IAuthTokens = await loginUser(username, password);
    res.json(authTokens);
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
});

// authRouter.get('/google', async (req: Request, res: Response) => {
//   // try {
//       passport.authenticate('google', { scope: ['profile', 'email'] })
  
//   // } catch (error:any) {
//   //   res.status(400).json({ message: error.message });
//   // }
// });

// authRouter.get(
//   '/google/callback',
//   passport.authenticate('google', {
//     failureRedirect: '/login',
//   }),
//   (req, res) => {
//     res.redirect('http://localhost:3000/'); // Redirect after login
//   }
// );