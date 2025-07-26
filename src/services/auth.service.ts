import bcrypt from 'bcryptjs';
import { Redis } from 'ioredis';
import { AppErrorCode } from '@/types/app';
import { IAuthService, LoginDTO } from '@/types/auth';
import AppError from '@/utils/AppError';
import { encryptToken } from '@/utils/jwt';
import { IUserService } from '@/types/user';

export default class AuthService implements IAuthService {
  constructor(
    private readonly redis: Redis,
    private readonly userService: IUserService
  ) {}

  async login(dto: LoginDTO): Promise<{ token: string; }> {
    const user = await this.userService.getDetails({ email: dto.email });

    if (!user) {
      throw new AppError({ code: AppErrorCode.Unauthorized, t: 'COMMON.INVALID_LOGIN_CREDENTIALS' });
    }

    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) {
      throw new AppError({ code: AppErrorCode.Unauthorized, t: 'COMMON.INVALID_LOGIN_CREDENTIALS' });
    }

    const token = await encryptToken({ id: user.id, email: user.email }, 1, 'day');

    this.redis.set(`session:${user.id}`, JSON.stringify(user), 'EX', 3600 * 24);
    return { token };
  }

  async getProfile(userId: number) {
    const cache = await this.redis.get(`session:${userId}`);
    if (cache) return JSON.parse(cache);

    const result = await this.userService.getDetails({ id: userId });
    if (!result) {
      throw new AppError({
        code: AppErrorCode.DataNotFound,
        message: 'Account not found',
      });
    }

    return result;
  }

  logout(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}