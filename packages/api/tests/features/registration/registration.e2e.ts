import { defineFeature, loadFeature } from 'jest-cucumber';
import { Server } from 'http';
import { MemberBuilder } from '@efuller/shared/tests/support/builders/memberBuilder';
import { CompositionRoot } from '@efuller/api/src/shared/composition/compositionRoot';
import { AppInterface } from '@efuller/api/src/shared/application';
import { CreateMemberCommand } from '@efuller/shared/src/modules/members/commands';
import { ApiServer } from '@efuller/api/src/shared/http/apiServer';
import { RestApiDriver } from '@efuller/api/src/shared/http/restApiDriver';
import { MemberDto } from '@efuller/api/src/modules/members/member.dto';
import { DbFixture } from '@efuller/shared/tests/support/fixtures/dbFixture';

const feature = loadFeature('./packages/shared/tests/features/registration.feature', { tagFilter: '@api' });

defineFeature(feature, (test) => {
  let compositionRoot: CompositionRoot;
  let apiServer: ApiServer;
  let apiDriver: RestApiDriver;
  let application: AppInterface;
  let createMemberCommand: CreateMemberCommand;
  let dbFixture: DbFixture;

  beforeAll(async () => {
    compositionRoot = await CompositionRoot.create('test');
    apiServer = compositionRoot.getApiServer();
    await apiServer.start();
    apiDriver = new RestApiDriver(apiServer.getServer() as Server);
    dbFixture = new DbFixture(compositionRoot.getApplication());
  })

  afterAll(async () => {
    await apiServer.stop();
    await compositionRoot.disconnectDb();
  });


  test('Verify member creation details', ({ given, when, then }) => {
    given('I am a newly registered user', async () => {
      createMemberCommand = new MemberBuilder()
        .withId()
        .withFirstName('John')
        .withLastName('Doe')
        .withEmail('johndoe@test.com')
        .withPassword('password')
        .build();
      await dbFixture.withUser(createMemberCommand);
    });

    when('I request my member account details by email', async () => {
      const createdMemberResponse = await apiDriver.get<MemberDto>(`/members/${createMemberCommand.email}`);
      console.log('createdMemberResponse', createdMemberResponse);

      expect(createdMemberResponse.success).toBe(true);
      expect(createdMemberResponse.data).not.toBeNull();
      expect(createdMemberResponse.data.id).toEqual(expect.any(String));
      expect(createdMemberResponse.data.email).toBe(createMemberCommand.email);
      expect(createdMemberResponse.data.firstName).toEqual(createMemberCommand.firstName);
      expect(createdMemberResponse.data.lastName).toEqual(createMemberCommand.lastName);
    });

    then('I am able to see my member account details', async () => {
      expect(true).toBe(true);
      // const foundMember = await application.members.getMemberByEmail(createMemberCommand.email);
      //
      // expect(foundMember).toBeDefined();
      // expect(foundMember?.email).toEqual(createMemberCommand.email);
      // expect(foundMember?.firstName).toEqual(createMemberCommand.firstName);
      // expect(foundMember?.lastName).toEqual(createMemberCommand.lastName);
    });
  });
});