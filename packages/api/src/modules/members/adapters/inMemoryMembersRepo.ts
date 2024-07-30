import { MembersRepo } from '@efuller/api/src/modules/members/ports/members.repo';
import { Member } from '@efuller/api/src/shared/persistence/drizzle/schema';
import { CreateMemberCommand } from '@efuller/shared/src/modules/members/commands';

export class InMemoryMembersRepo implements MembersRepo {
  private members: Member[] = [];

  async createMember(command: CreateMemberCommand): Promise<Member> {
    const member: Member = {
      id: this.members.length + 1,
      firstName: command.firstName,
      lastName: command.lastName,
      email: command.email,
      password: command.password,
      createdAt: Date.now().toString(),
      updatedAt: '',
    };

    this.members.push(member);
    return member;
  }
}