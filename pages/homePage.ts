import {Page, expect, Locator} from '@playwright/test';


export class HomePage{
    private readonly page: Page;

    // Define locators for elements on the homepage
    private readonly myAccountLink: Locator;
    private readonly registerLink: Locator;
    private readonly linkLogin: Locator;



    constructor(page: Page) {
        this.page = page;
        // Initialize locators
        this.myAccountLink = page.getByText('My Account').first();
        this.registerLink = page.locator('.dropdown-item').filter({hasText:'Register'});
        this.linkLogin = page.getByRole('link', { name: 'Login' })
    }

    async goto() {
        await this.page.goto("http://localhost/opencart/upload/index.php?route=common/home&language=en-gb");
    }

    async clickMyAccount() {
        try {            
            await this.myAccountLink.click();}
        catch (error) {
            console.error("Error clicking My Account link:", error);
            throw error; // Rethrow the error to fail the test
        }
    }

    async clickRegister() {
        try {
            await this.registerLink.click();
        } catch (error) {
            console.error("Error clicking Register link:", error);
            throw error; // Rethrow the error to fail the test
        }
    }

        async clickLogin() {
            try {
                await this.linkLogin.click();
            } catch (error) {
                console.error("Error clicking Login link:", error);
                throw error; // Rethrow the error to fail the test
            }
    }

        async isHomePage(): Promise<boolean> {
            try {
                await expect(this.page).toHaveURL(/.*index\.php\?route=common\/home.*/);
                return true;
            } catch (error) {
                console.error("Error verifying homepage URL:", error);
                return false;
            }
        }

        async clickSearch()




}