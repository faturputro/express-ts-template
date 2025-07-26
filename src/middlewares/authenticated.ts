import type { NextFunction, Request, Response } from 'express';
import Connection from '@/config/Connection';
import { decryptToken } from '@/utils/jwt';
import { AppErrorCode } from '@/types/app';
import AppError from '@/utils/AppError';
import { COOKIE_NAME } from '@/config/app.config';
import { logger } from '@/utils/logger';

const redis = Connection.Redis();
const err = new AppError({ code: AppErrorCode.Unauthorized, message: 'Unauthorized' });

export default async (req: Request, res: Response, next: NextFunction) => {
  if (req.cookies[COOKIE_NAME]) {
    try {
      const bearerToken = req.cookies[COOKIE_NAME];
      if (bearerToken) {
        const decrypted = await decryptToken<SessionClaim>(bearerToken);
        const cache = await redis.get(`session:${decrypted.id}`);
        if (!cache) {
          return res.failed(err);
        }

        req.user = JSON.parse(cache);
        return next();
      }

      return res.failed(err);
    } catch (e) {
      logger.error('Error in authenticated middleware:', e);
      return res.failed(e);
    }
  }
  return res.failed(err);
};
