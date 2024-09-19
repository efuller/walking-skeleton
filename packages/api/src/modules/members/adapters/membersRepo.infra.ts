import { DrizzleClient } from '@efuller/api/src/shared/persistence/dbConnection/adapters/drizzleClient';
import { MembersRepo } from '@efuller/api/src/modules/members/ports/members.repo';
import { InMemoryMembersRepo } from '@efuller/api/src/modules/members/adapters/inMemoryMembersRepo';
import { DrizzleMembersRepo } from '@efuller/api/src/modules/members/adapters/drizzleMembers.repo';
import { UserRegisterDto } from '@efuller/shared/src/modules/auth/auth.dto';
import { AuthService } from '@efuller/shared/src/modules/auth/auth.service';
import { SupabaseAuthenticator } from '@efuller/shared/src/modules/auth/adapters/supabaseAuthenticator';
import { UserBuilder } from '@efuller/shared/tests/support/builders/userBuilder';
import { ApiResponse } from '@efuller/shared/src/api';
import { AuthResponse } from '@supabase/supabase-js';
import { MembersDbFixture } from '@efuller/shared/tests/support/fixtures/membersDbFixture';

describe('MembersRepo', () => {
  let membersDbFixture: MembersDbFixture;
  let drizzleClient: DrizzleClient;
  let membersRepos: MembersRepo[];
  let registerUserDto: UserRegisterDto;
  let inMemoryMembersRepo: InMemoryMembersRepo;
  let drizzleMembersRepo: DrizzleMembersRepo;
  // let createMemberCommand: CreateMemberDto;
  let authService: AuthService;
  let registerResponse: ApiResponse<AuthResponse>;

  beforeAll(async () => {
    drizzleClient = await DrizzleClient.create();
    inMemoryMembersRepo = new InMemoryMembersRepo();
    drizzleMembersRepo = new DrizzleMembersRepo(drizzleClient.getClient())
    authService = new AuthService(new SupabaseAuthenticator());
    membersDbFixture = new MembersDbFixture(inMemoryMembersRepo);
    membersRepos = [
      inMemoryMembersRepo,
      drizzleMembersRepo,
    ];
  })

  afterEach(() => {
    membersDbFixture.reset();
  });

  afterAll(async () => {
    inMemoryMembersRepo.reset();
    await drizzleClient.disconnect();
  });

  it('Can retrieve a member by their email', async () => {
    registerUserDto = new UserBuilder()
      .withRandomEmail()
      .withPassword('Password')
      .build();
    await membersDbFixture.withMember(registerUserDto);
    registerResponse = await authService.register(registerUserDto);

    for (const membersRepo of membersRepos) {
      const retrievedMember = await membersRepo.getMemberByEmail(registerResponse.data?.data?.user?.email || '');

      expect(retrievedMember).not.toBeNull();
      expect(retrievedMember?.id).toEqual(expect.any(String));
      expect(retrievedMember!.email).toEqual(registerUserDto.email);
    }
  });
});
