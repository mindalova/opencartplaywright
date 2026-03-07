import {test, expect} from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { MyAccountPage } from '../pages/myAccountPage';
import { LogoutPage } from '../pages/LogoutPage';
import { TestConfig } from '../test.config';
import { HomePage } from '../pages/HomePage';

let loginPage: LoginPage;
let myAccountPage: MyAccountPage;
let logoutPage: LogoutPage;
let config: TestConfig;
let homePage: HomePage;

//hook to run before each test
test.beforeEach(async ({page}) => {
    config = new TestConfig();
    await page.goto(config.appUrl);

    //initialize page objects
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    myAccountPage = new MyAccountPage(page);
});
    //close the browser
    test.afterEach(async ({page}) => {
        await page.close();
    });

    test('User login test', async () => {
        //navigate to login page
        await homePage.clickMyAccount();
        await homePage.clickLogin();

        //fill login form
        await loginPage.fillLoginForm(config.email, config.password);
        
        //verify login success by checking My Account page
        const isLoggedin = await myAccountPage.verifyMyAccountPage();  
        expect(isLoggedin).toBeTruthy();
        
});