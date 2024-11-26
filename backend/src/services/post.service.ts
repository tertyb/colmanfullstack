import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model';
import { config } from '../config/config';

export const userPosts = async (userName: string) => await UserModel.findOne({ userName })


