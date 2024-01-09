import { PuppeteerPageDriver } from '../webDriver/puppeteerPageDriver';

export class HomePage {
  constructor(private driver: PuppeteerPageDriver, private url: string) {}

  async navigate() {
    await this.driver.page.goto(this.url);
  }

  async getAddJournalForm() {
    return await this.driver.page.waitForSelector('#add-journal');
  }
}