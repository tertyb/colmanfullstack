import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application } from 'express';
import mongoose from 'mongoose';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { config } from './config/config';
import { authMiddleware } from './middlewares/authMiddleware';
import { authRouter } from './routes/auth.route';
import { commentRouter } from './routes/comment.route';
import { postRouter } from './routes/post.route';
import { userRouter } from './routes/user.route';

const appPromise: Promise<Application> = new Promise( async (resolve, reject) => {

    const app = express();

    app.use(express.json());

    if (process.env.NODE_ENV == 'test') {
        dotenv.config({ path: '../.test.env' })
    } else {
        dotenv.config()
    }


    // Middleware
    app.use(cors());

    app.use('/api', authMiddleware);

    app.use('/api/auth', authRouter);
    app.use('/api/user', userRouter);
    app.use('/api/comment', commentRouter);
    app.use('/api/post', postRouter);

    try {
        await mongoose.connect(config.MONGO_URI as string);
        console.log('MongoDB connected');
      } catch (err) {
        console.error('MongoDB connection failed:', err);
        process.exit(1);
      }
      mongoose.set('bufferCommands', false);
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

    resolve(app)


})

export default appPromise


