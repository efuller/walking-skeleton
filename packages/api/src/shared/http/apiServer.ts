import { Server } from 'http';
import express, { Application } from 'express';
import cors from 'cors';
import { JournalController } from '@efuller/api/src/modules/journals/journal.controller';

interface Controllers {
  journal: JournalController;
}

export class ApiServer {
  private server: Server | null;
  private express: Application;
  private readonly port: number;
  private running: boolean;

  constructor(private readonly controllers: Controllers) {
    const origin = process.env.NODE_ENV === 'production' ? 'https://ws.efuller.me' : '*';
    this.server = null;
    this.express = express();
    this.express.use(express.json());
    // Handle preflight requests for all routes
    this.express.options('*', cors());

    this.express.use(cors({
      origin,
    }));
    this.port = process.env.PORT ? Number(process.env.PORT) : 0;
    this.running = false;

    this.setupRoutes();
  }

  private setupRoutes() {
    this.express.get('/', (req, res) => {
      res.send({ ok: true }).status(200);
    });

    this.express.get('/health', (req, res) => {
      res.send({ ok: true }).status(200);
    });

    this.express.get('/journal', async (req, res) => {
      await this.controllers.journal.getAll(req, res);
    });

    this.express.post('/journal', async (req, res) => {
      await this.controllers.journal.create(req, res);
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