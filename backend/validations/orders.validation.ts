import { NextFunction, Request, Response } from 'express';
import { body, validationResult, check, param } from 'express-validator';
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
  body('orderItems.*.product', 'Product is required and must be a string')
    .exists()
    .isString()
    .escape(),
  body('orderItems.*.quantity', 'Quantity is required and must be a number')
    .exists()
    .isNumeric()
    .escape(),
  body('orderItems.*.price', 'Price is required and must be a number')
    .exists()
    .isNumeric()
    .escape(),
  body('orderItems.*.name', 'Name is required and must be a string')
    .exists()
    .isString()
    .escape(),
  body('orderItems.*.image', 'Image is required and must be a string')
    .exists()
    .isString()
    .escape(),
  body('shippingAddress').isObject(),
  body('shippingAddress.address', 'Address is required and must be a string')
    .exists()
    .isString()
    .escape(),
  body('shippingAddress.city', 'City is required and must be a string')
    .exists()
    .isString()
    .escape(),
  body(
    'shippingAddress.postalCode',
    'Postal code is required and must be a string'
  )
    .exists()
    .isString()
    .escape(),
  body('shippingAddress.country', 'Country is required and must be a string')
    .exists()
    .isString()
    .escape(),
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

export const getOrderById = [
  param('orderId').isMongoId().escape(),
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

export const updateOrderToPaid = [
  param('orderId').isMongoId().escape(),
  body('id', 'id is required and must be a string')
    .exists()
    .isString()
    .escape(),
  body('status', 'Status is required and must be a string')
    .exists()
    .isString()
    .escape(),
  body('update_time', 'update_time is required and must be a string')
    .exists()
    .isString()
    .escape(),
  body('payer').isObject(),
  body('payer.email_address', 'email_address is required and must be a string')
    .exists()
    .isString()
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
