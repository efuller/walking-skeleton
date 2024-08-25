import { PuppeteerPageDriver } from '../webDriver/puppeteerPageDriver';
import { HomePage } from '../pages/homePage';
import { RegisterPage } from '../pages/registerPage';
import { SidebarComponent } from '../pageComponents/sidebar/sidebarComponent';

type Pages = {
  'homePage': HomePage;
  'registerPage': RegisterPage;
};

export class WebApp {
  pageDriver: PuppeteerPageDriver;
  baseUrl: string | null = null;
  pages: Pages | undefined;
  sidebar: SidebarComponent | undefined;

  private constructor(driver: PuppeteerPageDriver, baseUrl: string) {
    this.pageDriver = driver;
    this.baseUrl = baseUrl;
  }

  static async create(driver: PuppeteerPageDriver, baseUrl: string = 'http://localhost:5173/') {
    const app = new WebApp(driver, baseUrl);
    app.pageDriver.page.setDefaultTimeout(10000);
    await app.generatePages();
    await app.generateComponents();
    return app;
  }

  async generatePages() {
    if (!this.baseUrl) {
      throw new Error('Base url has not been set');
    }
    const homePage = await HomePage.create(this.pageDriver, this.baseUrl);
    const registerPage = await RegisterPage.create(this.pageDriver, `${this.baseUrl}register`);
    this.pages = { homePage, registerPage };
  }

  async generateComponents() {
    if (!this.baseUrl) {
      throw new Error('Base url has not been set');
    }
    this.sidebar = new SidebarComponent(this.pageDriver, {
      user: { selector: '#user' },
    });
  }

  async close() {
    await this.pageDriver.browser.close();
  }

  async pause() {
    await new Promise((r) => setTimeout(r, 3000));
  }

  getPageObject<T extends keyof Pages>(pageName: T): Pages[T] {
    if (!this.pages) {
      throw new Error('Pages have not been generated');
    }
    return this.pages[pageName];
  }
}