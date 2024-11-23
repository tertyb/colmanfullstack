import express, { Request, Response } from 'express';
import cors from 'cors'
import { config } from './config/config';
import dotenv from 'dotenv'
import { authRouter } from './controllers/authController';
import connectDB from './config/db';

const app = express();
const PORT = config.PORT;

app.use(express.json());

dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());

connectDB()

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.use('/api/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
