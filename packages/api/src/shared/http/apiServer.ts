import { Server } from 'http';
import express, { Application, Request } from 'express';
import cors from 'cors';
import { JournalController } from '@efuller/api/src/modules/journals/journal.controller';
import { AppInterface } from '@efuller/api/src/shared/application';
import { MembersController } from '@efuller/api/src/modules/members/members.controller';
import { AuthMiddleware } from '@efuller/api/src/shared/http/middleware/auth.middleware';
import { AuthService } from '@efuller/shared/src/modules/auth/auth.service';
import { SupabaseAuthenticator } from '@efuller/shared/src/modules/auth/adapters/supabaseAuthenticator';
import { User } from '@supabase/auth-js';
import { Context } from '@efuller/api/src/shared/composition/compositionRoot';
import { MockAuthenticator } from '@efuller/shared/src/modules/auth/adapters/mockAuthenticator';
import { Authenticator } from '@efuller/shared/src/modules/auth/ports/authenticator';

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
    const origin = process.env.NODE_ENV === 'production' ? 'https://ws.efuller.me' : '*';
    this.server = null;
    this.express = express();
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

    this.port = process.env.PORT ? Number(process.env.PORT) : 0;
    this.running = false;

    this.setupRoutes();
  }

  private setupRoutes() {
    let authenticator: Authenticator;
    const journalService = this.app.journals;
    const membersService = this.app.members;
    const journalController = new JournalController(journalService);
    const membersController = new MembersController(membersService);
    // TODO: for unit:tests we need to use the mock authenticator
    if (this.context === 'test:unit') {
      authenticator = new MockAuthenticator();
    } else {
      authenticator = new SupabaseAuthenticator();
    }
    const authService = new AuthService(authenticator);
    const authMiddleware = new AuthMiddleware(authService);

    this.express.get('/', (req, res) => {
      res.send({ ok: true }).status(200);
    });

    this.express.get('/health', (req, res) => {
      res.send({ success: true, data: null, error: false }).status(200);
    });

    this.express.get('/journal', async (req, res) => {
      await journalController.getAll(req, res);
    });

    this.express.post('/journal', async (req, res) => {
      await journalController.create(req, res);
    });

    // this.express.get('/members/:email', authMiddleware.handle(), async (req, res) => {
    //   await membersController.getMemberByEmail(req, res);
    // });
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