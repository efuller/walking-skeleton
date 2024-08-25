import { MembersRepo } from '@/modules/members/members.repo.ts';
import { MemberDto } from '@efuller/shared/src/modules/members/commands';

export class MembersController {
  constructor(private readonly membersRepo: MembersRepo) {}

  public async createMember(member: MemberDto) {
    this.membersRepo.setMember(member);
  }
}