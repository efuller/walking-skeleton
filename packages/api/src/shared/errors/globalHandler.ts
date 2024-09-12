import { Request, Response } from 'express';
import { Logger } from '@efuller/api/src/shared/logger/logger';
import { ERRORS_EXCEPTIONS } from '@efuller/api/src/shared/errors/constants';
import { ZodError } from 'zod';

export class ErrorHandler {
  constructor(private readonly logger: Logger) {}

  handle() {
    return (err: Error, req: Request, res: Response) => {
      if (err instanceof ZodError) {
        return res.status(400).json({
          error: ERRORS_EXCEPTIONS.VALIDATION_ERROR,
          data: undefined,
          success: false,
          message: err.message,
          stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
        });
      }

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