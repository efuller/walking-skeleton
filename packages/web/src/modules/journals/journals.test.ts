import { CompositionRoot } from '@/shared/compositionRoot';
import { AppApiClient } from '@efuller/shared/src/api';
import { AppConfig } from '@/shared/appConfig';
import { JournalsPresenter } from '@/modules/journals/journals.presenter.ts';
import { JournalBuilder } from '@efuller/shared/tests/support/builders/journalBuilder.ts';

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
    await journalsPresenter.load();

    expect(journalsPresenter.viewModel.journals.length).toBe(0);

    // const journal = new JournalBuilder()
    //   .withId()
    //   .withTitle('Test Journal')
    //   .withContent('Here is some content')
    //   .build();
    //
    // await journalsController.create(journal);

    // const journalEntries = await clientApi.app.journals.getJournalEntries();

    // expect(journalsPresenter.viewModel.journals.length).toBe(0);
  })
});
