import winston, { format } from 'winston';
import SQLiteTransport from './SQLiteTransport';
import { redactor } from '../redactor';
import context from '../context';
import { ContextKey } from '@/types/enums';

const redactFormat = format((info) => {
  const requestId = context.get(ContextKey.RequestID);
  const timestamp = context.get(ContextKey.Timestamp);

  info.request_id = requestId;
  info.timestamp = timestamp;

  info = redactor(info) as winston.Logform.TransformableInfo;
  return info;
});

const DEV_MODE = process.env.NODE_ENV === 'development';

export const logger = winston.createLogger({
  level: 'info',
  transports: [
    ...(!DEV_MODE ? [new SQLiteTransport({ dbPath: 'logs/logs.db' })] : []),
    ...(DEV_MODE ?
      [
        new winston.transports.Console({
          format: format.combine(
            redactFormat(),
            format.colorize(),
            format.json({
              space: 2,
            }),
          ),
        })
      ] :
      []),
  ],
});
