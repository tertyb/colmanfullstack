import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { config } from './config/config';
import connectDB from './config/db';
import { authMiddleware } from './middlewares/authMiddleware';
import { commentRouter } from './routes/comment.route';
import { userRouter } from './routes/user.route';
import { authRouter } from './routes/auth.route';
import { postRouter } from './routes/post.route';


const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');

const app = express();
const PORT = config.PORT;

app.use(express.json());

dotenv.config();


// Middleware
app.use(cors());

app.use('/api',authMiddleware);

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/comment', commentRouter);
app.use('/api/post', postRouter);

connectDB()

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API with Swagger',
      version: '1.0.0',
      description: 'This is a simple Express API with Swagger documentation.',
    },
  },
  apis: ['./src/routes/*.ts'], 
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
