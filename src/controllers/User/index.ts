import { Request, Response } from 'express';
import { Controller, Get } from '@overnightjs/core';
import User from '@/models/User';

@Controller('user')
export default class UserController {
  @Get('')
  protected async getUser(req: Request, res: Response): Promise<Response | void> {
    try {
      const user = await User.findAll();

      return res.sendSuccess(user);
    } catch (e) {
      console.log(e);
      return res.failed();
    }
  }
}
