import { defineFeature, loadFeature } from 'jest-cucumber';
import { MemberBuilder } from '@efuller/shared/tests/support/builders/memberBuilder';
import { CompositionRoot } from '@efuller/api/src/shared/composition/compositionRoot';
import { CreateMemberCommand } from '@efuller/shared/src/modules/members/commands';
import { MemberDto } from '@efuller/api/src/modules/members/member.dto';
import { AppInterface } from '@efuller/api/src/shared/application';

const feature = loadFeature('./packages/shared/tests/features/registration.feature', { tagFilter: '@api' });

defineFeature(feature, (test) => {
  let compositionRoot: CompositionRoot;
  let application: AppInterface;
  let createMemberCommand: CreateMemberCommand;
  let foundMember: MemberDto | null;

  beforeAll(async () => {
    compositionRoot = await CompositionRoot.create('test:unit');
    application = compositionRoot.getApplication();
  });

  test('Verify member creation details', ({ given, when, then }) => {
    given('I am a newly registered user', () => {
      createMemberCommand = new MemberBuilder()
        .withFirstName('John')
        .withLastName('Doe')
        .withEmail('johndoe@test.com')
        .build();
      application.members.createMember(createMemberCommand);
    });

    when('I request my member account details by email', async () => {
      foundMember = await application.members.getMemberByEmail(createMemberCommand.email);
      expect(foundMember).not.toBeNull();
    });

    then('I am able to see my member account details', async () => {
      expect(true).toBe(true);
      const foundMember = await application.members.getMemberByEmail(createMemberCommand.email);

      expect(foundMember).toBeDefined();
      expect(foundMember?.email).toEqual(createMemberCommand.email);
      expect(foundMember?.firstName).toEqual(createMemberCommand.firstName);
      expect(foundMember?.lastName).toEqual(createMemberCommand.lastName);
    });
  });
});