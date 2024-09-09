import { loadFeature, defineFeature } from 'jest-cucumber';
import { RestApiDriver } from '../../../src/shared/http/restApiDriver';
import { Server } from 'http';
import { CompositionRoot } from '@efuller/api/src/shared/composition/compositionRoot';
import { ApiResponse } from '@efuller/shared/src/api';
import { ApiServer } from '@efuller/api/src/shared/http/apiServer';
import { CreateJournalCommand, Journal } from '@efuller/shared/src/modules/journals/journals.dto';
import { UserBuilder } from '@efuller/shared/tests/support/builders/userBuilder';
import { UserRegisterDto } from '@efuller/shared/src/modules/auth/auth.dto';
import { AuthResponse } from '@supabase/supabase-js';
import { AuthService } from '@efuller/shared/src/modules/auth/auth.service';

const feature = loadFeature('./packages/shared/tests/features/journal.feature', { tagFilter: '@api' });

defineFeature(feature, (test) => {
  test('Logged in user creates a new journal', async ({ given, when, then}) => {
    let compositionRoot: CompositionRoot;
    let apiServer: ApiServer;
    let apiDriver: RestApiDriver;
    let registerUserDto: UserRegisterDto;
    let response: ApiResponse<Journal>;
    let loginResponse: ApiResponse<AuthResponse>;
    let authService: AuthService;
    let journalResponse: ApiResponse<Journal>;

    beforeAll(async () => {
      compositionRoot = await CompositionRoot.create('test');
      authService = compositionRoot.getAuthService();
      apiServer = compositionRoot.getApiServer();
      await apiServer.start();
      apiDriver = new RestApiDriver(apiServer.getServer() as Server);
    })

    afterAll(async () => {
      await apiServer.stop();
      await compositionRoot.disconnectDb();
    });

    given('I am a logged in user', async () => {
      registerUserDto = new UserBuilder()
        .withRandomEmail()
        .withPassword('Password')
        .build();
      await authService.register(registerUserDto);
      loginResponse = await authService.login(registerUserDto);
      expect(loginResponse.success).toBe(true);
    });

    when(/^I send a POST request to the "(.*)" endpoint with a title of (.*) and content of (.*)$/, async (endpoint, title, content) => {
      response = await apiDriver.post<CreateJournalCommand, Journal>(
        endpoint,
        {
          title,
          content,
        },
        {
          Authorization: `Bearer ${loginResponse.data?.data?.session?.access_token}`
        }
      );
    });

    then(/^I should be able to fetch the journal entry$/, async () => {
      journalResponse = await apiDriver.get<Journal>(
        `/journals`,
        {
          Authorization: `Bearer ${loginResponse.data?.data?.session?.access_token}`
        }
      );
      expect(journalResponse.success).toBe(true);
      // expect that the created journal is in the list of journals
      expect(journalResponse.data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: response.data.id,
          })
        ])
      )
    });
  });
});