import { Request, Response, NextFunction } from 'express';
import { Logger } from '@efuller/api/src/shared/logger/logger';
import { ERRORS_EXCEPTIONS } from '@efuller/api/src/shared/errors/constants';

export class ErrorHandler {
  constructor(private readonly logger: Logger) {}

  handle() {
    return (err: Error, req: Request, res: Response, next: NextFunction) => {
      this.logger.error(`${err.name}: ${err.message}`, err, {
        method: req.method,
        path: req.path,
        statusCode: res.statusCode
      });

      return res.status(500).json({
        error: ERRORS_EXCEPTIONS.SERVER_ERROR,
        data: undefined,
        success: false,
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
      });
    }
  }
}