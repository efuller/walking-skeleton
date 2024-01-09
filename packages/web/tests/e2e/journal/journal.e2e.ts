import { defineFeature, loadFeature } from 'jest-cucumber';
import path from 'path';
import { PuppeteerPageDriver } from '../../shared/webDriver/puppeteerPageDriver';
import { App, WebApp } from '../../shared/app/app';

const feature = loadFeature(
  path.join(__dirname, '../../../../../packages/shared/tests/journal/e2e/addJournal.feature'),
  { tagFilter: '@web' },
);

defineFeature(feature, (test) => {
  let webApp: App;
  let driver: PuppeteerPageDriver;

  beforeAll(async () => {
    driver = await PuppeteerPageDriver.create({ headless: false });
    webApp = new WebApp(driver);
  });

  afterAll(async () => {
    await webApp.close();
  });

  test('User creates a new journal', ({ given, and, when, then }) => {
    given('the user is on the homepage page', async () => {
      await webApp.pages.homePage.navigate();
      await webApp.pause();
    });

    and('the form for adding a new journal is visible', async () => {
      const form = await webApp.pages.homePage.getAddJournalForm();
      expect(form).not.toBeNull();
    });

    when(/^the user enters a title of (.*) and content of (.*) and clicks the submit button$/, () => {});

    then(/^the page should display the title of (.*) and content of (.*)$/, () => {});
  });
});
