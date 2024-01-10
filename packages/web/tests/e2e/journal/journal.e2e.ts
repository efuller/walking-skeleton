import { defineFeature, loadFeature } from 'jest-cucumber';
import path from 'path';
import { PuppeteerPageDriver } from '../../shared/webDriver/puppeteerPageDriver';
import { WebApp } from '../../shared/app/app';
import { HomePage } from '../../shared/pages/homePage';

const feature = loadFeature(
  path.join(__dirname, '../../../../../packages/shared/tests/journal/e2e/addJournal.feature'),
  { tagFilter: '@web' },
);

defineFeature(feature, (test) => {
  let webApp: WebApp;
  let driver: PuppeteerPageDriver;
  let homePage: HomePage;

  beforeAll(async () => {
    driver = await PuppeteerPageDriver.create({ headless: false, slowMo: 50 });
    webApp = new WebApp(driver);
    homePage = webApp.getPageObject('homePage');
  });

  afterAll(async () => {
    await webApp.close();
  });

  test('User creates a new journal', ({ given, and, when, then }) => {
    given('the user is on the homepage page', async () => {
      await webApp.navigateToHomepage();
    });

    and('the form for adding a new journal is visible', async () => {
      const result = await homePage.addJournalFormIsVisible();
      expect(result).toBe(true);
    });

    when(/^the user enters a title of (.*) and content of (.*) and clicks the submit button$/, async (title, content) => {
      await homePage.enterNewJournal(title, content);
      await homePage.submitAddJournalForm();
    });

    then(/^the page should display the title of (.*) and content of (.*)$/, async (title, content) => {
      const firstJournal = await homePage.getFirstJournal();
      expect(firstJournal.title).toBe(title);
      expect(firstJournal.content).toBe(content);
    });
  });
});
