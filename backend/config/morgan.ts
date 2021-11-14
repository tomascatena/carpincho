import morgan from 'morgan';
import config from './config';
import logger from './logger';
import { Request, Response } from 'express';

morgan.token(
  'message',
  (req: Request, res: Response) => res.locals.errorMessage || ''
);

const getIpFormat = () => {
  return config.NODE_ENV === 'production' ? ':remote-addr - ' : '';
};

const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

export const successRequestLogger = morgan(successResponseFormat, {
  skip: (req, res) => res.statusCode >= 400,
  stream: { write: (message) => logger.info(message.trim()) },
});

export const errorRequestLogger = morgan(errorResponseFormat, {
  skip: (req, res) => res.statusCode < 400,
  stream: { write: (message) => logger.error(message.trim()) },
});
