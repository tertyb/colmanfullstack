import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): any  => {
  console.log('req.originalUrl', req.originalUrl);
  if(req.originalUrl.includes('api/auth')) {
    return next();
  } 
  console.log('passed');
  const token = req.headers['authorization']?.split(' ')[1] ;
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const userData = jwt.verify(token, config.JWT_SECRET);
    console.log(token);
    (req as Express.Request & { user?: any }).user = userData;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
