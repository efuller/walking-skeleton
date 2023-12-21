import { ApiServer } from '../http/apiServer';

export class AppRoot {
  private readonly apiServer: ApiServer;

  constructor() {
    this.apiServer = this.createApiServer();
  }

  createApiServer() {
    return new ApiServer();
  }

  getApiServer() {
    return this.apiServer;
  }
}