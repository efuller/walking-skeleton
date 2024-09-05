import { PuppeteerPageDriver } from '../../webDriver/puppeteerPageDriver';
import { BasePageComponent } from '../basePageComponent';
import { UserRegisterDto } from '@efuller/shared/src/modules/auth/auth.dto';

type RegisterFormElements = {
  userName: { selector: string };
  password: { selector: string };
  submitBtn: { selector: string };
};

export class RegisterForm extends BasePageComponent<RegisterFormElements> {
  constructor(
    protected pageDriver: PuppeteerPageDriver,
    protected componentConfig: RegisterFormElements,
  ) {
    super(pageDriver, componentConfig);
  }

  async fillAndSubmitForm(user: UserRegisterDto) {
    await this.waitAndType('userName', user.email);
    await this.waitAndType('password', user.password);
    await this.waitAndClick('submitBtn');
  }
}