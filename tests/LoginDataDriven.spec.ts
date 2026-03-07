import {test, expect} from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { MyAccountPage } from '../pages/myAccountPage';
import { DataProvider } from '../utils/dataProvider';
import { TestConfig } from '../test.config';
import { HomePage } from '../pages/HomePage';

//Load JSON test data from file

const jsonPath = "testdata/logindata.json";

const jsonTestData = DataProvider.getTestDataFromJson(jsonPath);
let loginPage: LoginPage;
let myAccountPage: MyAccountPage;

let homePage: HomePage;



for (const data of jsonTestData) {
    test (`Login test with JSON data: ${data.email} and ${data.password}`, async ({page}) => {
       let config: TestConfig = new TestConfig();
        const homePage = new HomePage(page); 
        await page.goto(config.appUrl);
        await homePage.clickMyAccount();
            await homePage.clickLogin();

        const loginPage = new LoginPage(page);
        await loginPage.fillLoginForm(data.email, data.password);

        if (data.expected.toLowerCase() === "success") {
            
            const myAccountPage = new MyAccountPage(page);
           const isLoggedIn = await myAccountPage.verifyMyAccountPage();
           expect(isLoggedIn).toBeTruthy();
        } 
        else if (data.expected.toLowerCase() === "failure") {
            const errorMessage = await loginPage.errormessage.textContent();
            expect(errorMessage).toContain("Warning: No match for E-Mail Address and/or Password.");
        }       
        
    })};

