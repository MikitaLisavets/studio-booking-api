import { Request, Response, NextFunction } from 'express';

const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const startTime = new Date().getTime();

  console.info(`${req.method}: ${req.originalUrl} [request]`);

  res.on('finish', () => {
    const delta = new Date().getTime() - startTime;
    console.info(`${req.method}: ${req.originalUrl} [response | code: ${res.statusCode} | ${delta}ms]`);
  });

  next();
};

export default requestLogger;