import { MembersRepo } from '@efuller/api/src/modules/members/ports/members.repo';
import { members } from '@efuller/api/src/shared/persistence/drizzle/schema';
import { CreateMemberDto, Member } from '@efuller/shared/src/modules/members/members.dto';
import { DbClient } from '@efuller/api/src/shared/persistence/dbConnection/adapters/drizzleClient';
import { eq } from 'drizzle-orm';

export class DrizzleMembersRepo implements MembersRepo {
  constructor(private readonly client: DbClient) {}

  async createMember(member: CreateMemberDto): Promise<Member> {
    const result = await this.client
      .insert(members)
      .values({...member})
      .returning();

    if (result.length < 1 ) {
      throw new Error('Failed to create member');
    }

    return result[0];
  }

  async getMemberByEmail(email: string): Promise<Member | null> {
    try {
      const result = await this.client
        .select()
        .from(members)
        .where(eq(members.email, email));

      if (result.length < 1) {
        return null;
      }

      return result[0];
    } catch (error) {
      console.error('Error getting member by email', error);
      return null;
    }
  }
}