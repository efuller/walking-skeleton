import { defineFeature, loadFeature } from 'jest-cucumber';

const feature = loadFeature('../../packages/shared/tests/journal/e2e/addJournal.feature');

defineFeature(feature, (test) => {
  test('Adding a new journal entry', ({ given, when, then }) => {
    given('The app can be accessed', () => {

    });

    when(/^The user adds a new journal entry of "(.*)"$/, (arg0) => {
      console.log('title', arg0);
    });

    then('The user should be able to verify that the journal entry is added to the list', () => {

    });
  });
});