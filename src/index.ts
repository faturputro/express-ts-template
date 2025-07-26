import * as dotenv from 'dotenv';
import http from 'node:http';

dotenv.config({ path: `${process.cwd()}/.env` });

import App from '@/server';
import Connection from './config/Connection';
import { APP_PORT } from './config/app.config';

const acquireConnections = async () => {
  const db = Connection.DB();
  await db.authenticate();

  const redis = Connection.Redis();
  redis.on('error', (err) => console.log('Redis error:', err.message, '=>', JSON.stringify(err)));
  return { db, redis };
};

(async () => {
  try {
    let isShuttingDown = false;
    const { db, redis } = await acquireConnections();
    const env = process.env.NODE_ENV;
    
    redis.on('connect', () => {
      const { app } = new App();
      app.set('port', APP_PORT);

      const server = http.createServer(app);
      server.listen(APP_PORT);

      server.on('listening', () => {
        console.log(`\nDB\t: OK\nRedis\t: OK\nEnv\t: ${env}\nAddress\t: http://localhost:${APP_PORT}`);
      });
  
      const shutdown = (signal: string) => {
        if (!isShuttingDown) {
          console.log('Gracefully shutting down...');
          isShuttingDown = true;
          const exitCode = signal === 'uncaughtException' ? 1 : 0;
    
          server.close(async () => {
            await db.close();
            await redis.quit();
    
            setTimeout(() => {
              process.exit(exitCode);
            }, 3000);
          });
        }
      }
  
      process.on('SIGTERM', shutdown);
      process.on('SIGINT', shutdown);
    });
  } catch (e) {
    console.log('server error: ', e);
    process.exit();
  }
})();
