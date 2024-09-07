Feature: Journaling
  As a user I should be able to create, edit, and delete journal entries

  @api
  Scenario Outline: Logged in user creates a new journal
    Given I am a logged in user
    When I send a POST request to the "/journal" endpoint with a title of <title> and content of <content>
    Then I should be able to fetch the journal entry

    Examples:
      | title       | content                |
      | Test Journal| Sample journal content |

  @web
  Scenario: Registered user creates a new journal
    Given I am a logged in user
    And the form for adding a new journal is visible
    When I enter a new journal
    Then the page should display the journal
