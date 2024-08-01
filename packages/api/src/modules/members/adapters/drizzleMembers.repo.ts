import { MembersRepo } from '@efuller/api/src/modules/members/ports/members.repo';
import { Member, members } from '@efuller/api/src/shared/persistence/drizzle/schema';
import { CreateMemberCommand } from '@efuller/shared/src/modules/members/commands';
import { DbClient } from '@efuller/api/src/shared/persistence/dbConnection/adapters/drizzleClient';
import { eq } from 'drizzle-orm';

export class DrizzleMembersRepo implements MembersRepo {
  constructor(private readonly client: DbClient) {}

  async createMember(member: CreateMemberCommand): Promise<Member> {
    const result = await this.client
      .insert(members)
      .values({...member})
      .returning();

    console.log('result', result);

    if (result.length < 1 ) {
      throw new Error('Failed to create member');
    }

    return result[0];
  }

  async getMemberByEmail(email: string): Promise<Member | null> {
    const result = await this.client
      .select()
      .from(members)
      .where(eq(members.email, email));

    if (result.length < 1 ) {
      return null;
    }

    return result[0];
  }
}