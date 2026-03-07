import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost/opencart/upload/';

test('Search returns results and opens product page', async ({ page }) => {
  await page.goto(BASE_URL);

  await page.getByPlaceholder('Search').fill('MacBook');
  await page.locator('button.btn.btn-light.btn-lg').click();

  await expect(page).toHaveURL(/route=product\/search/);

  const productLink = page.getByRole('link', { name: 'MacBook' }).first();
  await expect(productLink).toBeVisible();
  await productLink.click();

  await expect(page.getByRole('heading', { name: 'MacBook' })).toBeVisible();
});

test('Add product to cart and update quantity', async ({ page }) => {
  await page.goto(BASE_URL);

  await page.getByRole('link', { name: /Desktops/i }).click();
  await page.getByRole('link', { name: /Show All Desktops/i }).click();

  await page.getByRole('link', { name: 'MacBook' }).first().click();

  await page.getByRole('button', { name: /add to cart/i }).click();
  await expect(page.locator('.alert-success')).toContainText(/Success/i);

  await page.locator('div.dropdown.d-grid').click();
  await page.getByRole('link', { name: /View Cart/i }).click();

  await expect(page).toHaveURL(/route=checkout\/cart/);

  const qtyInput = page.locator('input[name*="quantity"]').first();
  await qtyInput.fill('2');

  // ако бутонът update не се намира, ще го оправим после
  await page.getByRole('button', { name: 'Update' }).first().click();

  await expect(qtyInput).toHaveValue('2');
  await expect(page.locator('#content')).toContainText(/Total/i);
});

test.only('Guest checkout completes an order', async ({ page }) => {
  await page.goto(BASE_URL);

  await page.getByPlaceholder('Search').fill('MacBook');
  await page.locator('button.btn.btn-light.btn-lg').click();
  await page.getByRole('link', { name: 'MacBook' }).first().click();
  await page.getByRole('button', { name: /add to cart/i }).click();
  await expect(page.locator('.alert-success')).toBeVisible();

  await page.locator('div.dropdown.d-grid').click();
  await page.locator('p.text-end').locator('a').nth(1).click();

  await expect(page).toHaveURL(/route=checkout\/checkout/);

  const guestRadio = page.getByRole('radio', { name: /guest checkout/i });
  if (await guestRadio.isVisible().catch(() => false)) {
    await guestRadio.check();
    await page.getByRole('button', { name: /continue/i }).click();
  }

  await page.getByRole('textbox', { name: 'First Name' }).fill('Test');
  await page.getByRole('textbox', { name: 'Last Name' }).fill('User');
  await page.getByRole('textbox', { name: 'E-Mail' }).fill(`test${Date.now()}@example.com`);
  await page.getByRole('textbox', { name: 'Address 1' }).fill('123 Test St');
  await page.getByRole('textbox', { name: 'City' }).fill('Testville');
  await page.getByRole('textbox', { name: 'Post Code' }).fill('12345');
  await page.getByRole('combobox', { name: 'Country' }).selectOption('Monaco');
  await page.getByRole('combobox', { name: 'Region / State' }).selectOption('Monaco-Ville');

    await page.waitForTimeout(500);

  await page.getByRole('button', { name: /continue/i }).click();
  

  const terms = page.locator('input[name="agree"]');
  if (await terms.isVisible().catch(() => false)) {
    await terms.check();
  }

  const continueButtons = page.getByRole('button', { name: /continue/i });
  for (let i = 0; i < 2; i++) {
    if (await continueButtons.first().isVisible().catch(() => false)) {
      await continueButtons.first().click();
      await page.waitForTimeout(400);
    }
  }

  const confirmBtn = page.getByRole('button', { name: /confirm order/i });

await expect(confirmBtn).toBeVisible();
await expect(confirmBtn).toBeEnabled();

await confirmBtn.click();

  await expect(page).toHaveURL(/route=checkout\/success/);
  await expect(page.getByRole('heading', { name: /your order has been placed/i })).toBeVisible();
});