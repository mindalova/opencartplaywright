import { Page, expect, Locator } from "@playwright/test";

export class HomePage {
    private readonly page: Page;

    // Define locators for elements on the homepage
    readonly logo: Locator;
    readonly myAccountLink: Locator;
    readonly registerLink: Locator;
    readonly loginLink: Locator;    
    readonly searchInput: Locator;
    readonly searchButton: Locator;

     constructor(page: Page) {
        this.page = page;

        // Initialize locators
        this.logo = page.getByRole('img', { name: 'Your Store' });
        this.searchInput=page.getByRole('textbox', { name: 'Search' });
        this.searchButton=page.locator('#cart');
        this.myAccountLink = page.getByRole('link', { name: 'My Account' }).first();
        this.registerLink = page.getByRole('link', { name: 'Register' });
        this.loginLink = page.locator('#top').getByRole('link', { name: 'Login' })

    }

    async goto() {
        await this.page.goto("http://localhost/opencart/upload/index.php?route=common/home&language=en-gb");
    }

    async clickMyAccount() {
        try {             await this.myAccountLink.click();
        }     catch (error) {
            console.error("Error clicking My Account link:", error);
            throw error; // Rethrow the error to fail the test
        }}

    async clickRegister() {
        try {
            await this.registerLink.click();
        } catch (error) {
            console.error("Error clicking Register link:", error);
            throw error; // Rethrow the error to fail the test
        }}

    async clickLogin() {
        try {
            await this.loginLink.click();
        } catch (error) {
            console.error("Error clicking Login link:", error);
            throw error; // Rethrow the error to fail the test
        }   
    }


}