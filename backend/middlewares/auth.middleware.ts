import JWT from 'jsonwebtoken';
import User from '../models/user.model';
import { Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';
import config from '../config/config';
import httpStatus from 'http-status';
import { RequestWithBody } from '../types/types';

export const protect = catchAsync(
  async (req: RequestWithBody, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    let token;

    if (authorization) {
      token = authorization.split(' ')[1];
      try {
        const { sub } = JWT.verify(token, config.JWT_SECRET);

        const user = await User.findById(sub).select('-password');

        if (user) {
          req.user = user;

          next();
        } else {
          res.status(httpStatus.UNAUTHORIZED).json({
            message: 'Invalid credentials',
          });
        }
      } catch (error) {
        res.status(httpStatus.UNAUTHORIZED);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
      }
    } else {
      res.status(httpStatus.UNAUTHORIZED).json({
        message: 'Invalid credentials',
      });
    }
  }
);
