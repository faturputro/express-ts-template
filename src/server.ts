import { Server } from '@overnightjs/core';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import Connection from './config/Connection';
import { APP_PORT } from './config/app.config';
import ControllerV1 from './controllers';
import response from './middlewares/response';

export default class App extends Server {
	constructor() {
		super(process.env.NODE_ENV === 'development');
		this.app.use(helmet());
		this.app.use(morgan('combined'));
		this.app.use(express.json({ limit: '10mb' }));
		this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));
		this.app.use(response);
		super.addControllers([new ControllerV1()]);
	}

	public start() {
		this.app.get('/ping', (_req, res) => res.send({ message: 'PONG' }));
		this.app.listen(APP_PORT, () =>
			console.log(`Listening on port: ${APP_PORT}`),
		);
		this.bootstrap();
	}

	private async bootstrap() {
		await Connection.getConnection().authenticate();
		console.log('Connected to DB!');
		Connection.getRedis();
	}
}
