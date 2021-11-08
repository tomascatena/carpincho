import products from '../data/products';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export const fetchProducts = (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({
    products,
  });
};
