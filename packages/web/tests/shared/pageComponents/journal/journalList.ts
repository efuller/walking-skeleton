import { PuppeteerPageDriver } from '../../webDriver/puppeteerPageDriver';
import { BasePageComponent } from '../basePageComponent';
import { JournalDto } from '@efuller/shared/src/modules/journals/journals.dto';

type JournalListFormElements = {
  journalList: { selector: string };
  journalEntries: { selector: string };
  journalTitle: { selector: string };
  journalContent: { selector: string };
};

export class JournalList extends BasePageComponent<JournalListFormElements> {
  constructor(
    protected pageDriver: PuppeteerPageDriver,
    protected componentConfig: JournalListFormElements,
  ) {
    super(pageDriver, componentConfig);
  }

  async containsJournal(journal: JournalDto | null) {
    let result = false;
    const journalList = await this.$('journalList');

    if (!journal) {
      throw new Error('The journal list is not visible');
    }

    if (!journalList) {
      throw new Error('The journal list is not visible');
    }

    const journalEntries = await journalList.$$(this.componentConfig.journalEntries.selector);

    if (journalEntries.length < 1) {
      throw new Error('Journal entries are not visible');
    }

    // loop over journal entries and check if any of them match the title and content of the journal object
    for (const journalEntry of journalEntries) {
      const title = await journalEntry.$eval(this.componentConfig.journalTitle.selector, (el) => el.textContent);
      const content = await journalEntry.$eval(this.componentConfig.journalContent.selector, (el) => el.textContent);

      if (title === journal.title && content === journal.content) {
        result = true;
      }
    }

    return result;
  }
}