import { Server } from 'http';
import express, { Application } from 'express';
import { ProcessService } from '@efuller/shared';

export class ApiServer {
  private server: Server | null;
  private app: Application;
  private readonly port: number;
  private running: boolean;

  constructor() {
    this.server = null;
    this.app = express();
    this.app.use(express.json());
    this.port = 3000;
    this.running = false;

    this.setupRoutes();
  }

  private setupRoutes() {
    this.app.get('/health', (req, res) => {
      res.send({ ok: true }).status(200);
    });

    this.app.post('/food', async (req, res) => {
      const responseDto = {
        success: true,
        error: null,
        data: {name: 'steak'},
      }
      res.status(201).json(responseDto);
    });
  }

  async start() {
    await ProcessService.killProcessOnPort(this.port);
    return new Promise((resolve) => {
      this.server = this.app.listen(
        this.port,
        () => {
          console.log('Server is running on port 3000');
          this.running = true;
          resolve(true);
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