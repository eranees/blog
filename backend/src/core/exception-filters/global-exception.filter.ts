import { NextFunction, Request, Response } from 'express';

import { logger } from '../logger/logger';

export class GlobalExceptionFilter {
  // eslint-disable-next-line no-unused-vars
  static handle(err: any, req: Request, res: Response, next: NextFunction) {
    const status = err?.statusCode || err?.status || 500;
    const message = err?.message || 'Internal Server Error';

    logger.error(
      `[${req.method}] ${req.originalUrl} >> StatusCode:: ${status}, Message:: ${message}`,
    );

    res.status(status).json({
      success: false,
      statusCode: status,
      message,
    });
  }
}
