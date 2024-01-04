Feature: Journaling
  As a user I should be able to create, edit, and delete journal entries

  @api
  Scenario Outline: User sends data to create a new journal
    Given the backend API is accessible
    When a user sends a POST request to the "/journal" endpoint with a title of <title> and content of <content>
    Then the API should respond with a status code of 201
    And the response should contain title of <title> and content of <content>

    Examples:
      | title       | content                |
      | Test Journal| Sample journal content |