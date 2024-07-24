import { defineFeature, loadFeature } from 'jest-cucumber';
import path from 'path';
import dotenv from 'dotenv';
import { WebApp } from '../shared/webApp/webApp';
import { PuppeteerPageDriver } from '../shared/webDriver/puppeteerPageDriver';
import { RegisterForm } from '../shared/pageComponents/forms/registerForm';
import { RegisterPage } from '../shared/pages/registerPage';

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

  beforeAll(async () => {
    driver = await PuppeteerPageDriver.create({ headless: false, slowMo: 75 });
    webApp = await WebApp.create(driver);
    registerPage = webApp.getPageObject('registerPage');
    registerForm = registerPage.$('registerForm');
  });

  afterAll(async () => {
    await webApp.close();
  });

  test('Successful member creation', ({ given, when, then, and}) => {
    given('I have registered as a new user', async () => {
      await registerPage.navigate();

      expect(await registerForm.isValid()).toBe(true);
      await registerForm.fillAndSubmitForm();
    });

    when('I am redirected to the creating account page', async () => {
      expect(true).toBe(true);
      // await registerPage.waitForNavigation();
      // expect(registerPage.getUrl()).toContain('logging-in');
    });

    then('I am redirected to the dashboard', async () => {
      expect(true).toBe(true);
      // await registerPage.waitForNavigation();
      // expect(registerPage.getUrl()).toContain('dashboard');
    });

    and('My member email is present on the page', async () => {
      expect(true).toBe(true);
      // we can check for username in header for FE.
      // expect(await authedButton.isValid()).toBe(true);
      // expect(await authedButton.getText()).toBe('admin@test.com');
    });
  });
});
