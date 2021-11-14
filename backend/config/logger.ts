import { format, createLogger, transports } from 'winston';
import 'winston-daily-rotate-file';
import config from './config';

const { combine, timestamp, printf, colorize, uncolorize, splat } = format;

const enumerateErrorFormat = format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const customFormat = combine(
  config.NODE_ENV === 'development' ? colorize() : uncolorize(),
  enumerateErrorFormat(),
  timestamp(),
  splat(),
  printf(({ level, message, timestamp }) => {
    return `[${timestamp}] ${level}: ${message}`;
  })
);

const logger = createLogger({
  exitOnError: false,
  transports: [
    new transports.Console({
      handleExceptions: true,
      level: config.NODE_ENV === 'development' ? 'debug' : 'info',
      format: customFormat,
      stderrLevels: ['error'],
    }),
    new transports.DailyRotateFile({
      format: combine(customFormat, uncolorize()),
      filename: 'logs/error/error-%DATE%.log',
      level: 'error',
    }),
    new transports.DailyRotateFile({
      format: combine(customFormat, uncolorize()),
      filename: 'logs/activity/activity-%DATE%.log',
      level: 'info',
    }),
  ],
});

export class LoggerStream {
  write(message: string) {
    logger.info(message.substring(0, message.lastIndexOf('\n')));
  }
}

export default logger;
