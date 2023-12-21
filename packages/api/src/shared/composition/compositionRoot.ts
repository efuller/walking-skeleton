import { ApiServer } from '../http/apiServer';
import { Database } from '@efuller/api/src/shared/persistence/database/database';

export class CompositionRoot {
  private readonly db: Database;
  private readonly apiServer: ApiServer;

  constructor() {
    this.db = new Database();
    this.apiServer = this.createApiServer();
  }

  createApiServer() {
    return new ApiServer(this.db);
  }

  getApiServer() {
    return this.apiServer;
  }

  getDatabase() {
    return this.db;
  }
}