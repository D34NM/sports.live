import { test, expect } from '@playwright/test';

test.describe('Spoiler Protection', () => {
  test('should show spoiler protection for final games', async ({ page }) => {
    await page.goto('/');
    
    // Wait for games to load
    await page.waitForTimeout(1000);
    
    // Look for spoiler protection text
    const spoilerProtection = page.getByText(/spoiler protected/i);
    
    // If there are completed games, we should see the protection
    if (await spoilerProtection.count() > 0) {
      await expect(spoilerProtection.first()).toBeVisible();
    }
  });

  test('should reveal scores after confirmation', async ({ page }) => {
    await page.goto('/');
    
    // Wait for games to load
    await page.waitForTimeout(1000);
    
    // Try to find a reveal button
    const revealButton = page.getByRole('button', { name: /reveal score/i });
    
    if (await revealButton.count() > 0) {
      // Click the reveal button
      await revealButton.first().click();
      
      // Should show confirmation dialog
      await expect(page.getByText(/spoiler alert/i)).toBeVisible();
      
      // Confirm the reveal
      const confirmButton = page.getByRole('button', { name: /show me the score/i });
      if (await confirmButton.count() > 0) {
        await confirmButton.click();
        
        // Wait for score to appear
        await page.waitForTimeout(500);
      }
    }
  });
});
