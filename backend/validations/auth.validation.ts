import { NextFunction, Request, Response } from 'express';
import { body, validationResult, header } from 'express-validator';
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

export const getUserProfile = [
  header('authorization').not().isEmpty().trim(),
  (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    const JWTRegex = /(^[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*$)/;
    const isValidBearerJWT =
      authorization?.startsWith('Bearer') &&
      authorization.split(' ')[1].match(JWTRegex);

    const errors = validationResult(req);
    if (!errors.isEmpty() || !isValidBearerJWT) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        message: 'Invalid credentials',
      });
    }

    next();
  },
];
