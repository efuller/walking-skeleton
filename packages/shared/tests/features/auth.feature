Feature: Authentication
  As a new user, I want to be able to access protected resources.

  @api
  Scenario: Access protected resources
    Given I am a newly registered user
    When I login with valid credentials
    Then I am able to access protected resources

#  @api
#  Scenario: Protect resources can only be accessed by authenticated users
#    Given I am a new member
#    When I try to access protected resources without logging in
#    Then I should not be able to access protected resources
