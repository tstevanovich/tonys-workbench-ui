import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  expect: {
    timeout: 10_000
  },
  fullyParallel: false,
  forbidOnly: Boolean(process.env['CI']),
  retries: process.env['CI'] ? 2 : 0,
  workers: 1,
  reporter: process.env['CI'] ? [['html'], ['github']] : 'html',
  webServer: {
    command: 'npm run start -- --host 127.0.0.1 --port 4201',
    reuseExistingServer: !process.env['CI'],
    timeout: 120_000,
    url: 'http://127.0.0.1:4201'
  },
  use: {
    baseURL: 'http://127.0.0.1:4201',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
});
