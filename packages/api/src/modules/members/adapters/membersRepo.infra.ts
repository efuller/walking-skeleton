import { DrizzleClient } from '@efuller/api/src/shared/persistence/dbConnection/adapters/drizzleClient';
import { MembersRepo } from '@efuller/api/src/modules/members/ports/members.repo';
import { InMemoryMembersRepo } from '@efuller/api/src/modules/members/adapters/inMemoryMembersRepo';
import { MemberBuilder } from '@efuller/shared/tests/support/builders/memberBuilder';
import { CreateMemberCommand } from '@efuller/shared/src/modules/members/commands';

describe('MembersRepo', () => {
  let drizzleClient: DrizzleClient;
  let membersRepos: MembersRepo[];
  let inMemoryMembersRepo: InMemoryMembersRepo;
  let createMemberCommand: CreateMemberCommand;

  beforeAll(async () => {
    inMemoryMembersRepo = new InMemoryMembersRepo();
    drizzleClient = await DrizzleClient.create();
    membersRepos = [
      inMemoryMembersRepo,
      // new DrizzleMembersRepo(drizzleClient.getClient()),
    ];
  })

  afterAll(async () => {
    inMemoryMembersRepo.reset();
    await drizzleClient.disconnect();
  });

  it('can retrieve a by their email', async () => {
    createMemberCommand = new MemberBuilder()
      .withFirstName('John')
      .withLastName('Doe')
      .withEmail('johndoe@test.com')
      .withPassword('password')
      .build();
    await inMemoryMembersRepo.createMember(createMemberCommand);

    for (const membersRepo of membersRepos) {
      const createdMember = await membersRepo.getMemberByEmail(createMemberCommand.email);
      console.log('member', createdMember);

      expect(createdMember).not.toBeNull();
      expect(createdMember?.id).toEqual(expect.any(Number));
      expect(createdMember!.email).toEqual(createMemberCommand.email);
      expect(createdMember?.firstName).toBe(createMemberCommand.firstName);
      expect(createdMember?.lastName).toBe(createMemberCommand.lastName);
    }
  });
});
