import {test, expect} from '@playwright/test';
import {TestConfig} from '../test.config';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/myAccountPage';
import { LogoutPage } from '../pages/LogoutPage';
import { log } from 'node:console';

//shared variables
let config: TestConfig;
let homePage: HomePage;
let loginPage: LoginPage;
let myAccountPage: MyAccountPage;
let logoutPage: LogoutPage;

//before each test, initialize the page objects and navigate to the login page
test.beforeEach(async ({page}) => {
    config = new TestConfig();
    await page.goto(config.appUrl);

    // Initialize page objects
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    myAccountPage = new MyAccountPage(page);
    logoutPage = new LogoutPage(page);
});

test.afterEach(async ({page}) => {
    await page.close();
});

test('Logout Test @master @regression', async ({page}) => {
    // Navigate to login page and perform login
    await homePage.clickMyAccount();
    await homePage.clickLogin();
    await loginPage.fillLoginForm(config.email, config.password);
    // Verify successful login
    const isLoggedIn = await myAccountPage.verifyMyAccountPage();
    expect(isLoggedIn).toBeTruthy();

    // Perform logout
    await myAccountPage.logout();
    // Verify successful logout
    const isLoggedOut = await logoutPage.isContinueButtonVisible();
    expect(isLoggedOut).toBeTruthy();

    homePage = await logoutPage.clickContinue();
    const isHomePage = await homePage.isHomePage();
    expect(isHomePage).toBeTruthy();

});  