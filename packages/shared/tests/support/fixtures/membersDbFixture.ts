import { CreateMemberDto } from '@efuller/shared/src/modules/members/members.dto';
import { MembersRepo } from '@efuller/api/src/modules/members/ports/members.repo';
import { UserRegisterDto } from '@efuller/shared/src/modules/auth/auth.dto';
import { MemberBuilder } from '@efuller/shared/tests/support/builders/memberBuilder';

export class MembersDbFixture {
  public members: CreateMemberDto[] = [];

  constructor(private readonly memberRepo: MembersRepo) {}

  async withMember(user: UserRegisterDto): Promise<void> {
    const member = new MemberBuilder()
      .fromUser(user);

    await this.memberRepo.createMember(member.toDto());
  }

  reset() {
    this.members = [];
  }
}

