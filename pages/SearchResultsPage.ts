import {Locator, Page, expect} from "@playwright/test";

export class SearchResultsPage {
    private readonly page: Page;

    //Locators for elements on the search results page
    private readonly searchPageHeader: Locator;
    private readonly searchProducts: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchPageHeader = page.locator('#content h1');
        this.searchProducts = page.locator('#content h4');
    }

    async verifySearchResultsPage(): Promise<boolean> {
        try {
            await expect(this.searchPageHeader).toBeVisible({ timeout: 10_000 });
            return true;
        } catch (error) {
            console.error("Search results page header is not visible. Current URL:", this.page.url());
            return false;
        }
}

    async isProductExist(productName: string): Promise<boolean> {
        try {
            const count = await this.searchProducts.count();
            for (let i = 0; i < count; i++) {
                const productText = await this.searchProducts.nth(i).textContent();
                if (productText && productText.trim() === productName) {
                    return true;
                }
            }
            return false;
        } catch (error) {
            console.error("Error checking if product exists:", error);
            return false;
        }
    }
}