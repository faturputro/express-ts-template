import crypto from 'crypto';
import { ENCRYPTION_SECRET } from '@/config/app.config';

const algorithm = 'aes-256-ctr';
const secretKey = ENCRYPTION_SECRET;
const iv = crypto.randomBytes(16);

export interface Hash {
  iv: string;
  content: string;
}

export const encrypt = (text: string): Hash => {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return {
    iv: iv.toString('hex'),
    content: encrypted.toString('hex')
  };
};

export const decrypt = (hash: Hash): string => {
  const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));
  const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);

  return decrpyted.toString();
};

// biome-ignore lint/complexity/noBannedTypes : next-line
export function md5Object(obj: Object) {
  const json = JSON.stringify(obj);
  return crypto.createHash('md5').update(json).digest('hex');
}
