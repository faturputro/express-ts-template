import winston, { format } from 'winston';
import SQLiteTransport from './SQLiteTransport';
import { redactor } from '../redactor';

const redactFormat = format((info) => {
  info = redactor(info) as winston.Logform.TransformableInfo;
  return info;
})

export const logger = winston.createLogger({
  level: 'info',
  transports: [
    ...(process.env.NODE_ENV !== 'development' ? [new SQLiteTransport({ dbPath: 'logs/logs.db' })] : []),
    ...(process.env.NODE_ENV === 'development' ?
      [
        new winston.transports.Console({
          format: format.combine(
            redactFormat(),
            format.colorize(),
            format.simple(),
          ),
        })
      ] :
      []),
  ],
});
