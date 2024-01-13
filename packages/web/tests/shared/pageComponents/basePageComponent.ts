import { PuppeteerPageDriver } from '../webDriver/puppeteerPageDriver';

export type PageComponentConfig = {
  [key: string]: { selector: string };
};

export class BasePageComponent {
  constructor(
    protected pageDriver: PuppeteerPageDriver,
    protected componentConfig: PageComponentConfig,
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
}
