import { Middleware } from '@efuller/api/src/shared/http/middleware/middleware';
import { NextFunction, Request, Response } from 'express';

export class AuthMiddleware implements Middleware {
  handle() {
    return (req: Request, res: Response, next: NextFunction) => {
      console.log('AuthMiddleware');
      next();
    };
  }
}