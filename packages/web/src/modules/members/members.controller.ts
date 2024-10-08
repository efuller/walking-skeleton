import { MembersRepo } from '@efuller/web/modules/members/members.repo.ts';
import { MemberDto } from '@efuller/shared/src/modules/members/members.dto';

export class MembersController {
  constructor(private readonly membersRepo: MembersRepo) {}

  public async createMember(member: MemberDto) {
    this.membersRepo.setMember(member);
  }
}