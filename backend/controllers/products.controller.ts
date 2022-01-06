import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { productsService } from '../services';
import { catchAsync } from '../utils/catchAsync';

// @desc    Fetch all products
// @route   GET /api/v1/products
// @access  Public
export const getProducts = catchAsync(async (req: Request, res: Response) => {
  const products = await productsService.getAllProducts();

  res.status(httpStatus.OK).json({
    products,
  });
});

// @desc    Fetch product by id
// @route   GET /api/v1/products/:productId
// @access  Public
export const getSingleProduct = catchAsync(
  async (req: Request, res: Response) => {
    const product = await productsService.getProductById(req.params.productId);

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
