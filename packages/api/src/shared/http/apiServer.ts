import { Server } from 'http';
import 'express-async-errors';
import express, { Application, Request } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';

import { JournalController } from '@efuller/api/src/modules/journals/journal.controller';
import { AppInterface } from '@efuller/api/src/shared/application';
import { MembersController } from '@efuller/api/src/modules/members/members.controller';
import { User } from '@supabase/auth-js';
import { Context } from '@efuller/api/src/shared/composition/compositionRoot';
import { Logger } from '@efuller/api/src/shared/logger/logger';
import { ErrorHandler } from '@efuller/api/src/shared/errors/globalHandler';

export interface MeRequest extends Request {
  user?: User;
}

export class ApiServer {
  private server: Server | null;
  private express: Application;
  private readonly port: number;
  private running: boolean;

  constructor(
    private app: AppInterface,
    private readonly context: Context
  ) {
    this.server = null;
    this.express = express();
    this.setupMiddleware();

    this.port = process.env.PORT ? Number(process.env.PORT) : 0;
    this.running = false;

    this.setupRoutes();
    this.setupErrorHandler();
  }

  private setupMiddleware() {
    const origin = process.env.NODE_ENV === 'production' ? 'https://ws.efuller.me' : '*';
    this.express.use(helmet());
    this.express.use(express.json());
    this.express.use(cors({
      origin,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }));
    // Handle preflight requests for all routes
    this.express.options('*', cors({
      origin,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }));
    this.express.use(compression())
    this.express.use(morgan('combined'));
  }

  private setupErrorHandler() {
    const loggerService = new Logger();
    const errorHandler = new ErrorHandler(loggerService);
    this.express.use(errorHandler.handle());
  }

  private setupRoutes() {
    const journalService = this.app.journals;
    const membersService = this.app.members;
    const authMiddleware = this.app.authMiddleware;
    const journalController = new JournalController(journalService);
    const membersController = new MembersController(membersService);

    this.express.get('/', (req, res) => {
      res.send({ ok: true }).status(200);
    });
    this.express.get('/health', (req, res) => {
      res.send({ success: true, data: null, error: false }).status(200);
    });
    this.express.get('/journals', authMiddleware.handle(), journalController.getAll.bind(journalController));
    this.express.post('/journals', authMiddleware.handle(), journalController.create.bind(journalController));
    this.express.get('/members/:email', authMiddleware.handle(), membersController.getMemberByEmail.bind(membersController));
    this.express.get('/me', authMiddleware.handle(), async (req: MeRequest, res) => {
      const user = req?.user;

      if (!user) {
        return res.status(401).json({ success: false, data: null, error: 'Unauthorized' });
      }
      res.status(200).json({ success: true, data: user, error: false });
    });
  }

  async start() {
    return new Promise((resolve) => {
      this.server = this.express.listen(
        this.port,
        () => {
          const address = this.server?.address();
          this.running = true;
          resolve(address);
        }
      );
    });
  }

  async stop() {
    if (!this.isRunning() || !this.server) {
      return;
    }
    this.server.close(() => {
      return new Promise((resolve) => {
        this.running = false;
        resolve(true);
      });
    });
  }

  isRunning() {
    return this.running;
  }

  getServer() {
    if (!this.isRunning()) {
      throw new Error('Server is not running');
    }
    return this.server;
  }
}