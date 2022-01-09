import { Request, Response } from 'express';
import httpStatus from 'http-status';
import Order from '../models/order.model';
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

// @desc    Get order by id
// @route   GET /api/v1/order/:orderId
// @access  Private
export const getOrderById = catchAsync(
  async (req: RequestWithBody, res: Response) => {
    if (req.user) {
      const order = await Order.findById(req.params.orderId).populate(
        'user',
        'name email'
      );

      if (order) {
        res.status(httpStatus.OK).json({
          order,
        });
      } else {
        res.status(httpStatus.NOT_FOUND);
        throw new Error('Order not found');
      }
    } else {
      res.status(httpStatus.UNAUTHORIZED).json({
        message: 'Invalid credentials',
      });
    }
  }
);
