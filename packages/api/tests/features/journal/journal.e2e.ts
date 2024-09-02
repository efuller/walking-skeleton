import { loadFeature, defineFeature } from 'jest-cucumber';
import { RestApiDriver } from '../../../src/shared/http/restApiDriver';
import { Server } from 'http';
import { CompositionRoot } from '@efuller/api/src/shared/composition/compositionRoot';
import { ApiResponse } from '@efuller/shared/src/api';
import { ApiServer } from '@efuller/api/src/shared/http/apiServer';
import { CreateJournalCommand, Journal } from '@efuller/shared/src/modules/journals/commands';

const feature = loadFeature('./packages/shared/tests/features/journal.feature', { tagFilter: '@api' });

defineFeature(feature, (test) => {
  test('Logged in user creates a new journal', async ({ given, when, then, and }) => {
    let compositionRoot: CompositionRoot;
    let apiServer: ApiServer;
    let apiDriver: RestApiDriver;
    let response: ApiResponse<Journal>;

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

    given('I am a logged in user', async () => {
      expect(apiServer.isRunning()).toBeTruthy();
    });

    when(/^I send a POST request to the "(.*)" endpoint with a title of (.*) and content of (.*)$/, async (endpoint, title, content) => {
      response = await apiDriver.post<CreateJournalCommand, Journal>(endpoint, { title, content });
    });

    then(/^I should be able to fetch the journal entry$/, () => {
      expect(response.success).toBe(true);
    });
  });
});