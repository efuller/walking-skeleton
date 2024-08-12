import { MembersRepo } from '@/modules/members/members.repo.ts';
import { CreateMemberCommand } from '@efuller/shared/src/modules/members/commands';

export class MembersController {
  constructor(private readonly membersRepo: MembersRepo) {}

  public async createMember(member: CreateMemberCommand) {
    this.membersRepo.setMember({
      id: member.id || '',
      firstName: member.firstName || '',
      lastName: member.lastName || '',
      email: member.email,
    });
  }
}