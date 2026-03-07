import {Page, expect, Locator} from '@playwright/test';

export class LoginPage {
    private readonly page: Page;

    // Define locators for elements on the login page
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator
    readonly errormessage: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators

        this.emailInput = page.getByRole('textbox', { name: 'E-Mail Address' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.errormessage = page.locator('.alert.alert-danger.alert-dismissible');

    }

    async navigateToLoginPage() {
            await this.page.goto('https://demo.opencart.com/index.php?route=account/login');
        }

        async fillLoginForm(email: string, password: string) {
            await this.emailInput.fill(email);
            await this.passwordInput.fill(password);
            await this.loginButton.click();
        }



    }