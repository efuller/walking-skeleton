import { PuppeteerPageDriver } from '../../webDriver/puppeteerPageDriver';
import { BasePageComponent, PageComponentConfig } from '../basePageComponent';

export class JournalList extends BasePageComponent {
  constructor(
    protected pageDriver: PuppeteerPageDriver,
    protected componentConfig: PageComponentConfig,
  ) {
    super(pageDriver, componentConfig);
  }

  async getFirstJournal() {
    const journalList = await this.pageDriver.page.waitForSelector(this.componentConfig.journalList.selector);

    if (!journalList) {
      throw new Error('Add journal form is not visible');
    }

    const journalEntries = await journalList.$$(this.componentConfig.journalEntries.selector);

    if (journalEntries.length < 1) {
      throw new Error('Journal entries are not visible');
    }

    const [firstJournal] = journalEntries;

    const title = await firstJournal.$eval(this.componentConfig.journalTitle.selector, (el) => el.textContent);
    const content = await firstJournal.$eval(this.componentConfig.journalContent.selector, (el) => el.textContent);

    return {
      title,
      content,
    };
  }
}