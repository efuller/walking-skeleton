import { PuppeteerPageDriver } from '../webDriver/puppeteerPageDriver';
import { AddJournalFormComponent, JournalList } from '../pageComponents/pageComponent';

type HomepageComponents = {
  addJournalForm: AddJournalFormComponent;
  journalList: JournalList;
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

  get<T extends keyof HomepageComponents>(key: T): HomepageComponents[T] {
    if (!this.pageComponents?.[key]) {
      throw new Error(`Page component ${key} does not exist`);
    }
    return this.pageComponents[key];
  }

  async generatePageComponents() {
    const addJournalForm = new AddJournalFormComponent(this.pageDriver, {
      titleInput: { selector: '#title' },
      contentInput: { selector: '#content' },
      submitBtn: { selector: '#submit' },
    });

    const journalList = new JournalList(this.pageDriver, {
      journalList: { selector: '#journal-list' },
      journalEntries: { selector: '.journal-entry' },
      journalTitle: { selector: '.journal-title' },
      journalContent: { selector: '.journal-content' },
    });

    return { addJournalForm, journalList };
  }

  async navigate() {
    await this.pageDriver.page.goto(this.url);
  }
}