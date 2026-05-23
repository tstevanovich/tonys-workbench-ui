import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('application shell', () => {
  test('loads the dashboard and documentation routes', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: "Tony's Workbench" })).toBeVisible();

    await page.getByRole('link', { name: 'Documentation' }).click();
    await page.getByRole('link', { name: /Modern Tech Stack/i }).click();

    await expect(page).toHaveURL(/\/docs\/modern-tech-stack$/);
    await expect(page.getByRole('heading', { name: 'Modern Tech Stack' })).toBeVisible();
    await expect(page.getByRole('link', { name: /Testing Guide/i })).toBeVisible();
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
