import { JournalsPresenter } from '@efuller/web/modules/journals/journals.presenter.ts';
import { JournalsRepo } from '@efuller/web/modules/journals/journals.repo.ts';
import { JournalsController } from '@efuller/web/modules/journals/journals.controller.ts';
import { JournalsApi } from '@efuller/shared/dist/api';
import { AppConfig } from '@efuller/web/shared/appConfig';

export class JournalsModule {
  private readonly journalsController: JournalsController;
  private readonly journalsPresenter: JournalsPresenter;
  private readonly journalsRepo: JournalsRepo;

  constructor(
    private readonly config: AppConfig,
    private readonly api: JournalsApi
  ) {
    this.journalsRepo = new JournalsRepo(api);
    this.journalsController = new JournalsController(this.journalsRepo);
    this.journalsPresenter = new JournalsPresenter(this.journalsRepo);
  }

  public getJournalsPresenter() {
    return this.journalsPresenter;
  }

  public getJournalsController() {
    return this.journalsController;
  }
}