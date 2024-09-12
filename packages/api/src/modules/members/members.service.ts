import { CreateMemberDto, MemberDto } from '@efuller/shared/src/modules/members/members.dto';
import { MembersRepo } from '@efuller/api/src/modules/members/ports/members.repo';

export class MembersService {
  constructor(private membersRepo: MembersRepo) {}

  async createMember(command: CreateMemberDto): Promise<MemberDto> {
    const member = await this.membersRepo.createMember(command);
    const memberDto: MemberDto = {
      id: member.id,
      firstName: member.firstName,
      lastName: member.lastName,
      email: member.email,
      userId: member.userId,
      createdAt: member.createdAt,
      updatedAt: member.updatedAt,
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
      userId: member.userId,
      createdAt: member.createdAt,
      updatedAt: member.updatedAt,
    };
    return memberDto;
  }
}