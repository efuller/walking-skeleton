import { v4 as uuidv4 } from 'uuid';
import { DrizzleClient } from '@efuller/api/src/shared/persistence/dbConnection/adapters/drizzleClient';
import { MembersRepo } from '@efuller/api/src/modules/members/ports/members.repo';
import { InMemoryMembersRepo } from '@efuller/api/src/modules/members/adapters/inMemoryMembersRepo';
import { MemberBuilder } from '@efuller/shared/tests/support/builders/memberBuilder';
import { CreateMemberCommand } from '@efuller/shared/src/modules/members/commands';
import { DrizzleMembersRepo } from '@efuller/api/src/modules/members/adapters/drizzleMembers.repo';

describe('MembersRepo', () => {
  let drizzleClient: DrizzleClient;
  let membersRepos: MembersRepo[];
  let inMemoryMembersRepo: InMemoryMembersRepo;
  let drizzleMembersRepo: DrizzleMembersRepo;
  let createMemberCommand: CreateMemberCommand;

  beforeAll(async () => {
    drizzleClient = await DrizzleClient.create();
    inMemoryMembersRepo = new InMemoryMembersRepo();
    drizzleMembersRepo = new DrizzleMembersRepo(drizzleClient.getClient())
    membersRepos = [
      inMemoryMembersRepo,
      drizzleMembersRepo,
    ];
  })

  afterAll(async () => {
    inMemoryMembersRepo.reset();
    await drizzleClient.disconnect();
  });

  it('Can create a new member and retrieve them by their email', async () => {
    createMemberCommand = new MemberBuilder()
      .withId(uuidv4())
      .withFirstName('John')
      .withLastName('Doe')
      .withRandomEmail()
      .withPassword('password')
      .build();

    for (const membersRepo of membersRepos) {
      await membersRepo.createMember(createMemberCommand);
      const retrievedMember = await membersRepo.getMemberByEmail(createMemberCommand.email);

      expect(retrievedMember).not.toBeNull();
      expect(retrievedMember?.id).toEqual(expect.any(String));
      expect(retrievedMember!.email).toEqual(createMemberCommand.email);
      expect(retrievedMember?.firstName).toBe(createMemberCommand.firstName);
      expect(retrievedMember?.lastName).toBe(createMemberCommand.lastName);
    }
  });
});
