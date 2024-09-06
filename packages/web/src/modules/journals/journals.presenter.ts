import { JournalsRepo } from '@/modules/journals/journals.repo.ts';

export class JournalsPresenter {
  public get viewModel() {
    return {
      journals: this.journalsRepo.journals
    }
  }

  constructor(private readonly journalsRepo: JournalsRepo) {}

  public async load() {
    await this.journalsRepo.load();
  }
}
