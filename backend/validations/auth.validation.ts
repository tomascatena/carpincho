import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import httpStatus from 'http-status';

export const loginUser = [
  body('email').isEmail().normalizeEmail(),
  body('password').not().isEmpty().trim().escape().isLength({ min: 5 }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: 'Invalid email or password',
      });
    }

    next();
  },
];
