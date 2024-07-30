import { defineFeature, loadFeature } from 'jest-cucumber';
import { MemberBuilder } from '@efuller/shared/tests/support/builders/memberBuilder';
import { CompositionRoot } from '@efuller/api/src/shared/composition/compositionRoot';
import { AppInterface } from '@efuller/api/src/shared/application';
import { CreateMemberCommand } from '@efuller/shared/src/modules/members/commands';

const feature = loadFeature('./packages/shared/tests/features/registration.feature', { tagFilter: '@api' });

defineFeature(feature, (test) => {
  let compositionRoot: CompositionRoot;
  let application: AppInterface;
  let createMemberCommand: CreateMemberCommand;

  beforeAll(async () => {
    compositionRoot = await CompositionRoot.create('test:unit');
    application = compositionRoot.getApplication();
  });

  test('Create new member using the API', ({ given, when, then }) => {
    given('I am registered as a new user', () => {
      createMemberCommand = new MemberBuilder()
        .withFirstName('John')
        .withLastName('Doe')
        .withEmail('johndoe@test.com')
        .withPassword('password')
        .build();
    });

    when('I request to create a member account', async () => {
      const createdMember = await application.members.createMember(createMemberCommand);

      expect(createdMember.id).toBeDefined();
      expect(createdMember.email).toBe(createdMember.email);
      expect(createdMember.firstName).toEqual(createdMember.firstName);
      expect(createdMember.lastName).toEqual(createdMember.lastName);
    });

    then('I am able to retrieve that member account by email', async () => {
      expect(true).toBe(true);
      const foundMember = await application.members.getMemberByEmail(createMemberCommand.email);

      expect(foundMember).toBeDefined();
      expect(foundMember?.email).toEqual(createMemberCommand.email);
      expect(foundMember?.firstName).toEqual(createMemberCommand.firstName);
      expect(foundMember?.lastName).toEqual(createMemberCommand.lastName);
    });
  });
});