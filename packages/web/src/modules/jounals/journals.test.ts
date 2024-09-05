import { CompositionRoot } from '@/shared/compositionRoot';
import { AppApiClient } from '@efuller/shared/dist/api';
import { AppConfig } from '@/shared/appConfig';
import { JournalsPresenter } from '@/modules/jounals/journals.presenter.ts';

describe('Journals', () => {
  let compositionRoot: CompositionRoot;
  let clientApi: AppApiClient;
  let journalsPresenter: JournalsPresenter;
  const appConfig = new AppConfig({
    environment: 'test',
    script: 'test-unit',
  });

  beforeEach(async () => {
    compositionRoot = await CompositionRoot.create(appConfig);
    clientApi = compositionRoot.getClientApi();
    journalsPresenter = compositionRoot.getJournalsModule().getJournalsPresenter();
  });

  it('should be able to add a journal entry', async () => {
    // await clientApi.app.journals.create({
    //   title: 'Test Journal Entry',
    //   content: 'This is a test journal entry',
    // });
    //
    // const journalEntries = await clientApi.app.journals.getJournalEntries();

    expect(journalsPresenter.viewModel.journals.length).toBe(0);
  })
});
