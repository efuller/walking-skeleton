import { loadFeature, defineFeature } from 'jest-cucumber';
import { ApiServer } from '../../../src/shared/http/apiServer';
import { RestApiDriver } from '../../../src/shared/http/restApiDriver';
import { Server } from 'http';

const feature = loadFeature('./packages/shared/tests/food/e2e/addFood.feature');

defineFeature(feature, (test) => {
  test('Adding a food', ({ given, when, then }) => {
    const apiServer = new ApiServer();
    let apiDriver: RestApiDriver;
    let response: any;

    beforeAll(async () => {
      await apiServer.start();
      apiDriver = new RestApiDriver(apiServer.getServer() as Server);
    })

    afterAll(async () => {
      await apiServer.stop();
    });

    given('The app can be accessed', async () => {
      expect(apiServer.isRunning()).toBeTruthy();
    });

    when('The user adds a new food called steak', async () => {
      response = await apiDriver.post('/food', { name: 'steak' });
    });

    then('The user should be able to verify that steak is added to the list', () => {
      expect(response.body.data).toEqual({ name: 'steak' });
    });
  });
});