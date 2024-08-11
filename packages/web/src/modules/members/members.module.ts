import { MembersPresenter } from '@/modules/members/members.presenter.ts';

export class MembersModule {
  private readonly membersPresenter: MembersPresenter;

  constructor(private readonly context: 'test' | 'production' = 'production') {
    this.membersPresenter = new MembersPresenter();
  }
  
  public getMembersPresenter() {
    return this.membersPresenter;
  }
}