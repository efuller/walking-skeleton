import { ApiServer } from './apiServer';
import { RestApiDriver } from './restApiDriver';
import { Server } from 'http';

describe('Web Server', () => {
  const apiServer = new ApiServer();

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