import { PuppeteerPageDriver } from '../webDriver/puppeteerPageDriver';
import { HomePage } from '../pages/homePage';

type Pages = {
  'homePage': HomePage;
};

export interface App {
  baseUrl: string;
  pages: Pages;
  pageDriver: PuppeteerPageDriver;
  close(): Promise<void>;
  pause(): Promise<void>;
}

export class WebApp implements App {
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

  /**
   * Pause the test for 3 seconds.
   */
  async pause() {
    await new Promise(r => setTimeout(r, 3000))
  }
}