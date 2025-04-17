import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, colorize } = format;

const customFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level}: ${message}`;
});

export const logger = createLogger({
  level: 'info',
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), colorize(), customFormat),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/app.log', level: 'info' }),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
  ],
});
