import { loadFeature, defineFeature } from 'jest-cucumber';

const feature = loadFeature('./packages/shared/tests/food/e2e/addFood.feature');

defineFeature(feature, (test) => {
  test('Add food', ({ given, when, then }) => {
    given('The app can be accessed', () => {

    });

    when('The user adds a new food called steak', () => {

    });

    then('The user should be able to verify that steak is added to the list', () => {

    });
  });
});