import { Server } from 'http';
import express, { Application } from 'express';
import { Database } from '../persistence/database/database';
// import { ProcessService } from '@efuller/shared/src';

export class ApiServer {
  private server: Server | null;
  private app: Application;
  private readonly port: number;
  private running: boolean;
  private readonly db: Database;

  constructor() {
    this.server = null;
    this.app = express();
    this.app.use(express.json());
    this.port = 3000;
    this.running = false;
    this.db = new Database();

    this.setupRoutes();
  }

  private setupRoutes() {
    this.app.get('/health', (req, res) => {
      res.send({ ok: true }).status(200);
    });

    this.app.post('/journal', async (req, res) => {
      const { title } = req.body;

      const result = await this.db.getClient().journal.create({
        data: {
          title,
          content: 'This is a journal entry',
        },
      });

      console.log('RESULT', result);
      const responseDto = {
        success: true,
        error: null,
        data: { title: result.title },
      }
      res.status(201).json(responseDto);
    });
  }

  async start() {
    // await ProcessService.killProcessOnPort(this.port);
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