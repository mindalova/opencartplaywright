import {Page, Locator, expect} from '@playwright/test';

export class RegistrationPage {
    private readonly page: Page;

    // Define locators for elements on the registration page
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly privacyPolicyCheckbox: Locator;
    private readonly continueButton: Locator;
    private readonly successMessage: Locator;

    constructor (page: Page) {
        this.page = page;

    // Initialize locators
        this.firstNameInput = page.getByRole('textbox', { name: '* First Name' });
        this.lastNameInput = page.getByRole('textbox', { name: '* Last Name' });
        this.emailInput = page.getByRole('textbox', { name: '* E-Mail' });
        this.passwordInput = page.getByRole('textbox', { name: '* Password' });
        this.privacyPolicyCheckbox = page.locator('input[name="agree"]');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.successMessage = page.getByRole('heading', { name: 'Your Account Has Been Created!' });
    } 
    
    async enterFirstName(firstName: string) {
        await this.firstNameInput.fill(firstName);
    }

    async enterLastName(lastName: string) {
        await this.lastNameInput.fill(lastName);
    }

    async enterEmail(email: string) {
        await this.emailInput.fill(email);
    }       

    async enterPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async acceptPrivacyPolicy() {
        await this.privacyPolicyCheckbox.check();
    }

    async clickContinue() {
        await this.continueButton.click();
    }

    async getSuccessMessage() {
        return await this.successMessage.textContent();
    }

    async completeRegistration(userData: {
        firstName: string, 
        lastName: string, 
        email: string, 
        password: string}): Promise<void>
        {
        await this.enterFirstName(userData.firstName);
        await this.enterLastName(userData.lastName);
        await this.enterEmail(userData.email);
        await this.enterPassword(userData.password);
        await this.acceptPrivacyPolicy();
        await this.clickContinue();
    }

}