import { makeObservable, observable } from 'mobx';
import { MembersApi } from '@efuller/shared/src/api/membersApi';
import { MemberDto } from '@efuller/shared/src/modules/members/members.dto';

export class MembersRepo {
  public member: MemberDto | null = null;

  constructor(public readonly membersApi: MembersApi) {
    makeObservable(this, {
      member: observable,
    });
  }

  public setMember(member: MemberDto) {
    this.member = member;
  }

  public async loadMember(email: string) {
    const result = await this.membersApi.getMemberByEmail(email);

    if (result.success && result.data) {
      this.setMember(result.data);
      return;
    }
  }
}