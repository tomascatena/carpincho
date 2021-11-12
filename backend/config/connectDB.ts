import config from './config';
import mongoose from 'mongoose';
import logger from './logger';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.MONGODB_URL);

    logger.info(
      `Connected to MongoDB: ${conn.connection.host}:${conn.connection.port}`
    );
  } catch (error) {
    logger.error(`Error: ${(error as Error).message}`);
  }
};
