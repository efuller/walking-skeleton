import { CreateMemberDto } from '@efuller/shared/src/modules/members/members.dto';
import { MembersRepo } from '@efuller/api/src/modules/members/ports/members.repo';

export class MembersDbFixture {
  public members: CreateMemberDto[] = [];

  constructor(private readonly memberRepo: MembersRepo) {}

  async withMember(command: CreateMemberDto): Promise<void> {
    await this.memberRepo.createMember(command);
  }

  reset() {
    this.members = [];
  }
}

