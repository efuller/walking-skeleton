Feature: Registration
  As a new user, I want to be registered as a new member in the system

  @web
  Scenario: Successful registration
    Given I am a new user
    When I register with valid credentials
    Then My member profile is loaded
    Then I am redirected to the dashboard
    And My member email is present on the page

  @api
  Scenario: Verify member creation details
    Given I am a newly registered user
    When I request my member account details by email
    Then I am able to see my member account details
