const { test, expect } = require('@playwright/test');
const { RegisterPage } = require('../pages/RegisterPage');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { AdventurePage } = require('../pages/AdventurePage');
const { TourViewPage } = require('../pages/TourViewPage');
const { readExcel } = require('../utils/testData');
const { generateUser } = require('../utils/randomGen');
const logger = require('../utils/logger');
const { saveUser, fetchUser } = require('../utils/userStore');

test('Embark E2E Tour Workflow', async ({ browser }) => {
  logger.info('Test Started: Embark Workflow');

  
  // ---------------- PHASE 1: Registration ----------------
  const context1 = await browser.newContext();
  const page1 = await context1.newPage();
  
  await page1.goto("/", {waitUntil: "domcontentloaded"});
  logger.info('Navigated to Embark site for registration');

  const user = generateUser();
  saveUser(user); // Save credentials to JSON
  logger.info(`Registered user - Username: ${user.username}, Email: ${user.email}, Password: ${user.password}`);

  const registerPage = new RegisterPage(page1);
  await registerPage.gotoSignUp();
  await registerPage.register(user);
  logger.info('User registration completed');
  await page1.waitForURL("https://www.embark.org/");

  await context1.close(); // Close browser session after registration
  logger.info('Registration browser closed');


  // ---------------- PHASE 2: Fresh Login ----------------
  const context2 = await browser.newContext();
  const page2 = await context2.newPage();


  await page2.goto("/", {waitUntil: "domcontentloaded"});
  logger.info('Navigated to Embark site for login');

  const loginPage = new LoginPage(page2);

  // Fetch user from JSON (not memory)
  const storedUser = fetchUser();
  if (!storedUser) throw new Error('No stored user found. Run registration first.');

  await loginPage.gotoLoginPage();
  await loginPage.login(storedUser);
  await page2.waitForURL("https://www.embark.org");
  logger.info('User logged in with stored credentials');


  // ---------------- Continue User Journey ----------------
  const dashboardPage = new DashboardPage(page2);
  await dashboardPage.clickHostAdventure();
  logger.info('Clicked "Host an Adventure"');

  const testData = readExcel('./testdata/hostanadventure.xlsx'); 
  const tourData = testData['Sheet1'][0];   // <-- first row from Sheet1

  const adventurePage = new AdventurePage(page2);
  // Fill "Choose categories", "Choose difficulty", location
  await adventurePage.fillTourDetails(tourData);

  const validationMsg = await adventurePage.getValidationMessage();
  expect(validationMsg).toContain('The group size max field is required.');
  logger.info('Group Size validation message verified');

  // Fill Min and Max group size with values from Excel
  await adventurePage.enterGroupSize(tourData.GroupSizeMin, tourData.GroupSizeMax);



  const tourDetails = readExcel('./testdata/tourData.xlsx');
  logger.info(`Excel Data Loaded: Sheets -> ${Object.keys(tourDetails).join(', ')}`);

  await adventurePage.fillSections(tourDetails);
  logger.info('Filled all sections from Excel data');


  const successMsg = await adventurePage.getSuccessMessage();
  expect(successMsg).toContain('Tour updated successfully');
  logger.info('Tour update success message verified');

  const [tourPage] = await Promise.all([
    context2.waitForEvent('page'),
    page2.click('text=View Tour')
  ]);
  await tourPage.bringToFront();

  const tourViewPage = new TourViewPage(tourPage);
  const isDetailsValid = await tourViewPage.verifyTourDetails(tourData);
  expect(isDetailsValid).toBe(true);
  logger.info('Tour details verified in new tab');

  await tourViewPage.saveToWishlist();
  const wishlistMsg = await tourViewPage.wishlistIsSaved();
  expect(wishlistMsg).toContain('Saved to your Wishlist');
  logger.info('"Save to Wishlist" functionality verified');

  await tourPage.close();
  await page2.bringToFront();
  await page2.click('text=Logout');
  logger.info('Logged out from the site');

  await expect(page2).toHaveURL('https://www.embark.org/');
  logger.info('Logout verification complete');

  await context2.close(); // Final cleanup
});