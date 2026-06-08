import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('application shell', () => {
  test('loads the dashboard and documentation routes', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: "Tony's Workbench" })).toBeVisible();

    await page.getByRole('link', { name: 'Documentation' }).click();
    await page.getByRole('button', { name: 'Standards' }).click();
    await page.getByRole('link', { name: /Modern Tech Stack/i }).click();

    await expect(page).toHaveURL(/\/docs\/modern-tech-stack$/);
    await expect(page.getByRole('heading', { name: 'Modern Tech Stack' })).toBeVisible();
    await expect(page.getByRole('link', { name: /Testing Guide/i })).toBeVisible();
  });

  test('opens the theme menu and applies a selected theme', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: /Open theme menu/i }).click();
    await expect(page.getByRole('menuitem', { name: /Rose dark/i })).toBeVisible();

    await page.getByRole('menuitem', { name: /Rose dark/i }).click();

    await expect(page.locator('html')).toHaveClass(/app-theme-rose-dark/);
  });

  test('has no automatically detectable accessibility violations on primary pages', async ({
    page
  }) => {
    for (const path of ['/', '/docs/modern-tech-stack', '/docs/testing-guide']) {
      await page.goto(path);

      const results = await new AxeBuilder({ page }).analyze();

      expect(results.violations).toEqual([]);
    }
  });
});
