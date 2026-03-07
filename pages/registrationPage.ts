import {Page, expect, Locator} from '@playwright/test';

export class RegistrationPage {
    private readonly page: Page;

    // Define locators for elements on the registration page
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly email: Locator;
    readonly password: Locator;
    readonly privacyPolicyCheckbox: Locator;
    readonly continueButton: Locator;
    readonly successMessage: Locator;


    constructor (page: Page) {
        this.page = page;
        this.firstName = page.getByRole('textbox', { name: 'First Name' });
        this.lastName = page.getByRole('textbox', { name: 'Last Name' });
        this.email = page.getByRole('textbox', { name: 'E-Mail' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.privacyPolicyCheckbox = page.locator('[name="agree"]');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.successMessage = page.getByRole('heading', { name: 'Your Account Has Been Created!' });
    }

    async navigateToRegistrationPage() {
        await this.page.goto('https://demo.opencart.com/index.php?route=account/register');
    }

    async fillRegistrationForm(firstName: string, lastName: string, email: string, password: string) { 
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.email.fill(email);
        await this.password.fill(password);
    }


async submitRegistrationForm() {        await this.privacyPolicyCheckbox.check();
        await this.continueButton.click();
    }

}