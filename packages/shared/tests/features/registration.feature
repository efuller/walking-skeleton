Feature: Registration
  As a new user, I want to be registered as a new member in the system

  @web
  Scenario: Successful member creation
    Given I have registered as a new user
    When I am redirected to the creating account page
    Then I am redirected to the dashboard
    And My member email is present on the page

#  @api
#  Scenario: Create new member using the API
#    Given I am a new user
#    And I am logged in
#    When I request to create a member account
#    Then I am able to retrieve that member account by email
