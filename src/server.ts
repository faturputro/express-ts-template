import { Server } from '@overnightjs/core'
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import response from './middlewares/response';
import { APP_PORT } from './config/app.config';

export default class App extends Server {
  constructor() {
    super(process.env.NODE_ENV === 'development');
    this.app.use(helmet());
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));
    this.app.use(response);
    super.addControllers([
      // new ControllerV1(),
    ])
  }

  public start() {
    this.app.listen(APP_PORT, () => console.log(`Listening on port: ${APP_PORT}`));
    this.bootstrap();
  }

  private async bootstrap() {
    // await initDB()
  }
};