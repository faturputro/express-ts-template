import { AppErrorCode } from './../types/app';
import type { DictPath, Locale } from './i18n/type';

interface AppErrorOptions {
  message?: string;
  code?: AppErrorCode;
  data?: unknown | null;
  /**
   * Perform localization `t`.
   *
   * - keyof localization key
   * - If `t` is an object, will return value from dictionary with value injected into the string template.
   *
   * @param {string | Object} t - The input value, either a string or an object.
   */
  t?: DictPath<Locale> | {
    key: DictPath<Locale>,
    values: Record<string, string>
  };
}

export default class AppError extends Error {
  message: string;
  code?: AppErrorCode;
  data?: unknown;
  t?: DictPath<Locale> | {
    key: DictPath<Locale>,
    values: Record<string, string>
  };

  constructor({ message, code, data, t }: AppErrorOptions) {
    super();
    this.message = message || 'Something went wrong...';
    this.code = code || AppErrorCode.InternalServerError;
    this.data = data;
    this.t = t;
  }
}
