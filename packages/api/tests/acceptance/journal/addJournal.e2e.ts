import { loadFeature, defineFeature } from 'jest-cucumber';
import { RestApiDriver } from '../../../src/shared/http/restApiDriver';
import { Server } from 'http';
import { CompositionRoot } from '@efuller/api/src/shared/composition/compositionRoot';
import { ApiResponse } from '@efuller/shared/src/api';
import { Journal } from '@efuller/api/src/modules/journals/journal.service';
import { ApiServer } from '@efuller/api/src/shared/http/apiServer';

const feature = loadFeature('./packages/shared/tests/features/addJournal.feature', { tagFilter: '@api' });

defineFeature(feature, (test) => {
  test('User sends data to create a new journal', async ({ given, when, then, and }) => {
    let compositionRoot: CompositionRoot;
    let apiServer: ApiServer;
    let apiDriver: RestApiDriver;
    let response: ApiResponse<Partial<Partial<Journal>>>;

    beforeAll(async () => {
      compositionRoot = await CompositionRoot.create('test');
      apiServer = compositionRoot.getApiServer();
      await apiServer.start();
      apiDriver = new RestApiDriver(apiServer.getServer() as Server);
    })

    afterAll(async () => {
      await apiServer.stop();
      await compositionRoot.disconnectDb();
    });

    given('The backend API is accessible', async () => {
      expect(apiServer.isRunning()).toBeTruthy();
    });

    when(/^a user sends a POST request to the "(.*)" endpoint with a title of (.*) and content of (.*)$/, async (endpoint, title, content) => {
      response = await apiDriver.post<Partial<Journal>>(endpoint, { title, content });
    });

    then(/^the API should respond with a success of true$/, () => {
      expect(response.success).toBe(true);
    });

    and(/^the response should contain title of (.*) and content of (.*)$/, (title, content) => {
      expect(response.data).toMatchObject({ data: { title, content }, success: true });
    });
  });
});