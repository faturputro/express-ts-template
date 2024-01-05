import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  res.sendSuccess = (data: SendSuccess, message?: string) => {
    return res.status(200).json({ data, message: message || 'Request successful' });
  };

  res.sendError = (data?: SendError) => {
    return res.status(400).json({ data: data?.data, message: data?.message || 'Something went wrong' });
  };
  
  res.failed = (msg?: string) => {
    return res.status(500).json({ message: msg || 'Internal Server Error' });
  };

  res.unauthorized = (msg?: string) => res.status(401).json({ message: msg || 'Unauthorized' });

  res.notFound = () => res.status(404).json({ message: 'Not found' });

  return next();
};
