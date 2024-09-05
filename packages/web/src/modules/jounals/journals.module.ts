import { JournalsApi } from '@efuller/shared/src/api';
import { AppConfig } from '@/shared/appConfig';
import { JournalsPresenter } from '@/modules/jounals/journals.presenter.ts';

export class JournalsModule {
  private readonly journalsPresenter: JournalsPresenter;
  // private readonly journalsController: JournalsController;
  // private readonly journalsRepo: JournalsRepo;

  constructor(
    private readonly config: AppConfig,
    private readonly api: JournalsApi,
  ) {
    this.journalsPresenter = new JournalsPresenter(this.api);
  }

  public getJournalsPresenter() {
    return this.journalsPresenter;
  }
}