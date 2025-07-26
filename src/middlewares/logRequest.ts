import type { Request, Response, NextFunction } from 'express';
import { v7 as uuidv7 } from 'uuid';
import { logger } from '@/utils/logger';

export default (req: Request, _res: Response, next: NextFunction) => {
  const requestId = uuidv7();
  const timestamp = new Date().toISOString();

  req.request_id = requestId;
  req.timestamp = timestamp;

  if (process.env.NODE_ENV !== 'development') {
    logger.info(`${req.method} ${req.path}`, {
      request_id: requestId,
      timestamp,
      headers: req.headers,
      ...(Object.keys(req.body).length ? { body: req.body } : {}),
      ...(Object.keys(req.query).length ? { query: req.query } : {}),
      ...(Object.keys(req.params).length ? { params: req.params } : {}),
    });
  }

  return next();
};
