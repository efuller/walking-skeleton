import { makeObservable, observable } from 'mobx';

type MemberDto = {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
}

export class MembersRepo {
  public member: MemberDto | null = null;

  constructor() {
    makeObservable(this, {
      member: observable,
    });
  }

  public setMember(member: MemberDto) {
    this.member = member;
  }
}