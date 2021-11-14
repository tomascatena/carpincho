import { errorRequestLogger, successRequestLogger } from './config/morgan';
import { notFound, errorHandler } from './middlewares/error.middleware';
import express from 'express';
import routes from './routes/v1';
import cors from 'cors';
import config from './config/config';
import morgan from 'morgan';
import { LoggerStream } from './config/logger';

const app = express();

if (config.NODE_ENV !== 'test') {
  app.use(successRequestLogger);
  app.use(errorRequestLogger);
}

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());

// write request information from morgan with the winston logger
app.use(morgan('combined', { stream: new LoggerStream() }));

// v1 api routes
app.use('/api/v1', routes);

// Fallback for not found requests
app.use(notFound);

// Error handler for failed requests
app.use(errorHandler);

export default app;
