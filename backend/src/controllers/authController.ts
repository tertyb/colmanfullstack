import { Request, Response, Router } from 'express';
import { registerUser, loginUser, generateRefreshToken } from '../services/authService';

export const authRouter = Router();

authRouter.post('/register', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const newUser = await registerUser(email, password);
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

authRouter.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const token = await loginUser(email, password);
    const refreshToken = generateRefreshToken(req.body.email);
    res.json({ token, refreshToken });
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
});
