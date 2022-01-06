import { NextFunction, Request, Response } from 'express';
import { body, validationResult, check } from 'express-validator';
import httpStatus from 'http-status';
import config from '../config/config';

export const addOrderItems = [
  body('orderItems')
    .isArray()
    .custom((value) => {
      if (!Array.isArray(value)) {
        throw new Error('orderItems must be an array');
      } else if (!value.length) {
        throw new Error('orderItems is empty');
      }

      return true;
    }),
  body('orderItems.*.product', 'product is required and must be a string')
    .exists()
    .isString()
    .escape(),
  body('orderItems.*.quantity', 'quantity is required and must be a number')
    .exists()
    .isNumeric()
    .escape(),
  body('orderItems.*.price', 'price is required and must be a number')
    .exists()
    .isNumeric()
    .escape(),
  body('orderItems.*.name', 'name is required and must be a string')
    .exists()
    .isString()
    .escape(),
  body('shippingAddress').isObject(),
  body('paymentMethod')
    .trim()
    .escape()
    .custom((value) => {
      if (!['PayPal', 'Stripe'].includes(value)) {
        throw new Error('Invalid payment method');
      }

      return true;
    }),

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
