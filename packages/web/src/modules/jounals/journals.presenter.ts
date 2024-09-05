import { JournalsApi } from '@efuller/shared/src/api';

export class JournalsPresenter {
  public get viewModel() {
    return {
      journals: [],
    };
  }
  constructor(private readonly api: JournalsApi) {}
}
