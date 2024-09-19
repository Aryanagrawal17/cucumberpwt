const { Before,Given, When, Then,After } = require("@cucumber/cucumber");
const { chromium, expect} = require("@playwright/test");

let browser;
let page;

// Hooks to initialize browser and page before/after each scenario
// Before(async () => {
//   browser = await chromium.launch({ headless: false });  // Set headless to true if needed
//   const context = await browser.newContext();
//   page = await context.newPage();
// });

// After(async () => {
//   await browser.close();
// });

// Common steps for both scenarios

Given("User navigates to the login link", async () => {
  browser = await chromium.launch({ headless: false }); 
  page = await browser.newPage();
  await page.goto('https://campus.dev.skillsbox.com/');
  await page.waitForLoadState('networkidle');
});

Given("User should see the login page", async () => {
    await expect('#localAccountForm').toBeVisible()
    });

Given("User enters {string} into the email field", async (email) => {
  await page.waitForSelector('//*[@id="email"]', { timeout: 20000 }); 
  await page.fill('//*[@id="email"]', email);
});

Given("User enters {string} into the password field", async (password) => {
  await page.waitForSelector('//*[@id="password"]', { timeout: 20000 });
  await page.fill('//*[@id="password"]', password);
});

Given("User clicks the login button", async () => {
  await page.click('//*[@id="next"]');
});

Then("User should be redirected to the home page", async () => {
  await expect(page).toHaveTitle('Campus');
});

Then("User should see an error message {string}", async (expectedMessage) => {
  const errorLocator = page.locator('.error.pageLevel');
  await expect(errorLocator.first()).toBeVisible();
  await expect(errorLocator.first()).toHaveText(expectedMessage);
});

// Uncommented feature: checking welcome message after successful login
Then("User should see a welcome message {string}", async (welcomeMessage) => {
  const welcomeLocator = page.locator('.welcome-message'); // Modify this selector based on actual page structure
  await expect(welcomeLocator).toHaveText(welcomeMessage);
});

// Scenario for accessing a restricted page without login (if you decide to implement it later)

// Given("User navigates to {string}", async (url) => {
//   await page.goto(`https://campus.dev.skillsbox.com${url}`);
// });

// Then("User should be redirected to the login page", async () => {
//   await expect(page).toHaveTitle('Choose your account');
// });

// Then("User should see an error message {string}", async (errorMessage) => {
//   const errorLocator = page.locator('.error.pageLevel');
//   await expect(errorLocator.first()).toBeVisible();
//   await expect(errorLocator.first()).toHaveText(errorMessage);
// });
