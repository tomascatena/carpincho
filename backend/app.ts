import express from 'express';
import routes from './routes/v1';
import cors from 'cors';

const app = express();

// enable cors
app.use(cors());

// v1 api routes
app.use('/api/v1', routes);

export default app;
