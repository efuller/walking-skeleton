import { PuppeteerPageDriver } from '../webDriver/puppeteerPageDriver';
import { BasePage } from './basePage';
import { RegisterForm } from '../pageComponents/forms/registerForm';

type RegisterComponents = {
  registerForm: RegisterForm;
};

export class RegisterPage extends BasePage<RegisterComponents> {
  protected constructor(
    protected pageDriver: PuppeteerPageDriver,
    protected url: string,
  ) {
    super(pageDriver, url);
  }

  static async create(pageDriver: PuppeteerPageDriver, url: string) {
    console.log('register page url', url);
    const page = new RegisterPage(pageDriver, url);
    page.pageComponents = await page.generatePageComponents();
    return page;
  }

  async generatePageComponents() {
    const registerForm = new RegisterForm(this.pageDriver, {
      userName: { selector: '#email' },
      password: { selector: '#password' },
      submitBtn: { selector: '#submitBtn' },
    });

    return { registerForm };
  }

  async getHTML() {
    return this.pageDriver.page.content();
  }
}