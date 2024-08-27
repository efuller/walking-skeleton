import express, { NextFunction, Response } from 'express';
import { MeRequest } from '@efuller/api/src/shared/http/apiServer';

export interface Middleware {
  handle(req: MeRequest, res: Response, next: NextFunction): express.Handler
}