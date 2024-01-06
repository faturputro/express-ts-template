import User from '@/models/User';
import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';

@Controller('user')
export default class UserController {
	@Get('')
	protected async getUser(
		_req: Request,
		res: Response,
	): Promise<Response | void> {
		try {
			const user = await User.findAll();

			return res.sendSuccess(user);
		} catch (e) {
			console.log(e);
			return res.failed();
		}
	}
}
