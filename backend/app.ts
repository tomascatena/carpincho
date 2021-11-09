import express from 'express';
import routes from './routes/v1';
import cors from 'cors';
import config from './config/config';
import { successHandler, errorHandler } from './config/morgan';

const app = express();

if (config.env !== 'test') {
  app.use(successHandler);
  app.use(errorHandler);
}

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());

// v1 api routes
app.use('/api/v1', routes);

export default app;
