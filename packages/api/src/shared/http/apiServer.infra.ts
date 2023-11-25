import { ApiServer } from './apiServer';

describe('Web Server', () => {
  let apiServer: ApiServer;

  beforeEach(() => {
    apiServer = new ApiServer();
  });

  afterEach(async () => {
    await apiServer.stop();
  });

  it('should be able to start and stop the server', async () => {
    await apiServer.start();
    expect(apiServer.isRunning()).toBeTruthy();
  });
});