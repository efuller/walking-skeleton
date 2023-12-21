import { loadFeature, defineFeature } from 'jest-cucumber';
import { RestApiDriver } from '../../../src/shared/http/restApiDriver';
import { Server } from 'http';
import { CompositionRoot } from '@efuller/api/src/shared/composition/compositionRoot';

const feature = loadFeature('./packages/shared/tests/journal/e2e/addJournal.feature');

defineFeature(feature, (test) => {
  test('Adding a new journal entry', ({ given, when, then }) => {
    const compositionRoot = new CompositionRoot();
    const apiServer = compositionRoot.getApiServer();
    const db = compositionRoot.getDatabase();
    let apiDriver: RestApiDriver;
    let response: any;

    beforeAll(async () => {
      await apiServer.start();
      apiDriver = new RestApiDriver(apiServer.getServer() as Server);
    })

    afterAll(async () => {
      await apiServer.stop();
      await db.reset();
    });

    given('The app can be accessed', async () => {
      expect(apiServer.isRunning()).toBeTruthy();
    });

    when('The user adds a new journal entry of "Today is a great day"', async () => {
      response = await apiDriver.post('/journal', { title: 'Today is a great day' });
    });

    then('The user should be able to verify that the journal entry is added to the list', () => {
      expect(response.body.data).toEqual({ title: 'Today is a great day' });
    });
  });
});