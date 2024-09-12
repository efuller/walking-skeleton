import { defineFeature, loadFeature } from 'jest-cucumber';
import { Server } from 'http';
import { CompositionRoot } from '@efuller/api/src/shared/composition/compositionRoot';
import { ApiServer } from '@efuller/api/src/shared/http/apiServer';
import { RestApiDriver } from '@efuller/api/src/shared/http/restApiDriver';
import { SupabaseAuthenticator } from '@efuller/shared/src/modules/auth/adapters/supabaseAuthenticator';
import { AuthService } from '@efuller/shared/src/modules/auth/auth.service';
import { UserRegisterDto } from '@efuller/shared/src/modules/auth/auth.dto';
import { UserBuilder } from '@efuller/shared/tests/support/builders/userBuilder';
import { MemberDto } from '@efuller/shared/src/modules/members/members.dto';

const feature = loadFeature('./packages/shared/tests/features/auth.feature', { tagFilter: '@api' });

defineFeature(feature, (test) => {
  let compositionRoot: CompositionRoot;
  let apiServer: ApiServer;
  let apiDriver: RestApiDriver;
  let registerUserDto: UserRegisterDto;
  let supabaseAuthenticator: SupabaseAuthenticator;
  let authService: AuthService;
  let token: string;

  beforeAll(async () => {
    compositionRoot = await CompositionRoot.create('test');
    apiServer = compositionRoot.getApiServer();
    await apiServer.start();
    apiDriver = new RestApiDriver(apiServer.getServer() as Server);
    supabaseAuthenticator = new SupabaseAuthenticator();
    authService = new AuthService(supabaseAuthenticator);
  })

  afterAll(async () => {
    await apiServer.stop();
    await compositionRoot.disconnectDb();
  });


  test('Access protected resources', ({ given, when, then }) => {
    given('I am a newly registered user', async () => {
      registerUserDto = new UserBuilder()
        .withRandomEmail()
        .withPassword('Password')
        .build();
      await authService.register(registerUserDto);
    });

    when('I login with valid credentials', async () => {
      const response = await authService.login({ email: registerUserDto.email, password: registerUserDto.password });
      token = response?.data?.data?.session?.access_token || '';
      expect(response.success).toBe(true);
    });

    then('I am able to access protected resources', async () => {
      const response = await apiDriver.get<MemberDto>(
        `/me`,
        {
          Authorization: `Bearer ${token}`
        }
      );
      expect(response.success).toBe(true);
      expect(response.data).not.toBeNull();
    });
  });
});