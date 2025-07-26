import { Request, Response } from 'express';
import { Controller, Get } from '@overnightjs/core';
import User from '@/models/User';

@Controller('user')
export default class UserController {
	@Get()
	protected async getUser(_req: Request, res: Response): Promise<Response | void> {
		try {
			const user = await User.findAll();

			return res.success(user);
		} catch (e) {
			return res.failed(e);
		}
	}
}
