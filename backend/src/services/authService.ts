import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user';
import { config } from '../config/config';

export const registerUser = async (email: string, password: string) => {
  console.log('first')
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('second')
  const newUser = new UserModel({ email, password: hashedPassword, name:'daniel', image:'' });
  await newUser.save();
  return newUser;
};

export const loginUser = async (email: string, password: string) => {
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error('User not found');

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error('Invalid password');

  const token = jwt.sign({ userId: user._id }, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRATION  });
  return token;
};

export const generateRefreshToken = (userId: string) => {
  const refreshToken = jwt.sign({ userId }, config.JWT_SECRET, { expiresIn: '7d' });
  return refreshToken;
};
