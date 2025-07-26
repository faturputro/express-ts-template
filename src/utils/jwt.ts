import * as jwt from 'jsonwebtoken';

type JWTClaim<T> = {
  data: T
  iat: number
  exp: number
  iss: string
}

export const signJwt = (payload: Record<string, unknown>, expireTime?: string | number): string => {
  return jwt.sign({ data: payload }, process.env.JWT_SECRET as jwt.Secret, {
    expiresIn: expireTime || '1d',
    issuer: process.env.JWT_ISSUER,
  });
}

export const verifyJwt = <T extends Record<string, unknown>>(token: string): JWTClaim<T> => {
  const decoded = jwt.verify(String(token), process.env.JWT_SECRET as jwt.Secret, {
    ignoreExpiration: false,
    issuer: process.env.JWT_ISSUER,
  });

  return decoded as JWTClaim<T>;
}
