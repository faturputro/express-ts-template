import type { Request, Response, NextFunction } from 'express';
import { v7 as uuidv7 } from 'uuid';
import { logger } from '@/utils/logger';
import { DEV_MODE } from '@/config/app.config';
import context from '@/utils/context';
import { ContextKey } from '@/types/enums';

export default (req: Request, _res: Response, next: NextFunction) => {
  const requestId = uuidv7();
  const timestamp = new Date().toISOString();

  context.set(ContextKey.RequestID, requestId);
  context.set(ContextKey.Timestamp, timestamp);

  if (DEV_MODE) {
    logger.info(`${req.method} ${req.path}`, {
      request_id: requestId,
      timestamp,
      headers: req.headers,
      ...(Object.keys(req.body).length ? { body: {...req.body} } : {}),
      ...(Object.keys(req.query).length ? { query: {...req.query} } : {}),
      ...(Object.keys(req.params).length ? { params: {...req.params} } : {}),
    });
  }

  return next();
};
