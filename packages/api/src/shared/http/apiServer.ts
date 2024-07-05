import { Server } from 'http';
import express, { Application } from 'express';
import cors from 'cors';
import { JournalController } from '@efuller/api/src/modules/journals/journal.controller';

interface Controllers {
  journal: JournalController;
}

export class ApiServer {
  private server: Server | null;
  private app: Application;
  private readonly port: number;
  private running: boolean;

  constructor(private readonly controllers: Controllers) {
    this.server = null;
    this.app = express();
    this.app.use(express.json());
    // Handle preflight requests for all routes
    this.app.options('*', cors());

    this.app.use(cors({
      origin: 'https://ws.efuller.me',
    }));
    this.port = process.env.PORT ? Number(process.env.PORT) : 0;
    this.running = false;

    this.setupRoutes();
  }

  private setupRoutes() {
    this.app.get('/', (req, res) => {
      res.send({ ok: true }).status(200);
    });

    this.app.get('/health', (req, res) => {
      res.send({ ok: true }).status(200);
    });

    this.app.get('/journal', async (req, res) => {
      await this.controllers.journal.getAll(req, res);
    });

    this.app.post('/journal', async (req, res) => {
      await this.controllers.journal.create(req, res);
    });
  }

  async start() {
    return new Promise((resolve) => {
      this.server = this.app.listen(
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