Feature: Add Journal Entry
  As a user
  I want to be able to add a new journal entry

  Scenario: Adding a new journal entry
    Given The app can be accessed
    When The user adds a new journal entry of "Today is a great day"
    Then The user should be able to verify that the journal entry is added to the list