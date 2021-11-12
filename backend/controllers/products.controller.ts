import { Request, Response } from 'express';
import httpStatus from 'http-status';
import Product from '../models/product.model';
import { productsService } from '../services';
import { catchAsync } from '../utils/catchAsync';

export const getProducts = catchAsync(async (req: Request, res: Response) => {
  const products = await productsService.getAllProducts();

  res.status(httpStatus.OK).json({
    products,
  });
});

export const getSingleProduct = catchAsync(
  async (req: Request, res: Response) => {
    const product = await productsService.getProductById(req.params.productId);

    if (product) {
      res.status(httpStatus.OK).json({
        product,
      });
    } else {
      res.status(httpStatus.NOT_FOUND).json({
        message: 'Product not found',
      });
    }
  }
);
