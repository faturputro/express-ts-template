import type { Request, Response, NextFunction } from 'express';

export default (req: Request, _res: Response, next: NextFunction): void => {
  const limit = Math.min(Number(req.query.limit) || 100, 100);
  const page = (Number(req.query.page) || 1) - 1;

  req.query.limit = limit as unknown as string;
  req.query.page = page * limit as unknown as string;

  next();
};
