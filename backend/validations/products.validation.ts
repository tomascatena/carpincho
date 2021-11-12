import { NextFunction, Request, Response } from 'express';
import { body, param } from 'express-validator';

export const getProductById = [param('productId').isMongoId()];
