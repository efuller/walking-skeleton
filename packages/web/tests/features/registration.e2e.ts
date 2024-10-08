import { defineFeature, loadFeature } from 'jest-cucumber';
import path from 'path';
import dotenv from 'dotenv';
import { WebApp } from '../shared/webApp/webApp';
import { PuppeteerPageDriver } from '../shared/webDriver/puppeteerPageDriver';
import { RegisterForm } from '../shared/pageComponents/forms/registerForm';
import { RegisterPage } from '../shared/pages/registerPage';
import { SidebarComponent } from '../shared/pageComponents/sidebar/sidebarComponent';
import { UserRegisterDto } from '@efuller/shared/src/modules/auth/auth.dto';
import { UserBuilder } from '@efuller/shared/tests/support/builders/userBuilder';

const feature = loadFeature(
  path.join(__dirname, '../../../../packages/shared/tests/features/registration.feature'),
  { tagFilter: '@web' },
);

dotenv.config({
  path: path.join(__dirname, '../../../../api/.env.test'),
});

defineFeature(feature, (test) => {
  let webApp: WebApp;
  let driver: PuppeteerPageDriver;
  let registerPage: RegisterPage;
  let registerForm: RegisterForm;
  let sidebar: SidebarComponent;
  let registerUserDto: UserRegisterDto;

  beforeAll(async () => {
    driver = await PuppeteerPageDriver.create({ headless: true, slowMo: 25 });
    webApp = await WebApp.create(driver);
    registerPage = webApp.getPageObject('registerPage');
    registerForm = registerPage.$('registerForm');
    sidebar = webApp.sidebar as SidebarComponent;
  });

  afterAll(async () => {
    await webApp.close();
  });

  test('Successful registration', ({ given, when, then, and}) => {
    given('I am a new user', async () => {
      await registerPage.navigate();

      expect(await registerForm.isValid()).toBe(true);
    });

    when('I register with valid credentials', async () => {
      registerUserDto = new UserBuilder()
        .withRandomEmail()
        .withPassword('Password')
        .build();
      await registerForm.fillAndSubmitForm(registerUserDto);
    });

    then('My member profile is loaded', async () => {
      await registerPage.waitForNavigation();
      expect(registerPage.getUrl()).toContain('load-profile');
    });

    then('I am redirected to the dashboard', async () => {
      await registerPage.waitForNavigation();
      expect(registerPage.getUrl()).toContain('journals');
    });

    and('My member email is present on the page', async () => {
      // we can check for username in header for FE.
      expect(await sidebar.isValid()).toBe(true);
      expect(await sidebar.getUserText()).toBe(`hi: ${registerUserDto.email}`);
    });
  });
});
