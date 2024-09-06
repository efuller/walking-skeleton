import { AppConfig } from '@/shared/appConfig';
import { JournalsPresenter } from '@/modules/journals/journals.presenter.ts';
import { JournalsRepo } from '@/modules/journals/journals.repo.ts';
import { JournalsApi } from '@efuller/shared/src/api';

export class JournalsModule {
  private readonly journalsPresenter: JournalsPresenter;
  private readonly journalsRepo: JournalsRepo;

  constructor(
    private readonly config: AppConfig,
    private readonly api: JournalsApi
  ) {
    this.journalsRepo = new JournalsRepo(api);
    this.journalsPresenter = new JournalsPresenter(this.journalsRepo);
  }

  public getJournalsPresenter() {
    return this.journalsPresenter;
  }
}