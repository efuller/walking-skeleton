import { JournalsRepo } from '@/modules/journals/journals.repo.ts';
import { computed, makeObservable } from 'mobx';

export class JournalsPresenter {
  public get viewModel() {
    return {
      journals: this.journalsRepo.journals
    }
  }

  constructor(private readonly journalsRepo: JournalsRepo) {
    makeObservable(this, {
      viewModel: computed,
    })
  }

  public async load() {
    await this.journalsRepo.load();
  }
}
