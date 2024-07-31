import { RestApiDriver } from './restApiDriver';
import { Server } from 'http';
import { CompositionRoot } from '@efuller/api/src/shared/composition/compositionRoot';
import { ApiServer } from '@efuller/api/src/shared/http/apiServer';
import { ApiResponse } from '@efuller/shared/src/api';

describe('Web Server', () => {
  let compositionRoot: CompositionRoot;
  let apiServer: ApiServer;

  beforeAll(async () => {
    compositionRoot = await CompositionRoot.create();
    apiServer = compositionRoot.getApiServer();
  })

  beforeEach(async () => {
    const port = await apiServer.start();
    console.log('[PORT]', port);
  });

  afterEach(async () => {
    await apiServer.stop();
  })

  afterAll(async () => {
    await apiServer.stop();
    await compositionRoot.disconnectDb();
  });

  it('should be able to start and stop the server', async () => {
    expect(apiServer.isRunning()).toBeTruthy();
  });

  it('should be able to check server health', async () => {
    const server = apiServer.getServer();
    const restApiDriver = new RestApiDriver(server as Server);
    const response = await restApiDriver.get<null>('/health');
    expect(response.success).toBe(true);
  });
});