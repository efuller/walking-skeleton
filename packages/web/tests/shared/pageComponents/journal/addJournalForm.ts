import { PuppeteerPageDriver } from '../../webDriver/puppeteerPageDriver';
import { BasePageComponent, PageComponentConfig } from '../basePageComponent';

export class AddJournalFormComponent extends BasePageComponent {
  constructor(
    protected pageDriver: PuppeteerPageDriver,
    protected componentConfig: PageComponentConfig,
  ) {
    super(pageDriver, componentConfig);
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