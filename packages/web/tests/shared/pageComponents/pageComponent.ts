import { PuppeteerPageDriver } from '../webDriver/puppeteerPageDriver';

export type PageComponentConfig = {
  [key: string]: { selector: string };
}

export class AddJournalFormComponent {
  private constructor(
    private pageDriver: PuppeteerPageDriver,
    private url: string,
    private componentConfig: PageComponentConfig,
  ) {}

  static async create(
    pageDriver: PuppeteerPageDriver,
    url: string,
    componentConfig: PageComponentConfig,
  ) {
    return new AddJournalFormComponent(pageDriver, url, componentConfig);
  }

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