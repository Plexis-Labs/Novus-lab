/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment */
import { defineConfig, devices } from '@playwright/test'

// @ts-expect-error: process is globally injected by Node.js at runtime
const isCI = !!process.env.CI

export default defineConfig({
  testDir: './tests/e2e',

  /* Maximum time one test can run */
  timeout: 30_000,

  /* Maximum time for expect() */
  expect: {
    timeout: 5_000,
  },

  /* Run all tests in parallel where possible */
  fullyParallel: true,

  /* Prevent accidentally committing test.only */
  forbidOnly: isCI,

  /* Retry only in CI */
  retries: isCI ? 2 : 0,

  /* Playwright strict types require number or string, not undefined */
  workers: isCI ? 1 : '50%',

  /* Reports */
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
  ],

  use: {
    // @ts-expect-error: process is globally injected by Node.js at runtime
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000',

    headless: isCI,

    actionTimeout: 10_000,

    navigationTimeout: 15_000,

    trace: 'on-first-retry',

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',

    ignoreHTTPSErrors: true,
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],

  outputDir: 'test-results/artifacts',
})
