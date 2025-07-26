import { Server } from '@overnightjs/core';
import express from 'express';
import helmet from 'helmet';
import ControllerV1 from './controllers/v1';
import response from '@/middlewares/response';
import logRequest from '@/middlewares/logRequest';

export default class App extends Server {
	constructor() {
		super(process.env.NODE_ENV === 'development');
		this.app.use(helmet());
		this.app.use(express.json({ limit: '10mb' }));
		this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));
		this.app.use(logRequest);
		this.app.use(response);
		super.addControllers([new ControllerV1()]);

		this.start();
	}

	public start() {
		this.app.get('/healthcheck', (_req, res) => res.json({
			status: 'OK',
			env: process.env.NODE_ENV,
			version: require('../package.json').version,
			tag: process.env.APP_VERSION_HASH,
		}));
	}
}
