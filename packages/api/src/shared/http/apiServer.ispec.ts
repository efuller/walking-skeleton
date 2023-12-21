import { ApiServer } from './apiServer';
import { RestApiDriver } from './restApiDriver';
import { Server } from 'http';
import { Database } from '@efuller/api/src/shared/persistence/database/database';

describe('Web Server', () => {
  const db = new Database();
  // TODO: Need to remove this dependency on the database
  const apiServer = new ApiServer(db);

  beforeEach(async () => {
    await apiServer.stop();
  });

  afterEach(async () => {
    await apiServer.stop();
  });

  it('should be able to start and stop the server', async () => {
    await apiServer.start();
    expect(apiServer.isRunning()).toBeTruthy();
  });

  it('should be able to check server health', async () => {
    const server = apiServer.getServer();
    const restApiDriver = new RestApiDriver(server as Server);
    await apiServer.start();
    const response = await restApiDriver.get('/health');
    expect(response.status).toBe(200);
    expect(response.ok).toBe(true);
  });
});