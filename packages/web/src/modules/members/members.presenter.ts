import { MembersRepo } from "./members.repo";
import { computed, makeObservable } from 'mobx';

export class MembersPresenter {
  get viewModel() {
    return {
      email: this.membersRepo.member?.email || '',
    }
  }

  constructor(private readonly membersRepo: MembersRepo) {
    makeObservable(this, {
      viewModel: computed,
    });
  }

  async loadMember(email: string) {
    await this.membersRepo.loadMember(email);
  }

  isMemberLoaded() {
    return this.viewModel.email !== '';
  }
}