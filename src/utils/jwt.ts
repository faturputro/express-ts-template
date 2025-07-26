import * as jose from 'jose';
import dayjs, { type ManipulateType } from 'dayjs';
import { APP_PKCS8_KEY } from '@/config/app.config';
import AppError from './AppError';
import { AppErrorCode } from '@/types/app';

type JWTClaim<T extends Record<string, unknown>> = { exp: number, iss: string, iat: number } & T;

const encryptor = async (payload: Record<string, unknown>, iss?: string, exp?: number, unit?: ManipulateType): Promise<string> => {
  const data = JSON.stringify({
    ...payload,
    iss: iss || 'admin',
    exp: exp ? dayjs().add(exp, unit || 'day').unix() : dayjs().add(1, unit || 'day').unix(),
    iat: dayjs().unix(),
  });

  const key = await jose.importPKCS8(String(APP_PKCS8_KEY), 'RSA-OAEP-256');

  const encrypted = await new jose.CompactEncrypt(new TextEncoder().encode(data))
    .setProtectedHeader({ alg: 'RSA-OAEP-256', enc: 'A256GCM' })
    .encrypt(key);

  return encrypted;
};

const decryptor = async <T extends Record<string, unknown>>(str: string, issuer: string): Promise<JWTClaim<T>> => {
  const key = await jose.importPKCS8(String(APP_PKCS8_KEY), 'RSA-OAEP-256');
  const { plaintext } = await jose.compactDecrypt(str, key);
  const decoded = JSON.parse(new TextDecoder().decode(plaintext));

  if (decoded.exp !== -1 && dayjs().unix() > decoded.exp) {
    throw new AppError({ code: AppErrorCode.SessionExpired, message: 'Token expired' });
  }

  if (decoded.iss !== issuer) {
    throw new AppError({ code: AppErrorCode.SessionExpired, message: 'Invalid token' });
  }

  return decoded as JWTClaim<T>;
};

export const encryptToken = async (payload: Record<string, unknown>, exp?: number, unit?: ManipulateType) => await encryptor({ ...payload }, undefined, exp, unit);
export const decryptToken = async <T extends Record<string, unknown>>(token: string) => await decryptor<T>(token, 'admin');

