import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  res.sendSuccess = (data?: SendSuccess) => {
    return res.status(200).json({ data: data?.data, message: data?.message || 'Request successful' });
  };

  res.sendError = (data?: SendError) => {
    return res.status(400).json({ data: data?.data, message: data?.message || 'Something went wrong' });
  };
  
  res.failed = (msg?: string) => {
    return res.status(500).json({ message: msg || 'Internal Server Error' });
  };

  return next();
};
