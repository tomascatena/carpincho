import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import config from '../config/config';

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not found - ${req.originalUrl}`);

  res.status(httpStatus.NOT_FOUND);

  next(error);
};

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorStatusCode =
    res.statusCode === httpStatus.OK
      ? httpStatus.INTERNAL_SERVER_ERROR
      : res.statusCode;

  return res.status(errorStatusCode).json({
    message: err.message,
    stack: config.NODE_ENV === 'production' ? null : err.stack,
  });
};
