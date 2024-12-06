import dotenv from 'dotenv';

dotenv.config();

export const config: IConfig = {
    JWT_SECRET : process.env.JWT_SECRET || 'secret',
    REFRESH_SECRET : process.env.REFRESH_SECRET  || 'refresh_secret',
    JWT_EXPIRATION : process.env.JWT_EXPIRATION || '1h',
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/socialnet1',
    PORT: parseInt(process.env.PORT || '5000'),
}
interface IConfig {
    JWT_SECRET: string;
    REFRESH_SECRET: string;
    JWT_EXPIRATION: string; 
    MONGO_URI: string;
    PORT: number 
}