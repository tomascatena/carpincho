import { NextFunction, Request, Response } from 'express';
import { body, validationResult, header } from 'express-validator';
import httpStatus from 'http-status';
import { optional } from 'joi';
import config from '../config/config';

export const loginUser = [
  body('email').isEmail().normalizeEmail(),
  body('password')
    .notEmpty()
    .trim()
    .escape()
    .isLength({ min: config.MIN_PASSWORD_LENGTH }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: 'Invalid email or password',
        ...(config.NODE_ENV === 'development' && { errors: errors.mapped() }),
      });
    }

    next();
  },
];

export const registerNewUser = [
  body('name').notEmpty().isString().trim().isLength({ min: 2 }).escape(),
  body('email').isEmail().normalizeEmail(),
  body('password')
    .not()
    .isEmpty()
    .trim()
    .isLength({ min: config.MIN_PASSWORD_LENGTH })
    .escape(),
  body('confirmPassword')
    .not()
    .isEmpty()
    .trim()
    .isLength({ min: config.MIN_PASSWORD_LENGTH })
    .escape(),
  (req: Request, res: Response, next: NextFunction) => {
    const { password, confirmPassword } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: 'Missing required fields',
        errors: errors.mapped(),
      });
    } else if (password !== confirmPassword) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: 'Passwords must match',
      });
    }

    next();
  },
];

export const getUserProfile = [
  header('authorization').notEmpty().trim(),
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
        ...(config.NODE_ENV === 'development' && { errors: errors.mapped() }),
      });
    }

    next();
  },
];

export const updateProfile = [
  body('name').optional().isString().trim().isLength({ min: 2 }).escape(),
  body('email').optional().isEmail().normalizeEmail(),
  body('password')
    .optional()
    .trim()
    .isLength({ min: config.MIN_PASSWORD_LENGTH })
    .escape(),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: 'Missing required fields',
        errors: errors.mapped(),
      });
    }

    next();
  },
];
