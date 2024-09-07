import { defineFeature, loadFeature } from 'jest-cucumber';
import path from 'path';
import { PuppeteerPageDriver } from '../shared/webDriver/puppeteerPageDriver';
import { WebApp } from '../shared/webApp/webApp';
import { HomePage } from '../shared/pages/homePage';
import { JournalList } from '../shared/pageComponents/journal/journalList';
import { AddJournalFormComponent } from '../shared/pageComponents/journal/addJournalForm';
import { UserRegisterDto } from '@efuller/shared/src/modules/auth/auth.dto';
import { LoginForm } from '../shared/pageComponents/forms/loginForm';
import { Authenticator } from '@efuller/shared/src/modules/auth/ports/authenticator';
import { AuthService } from '@efuller/shared/src/modules/auth/auth.service';
import { SupabaseAuthenticator } from '@efuller/shared/src/modules/auth/adapters/supabaseAuthenticator';
import { UserBuilder } from '@efuller/shared/tests/support/builders/userBuilder';

const feature = loadFeature(
  path.join(__dirname, '../../../../packages/shared/tests/features/journal.feature'),
  { tagFilter: '@web' },
);

defineFeature(feature, (test) => {
  let webApp: WebApp;
  let driver: PuppeteerPageDriver;
  let homePage: HomePage;
  let addJournalForm: AddJournalFormComponent;
  let journalList: JournalList;
  let loginForm: LoginForm;
  let registerUserDto: UserRegisterDto;
  let authenticator: Authenticator;
  let authService: AuthService;

  beforeAll(async () => {
    driver = await PuppeteerPageDriver.create({ headless: false, slowMo: 50 });
    webApp = await WebApp.create(driver);
    authenticator = new SupabaseAuthenticator();
    authService = new AuthService(authenticator);
    homePage = webApp.getPageObject('homePage');
    addJournalForm = homePage.$('addJournalForm');
    loginForm = homePage.$('loginForm');
    journalList = homePage.$('journalList');
  });

  afterAll(async () => {
    await webApp.close();
  });

  test('Registered user creates a new journal', ({ given, and, when, then }) => {
    given('I am a logged in user', async () => {
      registerUserDto = new UserBuilder()
        .withRandomEmail()
        .withPassword('Password')
        .build();
      await authService.register(registerUserDto);
      await homePage.navigate();
      expect(await loginForm.isValid()).toBe(true);
      await loginForm.fillAndSubmitForm(registerUserDto);
    });

    and('the form for adding a new journal is visible', async () => {
      await homePage.waitForNavigation();
      expect(await addJournalForm.isValid()).toBe(true);
    });

    when(/^I enter a title of (.*) and content of (.*) and click the submit button$/, async (title, content) => {
      await addJournalForm.addAndSubmit(title, content);
    });

    then(/^the page should display the title of (.*) and content of (.*)$/, async (title, content) => {
      const firstJournal = await journalList.getFirstJournal();
      expect(firstJournal.title).toBe(title);
      expect(firstJournal.content).toBe(content);
    });
  });
});