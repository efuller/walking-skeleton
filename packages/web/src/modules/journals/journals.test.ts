import { CompositionRoot } from '@/shared/compositionRoot';
import { AppConfig } from '@/shared/appConfig';
import { JournalsPresenter } from '@/modules/journals/journals.presenter.ts';
import { JournalBuilder } from '@efuller/shared/tests/support/builders/journalBuilder.ts';
import { JournalsController } from '@/modules/journals/journals.controller.ts';

describe('Journals', () => {
  let compositionRoot: CompositionRoot;
  let journalsPresenter: JournalsPresenter;
  let journalsController: JournalsController;
  const appConfig = new AppConfig({
    environment: 'test',
    script: 'test-unit',
  });

  beforeEach(async () => {
    compositionRoot = await CompositionRoot.create(appConfig);
    journalsPresenter = compositionRoot.getJournalsModule().getJournalsPresenter();
    journalsController = compositionRoot.getJournalsModule().getJournalsController();
  });

  it('should be able to add a journal entry', async () => {
    await journalsPresenter.load();

    expect(journalsPresenter.viewModel.journals.length).toBe(0);

    const journal = new JournalBuilder()
      .withId()
      .withTitle('Test Journal')
      .withContent('Here is some content')
      .build();

    await journalsController.create(journal);

    expect(journalsPresenter.viewModel.journals.length).toBe(1);
    expect(journalsPresenter.viewModel.journals[0].title).toBe('Test Journal');
    expect(journalsPresenter.viewModel.journals[0].content).toBe('Here is some content');
  })
});
