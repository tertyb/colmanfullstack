import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user';
import { config } from '../config/config';

export const userInfo = async (userName: string) => await UserModel.findOne({ userName })


