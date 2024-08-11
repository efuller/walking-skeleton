import { BasePageComponent } from '../basePageComponent';
import { PuppeteerPageDriver } from '../../webDriver/puppeteerPageDriver';

type SidebarElements = {
  user: { selector: string };
};

export class SidebarComponent extends BasePageComponent<SidebarElements> {
  constructor(
    protected pageDriver: PuppeteerPageDriver,
    protected componentConfig: SidebarElements,
  ) {
    super(pageDriver, componentConfig);
  }

  async getUserText() {
    const user = await this.$('user');
    const text = user.evaluate((el) => el.textContent);
    return text;
  }
}