import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model';
import { config } from '../config/config';
import { IAuthTokens } from '../interfaces/auth';

export const registerUser = async (username: string, password: string): Promise<IAuthTokens> => {
  const existingUser = await UserModel.findOne({ username });
  if (existingUser) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({ username, password: hashedPassword, image: '' });
  await newUser.save();
  return generateAuthKeys(newUser.username, newUser._id);

};

export const loginUser = async (username: string, password: string):Promise<IAuthTokens> => {
  const user = await UserModel.findOne({ username });
  if (!user) throw new Error('User not found');

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error('Invalid password');

  return generateAuthKeys(user.username, user._id);
};

export const getUserData = async (id: string) => {
  const user = await UserModel.findOne({ _id: id });
  if (!user) throw new Error('User not found');
  return user
};

const generateAuthKeys = (username: string, userId: any): IAuthTokens => {
  const token = jwt.sign({ userId }, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRATION });
  const refreshToken = jwt.sign({ username }, config.JWT_SECRET, { expiresIn: '7d' });

  return { token, refreshToken }
} 
