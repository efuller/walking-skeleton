import { defineFeature, loadFeature } from 'jest-cucumber';
import { Server } from 'http';
import { CompositionRoot } from '@efuller/api/src/shared/composition/compositionRoot';
import { ApiServer } from '@efuller/api/src/shared/http/apiServer';
import { RestApiDriver } from '@efuller/api/src/shared/http/restApiDriver';
import { ApiResponse } from '@efuller/shared/src/api';
import { UserRegisterDto } from '@efuller/shared/src/modules/auth/auth.dto';
import { UserBuilder } from '@efuller/shared/tests/support/builders/userBuilder';
import { AuthService } from '@efuller/shared/src/modules/auth/auth.service';
import { AuthResponse } from '@supabase/supabase-js';
import { MemberDto } from '@efuller/shared/src/modules/members/members.dto';

const feature = loadFeature('./packages/shared/tests/features/registration.feature', { tagFilter: '@api' });

defineFeature(feature, (test) => {
  let compositionRoot: CompositionRoot;
  let apiServer: ApiServer;
  let apiDriver: RestApiDriver;
  let registerUserDto: UserRegisterDto;
  let createdMemberResponse: ApiResponse<MemberDto>;
  let authService: AuthService;
  let registerResponse: ApiResponse<AuthResponse>;

  beforeAll(async () => {
    compositionRoot = await CompositionRoot.create('test');
    authService = compositionRoot.getAuthService();
    apiServer = compositionRoot.getApiServer();
    await apiServer.start();
    createdMemberResponse = {} as ApiResponse<MemberDto>;
    apiDriver = new RestApiDriver(apiServer.getServer() as Server);
  })

  afterAll(async () => {
    await apiServer.stop();
    await compositionRoot.disconnectDb();
  });


  test('Verify member creation details', ({ given, when, then }) => {
    given('I am a newly registered user', async () => {
      registerUserDto = new UserBuilder()
        .withRandomEmail()
        .withPassword('Password')
        .build();
      registerResponse = await authService.register(registerUserDto);
    });

    when('I request my member account details by email', async () => {
      createdMemberResponse = await apiDriver.get<MemberDto>(
        `/members/${registerUserDto.email}`,
        {
          Authorization: `Bearer ${registerResponse.data?.data?.session?.access_token}`
        }
      );

      expect(createdMemberResponse.success).toBe(true);
      expect(createdMemberResponse.data).not.toBeNull();
    });

    then('I am able to see my member account details', async () => {
      expect(createdMemberResponse.data.id).toEqual(expect.any(String));
      expect(createdMemberResponse.data.email).toBe(registerUserDto.email);
    });
  });
});