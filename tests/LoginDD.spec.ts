import {test, expect} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/myAccountPage';


const users = [
    {testName: 'Valid Login', username: 'petya@mail.com', password: '123456', expectedResult: 'success'},
    {testName: 'Invalid Login - Wrong Password', username: 'petya@mail.com', password: 'wrongpassword', expectedResult: 'failure-password'},
    {testName: 'Invalid Login - Wrong Username', username: 'wronguser@mail.com', password: '123456', expectedResult: 'failure-username'},
]

let loginPage: LoginPage;
let myAccountPage: MyAccountPage;

for (const u of users) {

    test(u.testName, async ({page}) => {
          await page.goto('http://localhost/opencart/upload/index.php?route=account/login&language=en-gb');
        const loginPage = new LoginPage(page);
        const myAccountPage = new MyAccountPage(page);

        await loginPage.fillLoginForm(u.username, u.password);

        if (u.expectedResult === 'success') {
            const isLoggedIn = await myAccountPage.verifyMyAccountPage();
            expect(isLoggedIn).toBeTruthy();
        }
        else if (u.expectedResult ==='failure-password') {
            const errorMessage = await loginPage.errormessage.textContent();
            expect(errorMessage).toContain("Warning: No match for E-Mail Address and/or Password.");
        }

          
    
    
    });}