import { Request, Response } from 'express';
import httpStatus from 'http-status';
import Order from '../models/order.model';
import { productsService } from '../services';
import { RequestWithBody } from '../types/types';
import { catchAsync } from '../utils/catchAsync';

// @desc    Create new order
// @route   POST /api/v1/order
// @access  Private
export const addOrderItems = catchAsync(
  async (req: RequestWithBody, res: Response) => {
    if (req.user) {
      const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      } = req.body;

      const order = new Order({
        user: req.user._id,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      const createdOrder = await order.save();

      res.status(httpStatus.OK).json({
        createdOrder,
      });
    } else {
      res.status(httpStatus.UNAUTHORIZED).json({
        message: 'Invalid credentials',
      });
    }
  }
);
