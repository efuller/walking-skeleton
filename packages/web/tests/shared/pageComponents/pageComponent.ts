import { PuppeteerPageDriver } from '../webDriver/puppeteerPageDriver';

export type PageComponentConfig = {
  [key: string]: { selector: string };
}

export class JournalList {
  constructor(
    private pageDriver: PuppeteerPageDriver,
    private url: string,
    private componentConfig: PageComponentConfig,
  ) {}

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

export class AddJournalFormComponent {
  constructor(
    private pageDriver: PuppeteerPageDriver,
    private url: string,
    private componentConfig: PageComponentConfig,
  ) {}

  async isValid() {
    const promises = Object.keys(this.componentConfig).map(async (key) => {
      const component = this.componentConfig[key];
      return await this.pageDriver.page.waitForSelector(component.selector)
        .then(() => true)
        .catch(() => false);
    });

    const result = await Promise.all(promises);

    if (result.includes(false)) {
      throw new Error('Add journal form is not visible');
    }
    return true;
  }

  async addAndSubmit(title: string, content: string) {
    const titleInput = await this.pageDriver.page.$(this.componentConfig.titleInput.selector);
    const contentInput = await this.pageDriver.page.$(this.componentConfig.contentInput.selector);
    const submitBtn = await this.pageDriver.page.$(this.componentConfig.submitBtn.selector);

    if (!titleInput || !contentInput) {
      throw new Error('Add journal form inputs are not visible');
    }

    if (!submitBtn) {
      throw new Error('Add journal form submit button is not visible');
    }

    await titleInput.type(title);
    await contentInput.type(content);
    await submitBtn.click();
  }
}