Feature: User Authentication tests

  Background:
    Given User navigates to the login link
    And User should see the login page

  Scenario: User successfully logs in with valid credentials
    Given User enters "lakshay.grover+dev-01@skillsbox.com" into the email field
    And User enters "Letmein01*" into the password field
    And User clicks the login button
    Then User should be redirected to the home page

  Scenario: User fails to log in with invalid credentials
    Given User enters "lakshay.grover+dev-01@skillsbox.com" into the email field
    And User enters "invalid_password" into the password field
    And User clicks the login button
    Then User should see an error message "Invalid email or password."

