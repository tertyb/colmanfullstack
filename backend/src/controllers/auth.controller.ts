import { Request, Response, Router } from 'express';
import { IAuthTokens } from '../interfaces/auth';
import { BaseController } from './base.controller';
import { IUser } from '../models/user.model';
import { AuthService } from '../services/auth.service';
const passport = require('passport')

export class AuthController extends BaseController<IUser, AuthService> {
  constructor() {
    super(new AuthService());
  }

  async register(req: Request, res: Response) {
    const { username, password, email} = req.body;
    try {
      const authTokens: IAuthTokens = await this.service.registerUser({username, password, email});
      res.status(201).json(authTokens);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response) {
    const { username, password} = req.body;
    try {
      const authTokens: IAuthTokens = await this.service.loginUser(username, password);
      res.status(201).json(authTokens);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async refresh(req: Request, res: Response) {
    const { refreshToken } = req.body;
    try {
      const authTokens: IAuthTokens = await this.service.refreshUserToken(refreshToken);
      res.json(authTokens);
    } catch (error:any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export const authController = new AuthController();

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
 *       - name: email
 *         in: body
 *         description: The user email
 *         required: true
 *         schema:
 *           type: string
 *           example: daniel@gmail.com
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