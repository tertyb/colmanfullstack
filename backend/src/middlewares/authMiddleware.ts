import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { IUser } from '../models/user';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): any  => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const userData = jwt.verify(token, config.JWT_SECRET);
    console.log('verified',JSON.stringify(userData) );
     
    (req as any).user = userData;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
