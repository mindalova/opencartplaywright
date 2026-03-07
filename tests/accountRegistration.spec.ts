import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage123';
import { RegistrationPage } from '../pages/registrationPage';
import { TestConfig } from '../test.config';
import { RandomDataUil } from '../utils/randonDataGenerator';

/* test('User Registration', async ({ page }) => {
  const config = new TestConfig();
  await page.goto(config.appUrl);

  const homePage = new HomePage(page);
  await homePage.clickMyAccount();
  await homePage.clickRegister();

  const registrationPage = new RegistrationPage(page);
  await registrationPage.enterFirstName(RandomDataUil.getFirstName());
  await registrationPage.enterLastName(RandomDataUil.getLastName());
  await registrationPage.enterEmail(RandomDataUil.getEmail());
  const password = RandomDataUil.getPassword();
  await registrationPage.enterPassword(password);

  await registrationPage.acceptPrivacyPolicy();
  await registrationPage.clickContinue();

  const successMessage = await registrationPage.getSuccessMessage();
  expect(successMessage).toContain('Your Account Has Been Created!');

  await page.waitForTimeout(3000); // Wait for 2 seconds to observe the result
});
 */