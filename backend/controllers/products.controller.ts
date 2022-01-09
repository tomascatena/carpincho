import { Request, Response } from 'express';
import httpStatus from 'http-status';
import Product from '../models/product.model';
import { catchAsync } from '../utils/catchAsync';

// @desc    Fetch all products
// @route   GET /api/v1/products
// @access  Public
export const getProducts = catchAsync(async (req: Request, res: Response) => {
  const products = await Product.find({});

  res.status(httpStatus.OK).json({
    products,
  });
});

// @desc    Fetch product by id
// @route   GET /api/v1/products/:productId
// @access  Public
export const getSingleProduct = catchAsync(
  async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.productId);

    if (product) {
      res.status(httpStatus.OK).json({
        product,
      });
    } else {
      res.status(httpStatus.NOT_FOUND);
      throw new Error('Product not found');
    }
  }
);
