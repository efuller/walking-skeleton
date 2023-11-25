import { Server } from 'http';
import express, { Application } from 'express';
import { exec } from 'child_process';

async function killProcessOnPort(port: number) {
  return new Promise((resolve, reject) => {
    const command = `lsof -i :${port} | grep LISTEN | awk '{print $2}' | xargs kill -9`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error killing processes on port ${port}:`, stderr);
        reject(false);
      } else {
        if (stdout.trim() !== '') {
          console.log(`Successfully killed processes using port ${port}:`, stdout);
        } else {
          console.log(`No processes found using port ${port}.`);
        }
        resolve(true);
      }
    });
  });
}

export class ApiServer {
  private server: Server | null;
  private app: Application;
  private readonly port: number;
  private running: boolean;

  constructor() {
    this.server = null;
    this.app = express();
    this.port = 3000;
    this.running = false;
  }

  async start() {
    await killProcessOnPort(this.port);
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
}