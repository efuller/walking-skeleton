import { CreateMemberDto, Member } from '@efuller/shared/src/modules/members/members.dto';

export interface MembersRepo {
  createMember(member: CreateMemberDto): Promise<Member>;
  getMemberByEmail(email: string): Promise<Member | null>;
}