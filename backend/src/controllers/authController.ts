import { Request, Response, Router } from 'express';
import { loginUser, refreshUserToken, registerUser } from '../services/authService';
import { IAuthTokens } from '../interfaces/auth';
const passport = require('passport')

export const authRouter = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     description: registrer user
 *     parameters:
 *       - name: username
 *         in: body
 *         description: The user name
 *         required: true
 *         schema:
 *           type: string
 *           example: ilayhagever   
 *       - name: password
 *         in: body
 *         description: The user password
 *         required: true
 *         schema:
 *           type: string
 *           example: 123456   
 *     responses:
 *       201:
 *         description: user created
 *       400:
 *         description: problem creating user 
 */
authRouter.post('/register', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const authTokens: IAuthTokens = await registerUser(username, password);
    res.status(201).json(authTokens);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     description: user login
 *     parameters:
 *       - name: username
 *         in: body
 *         description: The user name
 *         required: true
 *         schema:
 *           type: string
 *           example: ilayhagever   
 *       - name: password
 *         in: body
 *         description: The user password
 *         required: true
 *         schema:
 *           type: string
 *           example: 123456   
 *     responses:
 *       200:
 *         description: sucsses login
 *       400:
 *         description: problem logging user 
 */
authRouter.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const authTokens: IAuthTokens = await loginUser(username, password);
    res.json(authTokens);
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
});




authRouter.post('/refresh', async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  try {
    const authTokens: IAuthTokens = await refreshUserToken(refreshToken);
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