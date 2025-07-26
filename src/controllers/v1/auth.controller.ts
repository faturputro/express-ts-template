import type { Request, Response } from 'express';
import { Controller, Get, Middleware, Post } from '@overnightjs/core';
import { IAuthService, LoginDTO } from '@/types/auth';
import { logger } from '@/utils/logger';
import { COOKIE_NAME } from '@/config/app.config';
import authenticated from '@/middlewares/authenticated';

@Controller('auth')
export default class AuthController {
  constructor(
    private readonly authService: IAuthService
  ) {}

  @Post('login')
  async login(req: Request<unknown, unknown, LoginDTO>, res: Response) {
    try {
      const token = await this.authService.login(req.body);
      res.set('Set-Cookie', `${COOKIE_NAME}=${token.token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24}; Secure=True;`);
      return res.success();
    } catch (e) {
      logger.error('Error AuthController.login: ', e);
      return res.failed(e);
    }
  }

  @Get('profile')
  @Middleware([authenticated])
  async profile(req: Request, res: Response) {
    try {
      const detail = await this.authService.getProfile(req.user.id);
      return res.success({
        id: detail.id,
        email: detail.email,
        name: detail.name,
        date_of_birth: detail.date_of_birth,
        gender: detail.gender,
        is_verified: detail.is_verified,
        role: detail.role,
        permissions: detail.permissions,
      });
    } catch (e) {
      logger.error('Error AuthController.login: ', e);
      return res.failed(e);
    }
  }
}
