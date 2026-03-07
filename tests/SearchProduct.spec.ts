import {test, expect} from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { TestConfig } from '../test.config';

let homePage: HomePage;
let searchResultsPage: SearchResultsPage;
let config: TestConfig; 

test.beforeEach(async ({page}) => {
    config = new TestConfig();
    await page.goto(config.appUrl);
    homePage = new HomePage(page);
    searchResultsPage = new SearchResultsPage(page);
});

test.afterEach(async ({page}) => {
    await page.close();
});

test('Search for a product and verify results', async () => {
    // Search for a product
    const productName = config.productName;
    await homePage.