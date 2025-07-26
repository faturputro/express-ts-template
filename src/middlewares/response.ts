import { UniqueConstraintError } from 'sequelize';
import type { NextFunction, Request, Response } from 'express';
import AppError from '@/utils/AppError';
import { t as i18n } from '@/utils/i18n';
import { DictPath, Locale, LocaleName } from '@/utils/i18n/type';
import { AppErrorCode } from '@/types/app';

type LocaleMessageType = DictPath<Locale> | {
  key: DictPath<Locale>,
  values: Record<string, string>
};

export default (req: Request, res: Response, next: NextFunction) => {
	const lang = (req.headers['accept-language']?.split(', ').pop() as LocaleName) ?? 'en-US';

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
      request_id: req.request_id,
      timestamp: req.timestamp,
      data: data || null,
    });
  };

	res.failed = (e: Error | unknown): Response => {
    if (e instanceof AppError) {
      let message = e.message;

      if (e.t) {
        message = i18n({
          key: (typeof e.t === 'string' ? e.t : e.t?.key),
          lang,
          values: (typeof e.t !== 'string' ? e.t.values : {}),
        });
      }

      if (e instanceof UniqueConstraintError) {
        return res.status(400).json({
          success: false,
          code: AppErrorCode.DuplicateUniqueResource,
          message: e.errors.map((err) => `${err.path} "${err.value} already exists"`).join(', '),
          request_id: req.request_id,
          timestamp: req.timestamp,
          data: null,
        });
      }

      switch (e.code) {
        case AppErrorCode.Unauthorized:
          return res.status(401).json({
            success: false,
            code: e.code,
            message,
            request_id: req.request_id,
            timestamp: req.timestamp,
            data: e.data || null,
          });
        case AppErrorCode.Forbidden:
          return res.status(403).json({
            success: false,
            code: e.code,
            message,
            request_id: req.request_id,
            timestamp: req.timestamp,
            data: e.data || null,
          });
        case AppErrorCode.TooManyRequests:
          return res.status(429).json({
            success: false,
            code: e.code,
            message,
            request_id: req.request_id,
            timestamp: req.timestamp,
            data: e.data || null,
          });
        case AppErrorCode.NotFound:
          return res.status(404).json({
            success: false,
            code: e.code,
            message,
            request_id: req.request_id,
            timestamp: req.timestamp,
            data: e.data || null,
          });
        default:
          return res.status(400).json({
            success: false,
            code: e.code,
            message,
            request_id: req.request_id,
            timestamp: req.timestamp,
            data: e.data || null,
          });
      }
    }

    return res.status(500).json({
      success: false,
      code: AppErrorCode.InternalServerError,
      request_id: req.request_id,
      timestamp: req.timestamp,
      message: i18n({ key: 'COMMON.INTERNAL_ERROR' }),
      data: null,
    });
  };

	return next();
};
