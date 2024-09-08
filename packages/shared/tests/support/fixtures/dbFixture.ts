import { AppInterface } from '@efuller/api/src/shared/application';
import { CreateMemberCommand } from '@efuller/shared/src/modules/members/members.dto';

export class DbFixture {
  constructor(private readonly app: AppInterface) {}

  async withUser(member: CreateMemberCommand) {
    const result = await this.app.members.createMember(member);
    return result;
  }
}