import { PuppeteerPageDriver } from '../webDriver/puppeteerPageDriver';
import { AddJournalFormComponent } from '../pageComponents/pageComponent';

type HomepageComponents = {
  addJournalForm: AddJournalFormComponent;
}

export class HomePage {
  public pageComponents: HomepageComponents | undefined;

  private constructor(
    private pageDriver: PuppeteerPageDriver,
    private url: string,
  ) {}

  static async create(pageDriver: PuppeteerPageDriver, url: string) {
    const page = new HomePage(pageDriver, url);
    page.pageComponents = await page.generatePageComponents();
    return page;
  }

  get(key: keyof HomepageComponents){
    if (!this.pageComponents?.[key]) {
      throw new Error(`Page component ${key} does not exist`);
    }
    return this.pageComponents[key];
  }

  async generatePageComponents() {
    const addJournalForm = new AddJournalFormComponent(this.pageDriver, this.url, {
      titleInput: { selector: '#title' },
      contentInput: { selector: '#content' },
      submitBtn: { selector: '#submit' },
    });
    return { addJournalForm };
  }

  async navigate() {
    await this.pageDriver.page.goto(this.url);
  }

  async getFirstJournal() {
    const journalList = await this.pageDriver.page.waitForSelector('#journal-list');

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