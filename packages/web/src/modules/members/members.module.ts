import { MembersPresenter } from '@/modules/members/members.presenter.ts';
import { MembersRepo } from './members.repo';
import { MembersController } from './members.controller';
import { AppConfig } from '@/shared/appConfig';
import { MembersApi } from '@efuller/shared/dist/api';

export class MembersModule {
  private readonly membersPresenter: MembersPresenter;
  private readonly membersController: MembersController;
  private readonly membersRepo: MembersRepo;

  constructor(
    private readonly config: AppConfig,
    private readonly api: MembersApi,
  ) {
    this.membersRepo = new MembersRepo(this.api);
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