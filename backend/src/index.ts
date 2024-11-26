import express, { Request, Response } from 'express';
import cors from 'cors'
import { config } from './config/config';
import dotenv from 'dotenv'
import { authRouter } from './controllers/authController';
import connectDB from './config/db';
import { authMiddleware } from './middlewares/authMiddleware';
import { userRouter } from './controllers/userController';
import { postRouter } from './controllers/post.controller';
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');

const app = express();
const PORT = config.PORT;

app.use(express.json());

dotenv.config();

// Middleware
app.use(cors());

app.use(authMiddleware);
connectDB()

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/post', postRouter);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
