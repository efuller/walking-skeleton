import { CreateMemberCommand } from '@efuller/shared/src/modules/members/commands';
import { Member } from '@efuller/api/src/shared/persistence/drizzle/schema';

export interface MembersRepo {
  createMember(member: CreateMemberCommand): Promise<Member>;
  getMemberByEmail(email: string): Promise<Member | null>;
}