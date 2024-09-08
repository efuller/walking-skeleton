import { AppConfig } from '@/shared/appConfig';
import { JournalsPresenter } from '@/modules/journals/journals.presenter.ts';
import { JournalsRepo } from '@/modules/journals/journals.repo.ts';
import { JournalsController } from '@/modules/journals/journals.controller.ts';
import { JournalsApi } from '@efuller/shared/dist/api';

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