import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { config } from './config';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI as string);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection failed:', err);
    process.exit(1);
  }
};

export default connectDB;
