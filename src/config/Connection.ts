import { Sequelize } from 'sequelize-typescript';
import IORedis, { Redis, RedisOptions } from 'ioredis';
import chalk from 'chalk'
import { DB_CONFIG, REDIS_CONFIG } from './app.config';

const customerLogger = (query: string) => console.log(`\n${chalk.cyan(query)}\n`);

class Connection {
  private static db: Sequelize;
  private static redis: Redis;

  public static getConnection(): Sequelize {
    if (!Connection.db) {
      const instance = new Sequelize({
        database: DB_CONFIG.DB_NAME,
        dialect: 'mysql',
        logging: process.env.NODE_ENV === 'development' ? customerLogger : false,
        models: [],
        username: DB_CONFIG.DB_USER,
        password: DB_CONFIG.DB_PASSWORD,
        host: DB_CONFIG.DB_HOST,
        dialectOptions: {
          decimalNumbers: true,
        },
        define: {
          underscored: true,
        },
      });
      Connection.db = instance;
    }
    return Connection.db;
  }

  public static getRedis(): Redis {
    if (!Connection.redis) {
      const options: RedisOptions = {
        host: REDIS_CONFIG.HOST,
        port: parseInt(REDIS_CONFIG.PORT || '6379', 10),
        db: 1,
      };

      Connection.redis = new IORedis(options);
      Connection.redis.on('connect', () => console.log('Connected to Redis!'));
      Connection.redis.on('error', (err) => console.log('redis error:', err.message, '=>', JSON.stringify(err)));
    }

    return Connection.redis;
  }
}

export default Connection;