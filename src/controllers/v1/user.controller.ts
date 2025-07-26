import { Request, Response } from 'express';
import { Controller, Get, Middleware, Post } from '@overnightjs/core';
import { IUserService, RegisterUserDTO } from '@/types/user';
import paginated from '@/middlewares/paginated';
import { logger } from '@/utils/logger';

@Controller('user')
export default class UserController {
	constructor(
		private readonly service: IUserService
	) {}

	@Get()
	@Middleware([paginated])
	protected async getUser(req: Request, res: Response) {
		try {
			const user = await this.service.getAll(req.query);
			return res.success(user);
		} catch (e) {
			logger.error('Error UserController.getUser: ', e);
			return res.failed(e);
		}
	}

	@Get(':id')
	protected async getDetail(req: Request<{ id: string }>, res: Response) {
		try {
			const user = await this.service.getDetail(Number(req.params.id));
			return res.success(user);
		} catch (e) {
			logger.error('Error UserController.getDetail: ', e);
			return res.failed(e);
		}
	}

	@Post()
	protected async create(req: Request<unknown, unknown, RegisterUserDTO>, res: Response) {
		try {
			console.log(req.body, '<----- body');
			const user = await this.service.create(req.body);
			return res.success(user);
		} catch (e) {
			return res.failed(e);
		}
	}
}
