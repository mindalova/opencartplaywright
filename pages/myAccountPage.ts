import {Page, expect, Locator} from '@playwright/test';
import { LogoutPage } from './LogoutPage';


export class MyAccountPage {
    private readonly page: Page;

    //Locators for elements on the My Account page
    private readonly myAccountHeader: Locator;
    private readonly logoutLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.myAccountHeader = page.locator('h1:has-text("My Account")');
        this.logoutLink = page.getByRole('link', { name: 'Logout' }).first();

    }

    async verifyMyAccountPage() {
        const isVisible = this.myAccountHeader;
        await expect(this.myAccountHeader).toBeVisible({ timeout: 10_000 });
        if (!isVisible) {
            console.error("My Account header is not visible. Current URL:", this.page.url());
        }
         return isVisible;

    }

    async logout(): Promise<LogoutPage> {
        try{
        await this.logoutLink.click();
        return new LogoutPage(this.page);
        } catch (error) {
            console.log('Error occurred while logging out:', error);
            throw error;
        }
    }

}