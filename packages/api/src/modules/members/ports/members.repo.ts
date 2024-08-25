import { CreateMemberCommand, Member } from '@efuller/shared/src/modules/members/commands';

export interface MembersRepo {
  createMember(member: CreateMemberCommand): Promise<Member>;
  getMemberByEmail(email: string): Promise<Member | null>;
}