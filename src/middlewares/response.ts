import { UniqueConstraintError } from 'sequelize';
import type { NextFunction, Request, Response } from 'express';
import AppError from '@/utils/AppError';
import { t as i18n } from '@/utils/i18n';
import { DictPath, Locale, LocaleName } from '@/utils/i18n/type';
import { AppErrorCode } from '@/types/app';
import { logger } from '@/utils/logger';
import context from '@/utils/context';
import { ContextKey } from '@/types/enums';

type LocaleMessageType = DictPath<Locale> | {
  key: DictPath<Locale>,
  values: Record<string, string>
};

export default (req: Request, res: Response, next: NextFunction) => {
	const lang = (req.headers['accept-language']?.split(', ').pop() as LocaleName) ?? 'en-US';
  const requestId = context.get(ContextKey.RequestID);
  const timestamp = context.get(ContextKey.Timestamp);

	res.success = (data?: unknown, message?: string, t?: LocaleMessageType): Response => {
    let msg = message;

    if (t) {
      msg = i18n({
        key: (typeof t === 'string' ? t : t?.key),
        lang,
        values: (typeof t !== 'string' ? t.values : {}),
      });
    } else {
      msg = i18n({ key: 'COMMON.REQUEST_SUCCESSFUL', lang });
    }

    return res.status(200).json({
      success: true,
      message: msg,
      request_id: requestId,
      timestamp,
      data: data || null,
    });
  };

	res.failed = (e: Error): Response => {
    if (e.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        success: false,
        code: AppErrorCode.DuplicateUniqueResource,
        message: (e as UniqueConstraintError).errors.map((err) => `${err.path} "${err.value} already exists"`).join(', '),
        request_id: requestId,
        timestamp,
        data: null,
      });
    }

    if (e instanceof AppError) {
      let message = e.message;

      if (e.t) {
        message = i18n({
          key: (typeof e.t === 'string' ? e.t : e.t?.key),
          lang,
          values: (typeof e.t !== 'string' ? e.t.values : {}),
        });
      }

      switch (e.code) {
        case AppErrorCode.Unauthorized:
          return res.status(401).json({
            success: false,
            code: e.code,
            message,
            request_id: requestId,
            timestamp,
            data: e.data || null,
          });
        case AppErrorCode.Forbidden:
          return res.status(403).json({
            success: false,
            code: e.code,
            message,
            request_id: requestId,
            timestamp,
            data: e.data || null,
          });
        case AppErrorCode.TooManyRequests:
          return res.status(429).json({
            success: false,
            code: e.code,
            message,
            request_id: requestId,
            timestamp,
            data: e.data || null,
          });
        case AppErrorCode.NotFound:
          return res.status(404).json({
            success: false,
            code: e.code,
            message,
            request_id: requestId,
            timestamp,
            data: e.data || null,
          });
        default:
          return res.status(400).json({
            success: false,
            code: e.code,
            message,
            request_id: requestId,
            timestamp,
            data: e.data || null,
          });
      }
    }

    logger.error(`${req.method} ${req.originalUrl}`, { stack: e.stack ?? null, request_id: requestId, timestamp });

    return res.status(500).json({
      success: false,
      code: AppErrorCode.InternalServerError,
      message: i18n({ key: 'COMMON.INTERNAL_ERROR' }),
      request_id: requestId,
      timestamp,
      data: null,
    });
  };

	return next();
};
