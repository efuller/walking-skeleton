import { PuppeteerPageDriver } from '../webDriver/puppeteerPageDriver';
import { JournalList } from '../pageComponents/journal/journalList';
import { AddJournalFormComponent } from '../pageComponents/journal/addJournalForm';
import { BasePage } from './basePage';
import { LoginForm } from '../pageComponents/forms/loginForm';

type HomepageComponents = {
  loginForm: LoginForm;
  addJournalForm: AddJournalFormComponent;
  journalList: JournalList;
};

export class HomePage extends BasePage<HomepageComponents> {
  protected constructor(
    protected pageDriver: PuppeteerPageDriver,
    protected url: string,
  ) {
    super(pageDriver, url);
  }

  static async create(pageDriver: PuppeteerPageDriver, url: string) {
    const page = new HomePage(pageDriver, url);
    page.pageComponents = await page.generatePageComponents();
    return page;
  }

  async generatePageComponents() {
    const addJournalForm = new AddJournalFormComponent(this.pageDriver, {
      titleInput: { selector: '#title' },
      contentInput: { selector: '#content' },
      submitBtn: { selector: '#submit' },
    });

    const loginForm = new LoginForm(this.pageDriver, {
      userName: { selector: '#email' },
      password: { selector: '#password' },
      submitBtn: { selector: '#submit' }
    });

    const journalList = new JournalList(this.pageDriver, {
      journalList: { selector: '#journal-list' },
      journalEntries: { selector: '.journal-entry' },
      journalTitle: { selector: '.journal-title' },
      journalContent: { selector: '.journal-content' },
    });

    return { addJournalForm, journalList, loginForm };
  }

  async waitForNavigation() {
    await this.pageDriver.page.waitForNavigation();
  }

}