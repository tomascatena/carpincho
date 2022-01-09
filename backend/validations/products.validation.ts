import { NextFunction, Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';
import httpStatus from 'http-status';

export const getProductById = [
  param('productId').isMongoId(),
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
