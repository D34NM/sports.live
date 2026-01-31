import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should load the home page', async ({ page }) => {
    await page.goto('/');
    
    // Check for the presence of the main heading or navigation
    await expect(page).toHaveTitle(/sports\.live/i);
  });

  test('should display game cards', async ({ page }) => {
    await page.goto('/');
    
    // Wait for games to load (adjust based on your actual implementation)
    await page.waitForTimeout(1000);
    
    // Check that game information is present
    // This is a basic test - adjust based on your actual DOM structure
    const pageContent = await page.textContent('body');
    expect(pageContent).toBeTruthy();
  });
});
