import { v4 as uuidv4 } from 'uuid';

import { MembersRepo } from '@efuller/api/src/modules/members/ports/members.repo';
import { CreateMemberCommand, Member } from '@efuller/shared/src/modules/members/commands';

export class InMemoryMembersRepo implements MembersRepo {
  private members: Member[] = [];

  async createMember(command: CreateMemberCommand): Promise<Member> {
    const member: Member = {
      id: uuidv4(),
      userId: uuidv4(),
      firstName: command.firstName || '',
      lastName: command.lastName || '',
      email: command.email,
      password: command.password,
      createdAt: Date.now().toString(),
      updatedAt: '',
    };

    this.members.push(member);
    return member;
  }

  async getMemberByEmail(email: string): Promise<Member | null> {
    return this.members.find(member => member.email === email) || null;
  }

  reset() {
    this.members = [];
  }
}