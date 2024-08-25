import { CreateMemberCommand } from '@efuller/shared/src/modules/members/commands';
import { MemberDto } from '@efuller/api/src/modules/members/member.dto';
import { MembersRepo } from '@efuller/api/src/modules/members/ports/members.repo';

export class MembersService {
  constructor(private membersRepo: MembersRepo) {}

  async createMember(command: CreateMemberCommand): Promise<MemberDto> {
    const member = await this.membersRepo.createMember(command);
    const memberDto: MemberDto = {
      id: member.id,
      firstName: member.firstName,
      lastName: member.lastName,
      email: member.email,
    };
    return memberDto;
  }

  async getMemberByEmail(email: string): Promise<MemberDto | null> {
    const member = await this.membersRepo.getMemberByEmail(email);
    if (!member) {
      return null;
    }
    const memberDto: MemberDto = {
      id: member.id,
      firstName: member.firstName,
      lastName: member.lastName,
      email: member.email,
    };
    return memberDto;
  }
}