markdown
# Embark Automation Framework

## Overview
This is a Playwright-based automation framework written in JavaScript for testing the Embark website (https://www.embark.org). The framework automates user registration, login, hosting an adventure, tour creation, and wishlist functionalities, using a Page Object Model (POM) architecture and Excel-driven test data.

## Features
- Playwright + JavaScript test automation
- Page Object Model design for maintainability
- Test data driven from Excel files (`.xlsx`)
- Random user data generation for registration
- HTML reporting with screenshots on test steps
- Logging of test execution details using Winston logger
- Cross-platform support for file paths (macOS, Windows, Linux)
- Supports running tests on Chromium browser

## Project Structure

playwright-embark-framework/
├── tests/                     # Test spec files
│   └── embark.spec.js         # Main workflow test case
├── pages/                     # Page Object Model classes
│   ├── RegisterPage.js
│   ├── LoginPage.js
│   ├── DashboardPage.js
│   ├── AdventurePage.js
│   └── TourViewPage.js
├── utils/                     # Helper utilities
│   ├── randomGen.js           # Random user data generator
│   ├── testData.js            # Excel and JSON data reader
│   ├── excelReader.js         # Excel reading utility with path normalization
│   ├── logger.js              # Logger setup using Winston
│   └── userStore.js           # Save/fetch generated user credentials
│   └── user.json              # Store Last registered users data
├── testdata/                  # Test data files
│   └── hostadventure.xlsx     # Excel file with Host an Adventure input data
│   └── tourData.xlsx          # Excel file with tour details input data
│   └── lastRegistredUser.json # Last Registered user's data
├── reports/                   # Generated reports
├── screenshots/               # Screenshots captured during tests
├── playwright.config.js       # Playwright configuration file
├── package.json               # Project dependencies and scripts
└── README.md                  # This documentation file


## Prerequisites
- Node.js (version 16 or later recommended)
- npm or yarn package manager
- VSCode Editor
- Internet access for navigating the Embark website

## Setup Instructions
1. Clone the Repo
    npm init -y
2. Install dependencies:  
    npm install
    npm i -D @playwright/test xlsx fs-extra
    npm i winston
    npx playwright install
    npm install @faker-js/faker
3. Place your test data Excel files inside the `testdata/` folder.

## Running Tests
Run all tests with:  
npx playwright test

Generate and view HTML reports after test run:  
npx playwright show-report

## Test Data
- The primary test input data comes from an Excel file in the `testdata` folder.
- Image file paths in the Excel file should be provided as relative paths using forward slashes (`/`) or as absolute OS-specific paths.
- Image paths will be normalized automatically by the framework to work across Mac, Windows, and Linux.

## Logging and Reporting
- Test execution logs are printed to the console using Winston logger.
- HTML reports with detailed step screenshots are generated under the `reports/html` folder automatically.

## Extending the Framework
- Add more Page Object files under the `pages/` folder as needed.
- Implement additional test cases inside the `tests/` folder.
- Add utility functions in the `utils/` folder for reusable helpers.
- Modify or extend Excel test data for broader coverage.

## Troubleshooting
- Ensure image paths in Excel correctly point to existing files.
- Match CSS selectors in Page Object files to the current Embark website DOM.
- Use the Playwright Trace Viewer if tests fail to diagnose UI issues.

## Contributing
Contributions are welcome. Please fork the repository and create pull requests for any improvements or bug fixes related to Playwright automation.

## License
This project is licensed under the MIT License.

---

**Maintainers**  
- Vishal Dodiya

---

For further details or issues, please contact the maintainer or open an issue on the GitHub repository.