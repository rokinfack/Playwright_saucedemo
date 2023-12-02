# Playwright E2E Testing Project for saucedemo.com

Welcome to the E2E Testing Project for [saucedemo.com](https://www.saucedemo.com/) utilizing Playwright and TypeScript!

## Overview

This E2E testing project employs Playwright, a robust Node library designed for browser automation, coupled with TypeScript to ensure a modern and statically-typed development experience. As a QA professional, this project focuses on maintaining the integrity and reliability of the SouceDemo website through comprehensive end-to-end testing.

## Technologies Used

- **Playwright**: A versatile library tailored for browser automation with a focus on reliability.
- **TypeScript**: A statically typed superset of JavaScript.
- **npm**: The package manager for JavaScript.

## Project Structure

The project adopts a structured approach to maintainability and scalability. Here's an overview of the project's directory structure:

```
playwright-e2e-soucedemo/
├── tests/
│   ├── components/
│   │   ├── FooterComponent.ts
│   │   └── ...
│   ├── fixtures/
│   │   ├── model.ts
│   │   └── data/
│   │       ├── cart.json
│   │       ├── checkout.json
│   │       ├── products.json
│   │       └── users.json
│   ├── pages/
│   │   ├── LoginPage.ts
│   │   └── ...
│   ├── auth.setup.ts
│   └── login.spec.ts
│   └── ...
├── playwright.config.js
├── node_modules/
├── package.json
├── tsconfig.json
└── ...
```

### Key Directories and Files:

- tests/components/: Reusable components like FooterComponent.ts.
- tests/fixtures/: Data models (model.ts) and test data in the data/ directory.
- tests/pages/: Page objects such as LoginPage.ts.
- tests/auth.setup.ts: Configuration for maintaining the logged-in state.
- tests/*.spec.ts: Test specifications.
- playwright.config.js: Configuration file for the Playwright test environment.

## Page Objects and Componentization

The project embraces the Page Object pattern to encapsulate interactions with various pages of the SouceDemo website. Page objects are organized under the `pages/` directory, making the test code more readable, maintainable, and less prone to duplication.

Example of a Page Object (`LoginPage.ts`):

```typescript
export class LoginPage {
    // Implementation of page interactions
}
```

The project also incorporates a `components/` directory to house reusable components like `FooterComponent.ts`, promoting a modular and efficient approach to building and maintaining tests.

## Fixtures and Data

Data used in tests is organized under the `fixtures/` directory. This includes a `model.ts` file for defining data models and a `data/` directory housing various JSON files containing test data.

Example of a data file (`cart.json`):

```json
{
  "item": "Sample Product",
  "quantity": 2
}
```

## State Maintenance

To maintain the logged-in state of the website and access protected pages, the framework utilizes a `.storeState()` function located in `auth.setup.ts`. This function stores the authentication credentials in a secure location, allowing subsequent tests to seamlessly navigate through the application without requiring repetitive logins.

## Test Execution

1. Open `auth.setup.ts` and provide SouceDemo credentials.
2. Navigate to the project directory:

   ```bash
   cd saucedemo
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the tests:

   ```bash
   npx playwright test
   ```

## HTML reporter

HTML reporter

HTML reporter produces a self-contained folder that contains report for the test run that can be served as a web page.

```bash
npx playwright test --reporter=html
```

By default, HTML report is opened automatically if some of the tests failed. You can control this behavior via the open property in the Playwright config or the `PW_TEST_HTML_REPORT_OPEN` environmental variable. The possible values for that property are `always`, `never` and `on-failure` (default).

## Trace viewer

You can open the saved trace using the Playwright CLI or in your browser on [trace.playwright.dev](trace.playwright.dev). Make sure to add the full path to where your trace.zip file is located. This should include the full path to your trace.zip file.

```bash
npx playwright show-trace path/to/trace.zip
```

## Playwright Configuration

The `playwright.config.js` file configures the Playwright test environment. It specifies settings such as browsers to use, context options, and additional configurations needed for test execution.

## Contribution

Contributions are welcomed! Please feel free to open issues or submit pull requests. Your feedback and contributions are invaluable in ensuring the effectiveness and robustness of our E2E testing efforts.
