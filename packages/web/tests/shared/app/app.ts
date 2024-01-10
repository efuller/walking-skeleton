import { PuppeteerPageDriver } from '../webDriver/puppeteerPageDriver';
import { HomePage } from '../pages/homePage';

type Pages = {
  'homePage': HomePage;
};

export class WebApp {
  pageDriver: PuppeteerPageDriver;
  readonly baseUrl: string;
  pages: Pages;

  public constructor(driver: PuppeteerPageDriver) {
    this.pageDriver = driver;
    this.baseUrl = 'http://localhost:5173/';
    this.pageDriver.page.setDefaultTimeout(10000);
    this.pages = this.generatePages();
  }

  private generatePages(): Pages {
    return {
      homePage: new HomePage(this.pageDriver, this.baseUrl),
    };
  }

  async close() {
    await this.pageDriver.browser.close();
  }

  async pause() {
    await new Promise(r => setTimeout(r, 3000))
  }

  async navigateToHomepage() {
    await this.pages.homePage.navigate();
  }

  getPageObject<T extends keyof Pages>(pageName: T): Pages[T] {
    return this.pages[pageName];
  }
}