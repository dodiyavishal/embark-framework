const { devices } = require('@playwright/test');

module.exports = {
  timeout: 90000,
  retries: 1,
  reporter: [['html', { outputFolder: 'reports/html', open: 'never' }]],
  use: {
    baseURL: 'https://www.embark.org/',
    screenshots: 'only-on-failure',  // capture only when test fails
    trace: 'retain-on-failure'
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } }
    // { name: 'firefox', use: { ...devices['Desktop Firefox'] } }
  ]
};