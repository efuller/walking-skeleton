import { PuppeteerPageDriver } from '../../webDriver/puppeteerPageDriver';
import { BasePageComponent } from '../basePageComponent';
import { UserRegisterDto } from '@efuller/shared/src/modules/auth/auth.dto';

type LoginFormElements = {
  userName: { selector: string };
  password: { selector: string };
  submitBtn: { selector: string };
};

export class LoginForm extends BasePageComponent<LoginFormElements> {
  constructor(
    protected pageDriver: PuppeteerPageDriver,
    protected componentConfig: LoginFormElements,
  ) {
    super(pageDriver, componentConfig);
  }

  async fillAndSubmitForm(user: UserRegisterDto) {
    await this.waitAndType('userName', user.email);
    await this.waitAndType('password', user.password);
    await this.waitAndClick('submitBtn');
  }
}