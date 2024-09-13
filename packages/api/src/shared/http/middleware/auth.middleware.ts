import { Middleware } from '@efuller/api/src/shared/http/middleware/middleware';
import { NextFunction, Response } from 'express';
import { AuthService } from '@efuller/shared/src/modules/auth/auth.service';
import { MeRequest } from '@efuller/api/src/shared/http/apiServer';

export class AuthMiddleware implements Middleware {
  constructor(private readonly authService: AuthService) {}

  handle() {
    return async (req: MeRequest, res: Response, next: NextFunction) => {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        return res.status(401).json({ success: false, data: null, error: 'Unauthorized, invalid token' });
      }

      try {
        const result = await this.authService.authorize(token);
        req.user = result?.data?.data?.user || undefined;
        next();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        return res.status(500).json({ success: false, data: null, error: 'Internal server error' });
      }
    };
  }
}