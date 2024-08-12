import { MembersPresenter } from '@/modules/members/members.presenter.ts';
import { MembersRepo } from './members.repo';
import { MembersController } from './members.controller';

export class MembersModule {
  private readonly membersPresenter: MembersPresenter;
  private readonly membersController: MembersController;
  private readonly membersRepo: MembersRepo;

  constructor(private readonly context: 'test' | 'production' = 'production') {
    this.membersRepo = new MembersRepo()
    this.membersPresenter = new MembersPresenter(this.membersRepo);
    this.membersController = new MembersController(this.membersRepo);
  }

  public getMembersPresenter() {
    return this.membersPresenter;
  }

  public getMembersRepo() {
    return this.membersRepo;
  }

  public getMembersController() {
    return this.membersController;
  }
}