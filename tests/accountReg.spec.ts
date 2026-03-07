import {test, expect} from '@playwright/test';
import {HomePage} from '../pages/homePage';
import {RegistrationPage} from '../pages/registrationPage';
import {TestConfig} from '../test.config';
import {RandomDataUil} from '../utils/randonDataGenerator';

test ('Registration Test', async ({page}) => {
 const config = new TestConfig();
    await page.goto(config.appUrl);

    const homePage = new HomePage(page);
    await homePage.clickMyAccount();
    await homePage.clickRegister();

    const accountRegigster = new RegistrationPage(page);
    await accountRegigster.fillRegistrationForm(RandomDataUil.getFirstName(), RandomDataUil.getLastName(), RandomDataUil.getEmail(), RandomDataUil.getPassword());
    await accountRegigster.submitRegistrationForm();

    await expect(accountRegigster.successMessage).toHaveText('Your Account Has Been Created!');
    
});

