import { defineFeature, loadFeature } from 'jest-cucumber';
import path from 'path';
import { PuppeteerPageDriver } from '../../shared/webDriver/puppeteerPageDriver';
import { WebApp } from '../../shared/app/app';
import { HomePage } from '../../shared/pages/homePage';
import { AddJournalFormComponent } from '../../shared/pageComponents/pageComponent';

const feature = loadFeature(
  path.join(__dirname, '../../../../../packages/shared/tests/journal/e2e/addJournal.feature'),
  { tagFilter: '@web' },
);

defineFeature(feature, (test) => {
  let webApp: WebApp;
  let driver: PuppeteerPageDriver;
  let homePage: HomePage;
  let addJournalForm: AddJournalFormComponent;

  beforeAll(async () => {
    driver = await PuppeteerPageDriver.create({ headless: false, slowMo: 50 });
    webApp = await WebApp.create(driver);
    homePage = webApp.getPageObject('homePage');
    addJournalForm = homePage.get('addJournalForm');
  });

  afterAll(async () => {
    await webApp.close();
  });

  test('User creates a new journal', ({ given, and, when, then }) => {
    given('the user is on the homepage page', async () => {
      await webApp.navigateToHomepage();
    });

    and('the form for adding a new journal is visible', async () => {
      expect(await addJournalForm.isValid()).toBe(true);
    });

    when(/^the user enters a title of (.*) and content of (.*) and clicks the submit button$/, async (title, content) => {
      await addJournalForm.addAndSubmit(title, content);
    });

    then(/^the page should display the title of (.*) and content of (.*)$/, async (title, content) => {
      const firstJournal = await homePage.getFirstJournal();
      expect(firstJournal.title).toBe(title);
      expect(firstJournal.content).toBe(content);
    });
  });
});
