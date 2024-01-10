import { PuppeteerPageDriver } from '../webDriver/puppeteerPageDriver';

export class HomePage {
  constructor(private driver: PuppeteerPageDriver, private url: string) {}

  async navigate() {
    await this.driver.page.goto(this.url);
  }

  async addJournalFormIsVisible() {
    const form = await this.driver.page.waitForSelector('#add-journal');

    if (!form) {
      throw new Error('Add journal form is not visible');
    }
    const titleInput = await form.$('#title');
    const contentInput = await form.$('#content');
    const submitBtn = await form.$('#submit');

    if (!titleInput || !contentInput) {
      throw new Error('Add journal form inputs are not visible');
    }

    if (!submitBtn) {
      throw new Error('Add journal form submit button is not visible');
    }

    return true;
  }

  async enterNewJournal(title: string, content: string) {
    const form = await this.driver.page.waitForSelector('#add-journal');

    if (!form) {
      throw new Error('Add journal form is not visible');
    }

    const titleInput = await form.$('#title');
    const contentInput = await form.$('#content');
    const submitBtn = await form.$('#submit');

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

  async submitAddJournalForm() {
    const form = await this.driver.page.waitForSelector('#add-journal');

    if (!form) {
      throw new Error('Add journal form is not visible');
    }

    const submitBtn = await form.$('#submit');

    if (!submitBtn) {
      throw new Error('Add journal form submit button is not visible');
    }

    await submitBtn.click();
  }

  async getFirstJournal() {
    const journalList = await this.driver.page.waitForSelector('#journal-list');

    if (!journalList) {
      throw new Error('Add journal form is not visible');
    }

    const journalEntries = await journalList.$$('.journal-entry');


    if (journalEntries.length < 1) {
      throw new Error('Journal entries are not visible');
    }

    const [firstJournal] = journalEntries;

    const title = await firstJournal.$eval('.journal-title', (el) => el.textContent);
    const content = await firstJournal.$eval('.journal-content', (el) => el.textContent);

    return {
      title,
      content,
    };
  }
}