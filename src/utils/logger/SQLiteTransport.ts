import Transport from 'winston-transport';
import sqlite3 from 'sqlite3';
import fs from 'node:fs';
import path from 'node:path';
import { redactor } from '../redactor';

type LogInfo = {
  request_id: string
  timestamp: string
  level: string
  message?: string
  meta: Record<string, unknown>
}

export default class SQLiteTransport extends Transport {
  private readonly db: sqlite3.Database;

  constructor(opts: { dbPath?: string } & Transport.TransportStreamOptions) {
    super(opts);

    const dir = process.cwd();
    const dbPath = opts.dbPath || path.join(dir, 'logs', 'logs.db');

    const dbDir = path.dirname(dbPath);
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }

    this.db = new sqlite3.Database(dbPath);

    this.db.run(`
      CREATE TABLE IF NOT EXISTS logs (
        request_id TEXT PRIMARY KEY,
        timestamp TEXT NOT NULL,
        level TEXT NOT NULL,
        message TEXT NOT NULL,
        meta TEXT
      )
    `);
  }

  log(info: LogInfo, callback?: () => void) {
    setImmediate(() => this.emit('logged', info));

    const { request_id, timestamp = new Date().toISOString(), level, message, ...meta } = info;

    const stmt = this.db.prepare(`
      INSERT INTO logs (request_id, timestamp, level, message, meta)
      VALUES (?, ?, ?, ?, ?)
    `);

    stmt.run(
      request_id,
      timestamp,
      level,
      message,
      JSON.stringify(redactor(meta) || {}),
    );

    stmt.finalize(callback);
  }
}
