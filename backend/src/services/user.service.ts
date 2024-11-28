import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model';
import { config } from '../config/config';
import PostModel from '../models/post.model';

export const userInfo = async (userName: string) => await UserModel.findOne({ userName });

export const userPosts = async (userId: string) =>  await PostModel.find({ userId })





