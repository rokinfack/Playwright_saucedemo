# Playwright E2E Testing Project for saucedemo.com

Hello! This is my E2E testing project for [soucedemo.com](soucedemo.com) using Playwright and TypeScript! I developed this project as part of my learning journey in test automation.

The workflow, defined in the `.github/workflows/playwright.yml` file, executes Playwright tests on specified browsers and operating systems. After the test execution, Playwright generates a comprehensive report detailing both passed and failed scenarios. The GitHub Actions workflow is set up to automatically publish this Playwright test report to GitHub Pages.

This integration ensures that the latest Playwright test results are readily available, providing transparency and visibility into the testing process.

The generated report, showcasing insights into the results of the Playwright tests, is accessible at [ecureuill.github.io/saucedemo-playwright](ecureuill.github.io/saucedemo-playwright).

## Technologies Used

- **Playwright**: A versatile library tailored for browser automation with a focus on reliability.
- **TypeScript**: A statically typed superset of JavaScript.
- **npm**: The package manager for JavaScript.

## Project Structure

The project adopts a structured approach to maintainability and scalability. Here's an overview of the project's directory structure:

```bash
saucedemo/
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
│   ├── e2e/
│   │   └── login.spec.ts
│   │   └── ... 
│   ├── ui/
│   │   └── login.spec.ts
│   │   └── ... 
│   ├── visual/
│   │   └── visual.spec.ts
│   └── auth.setup.ts
├── playwright.config.js
├── node_modules/
├── package.json
├── tsconfig.json
└── ...
```
## Types of Tests

### 1. End-to-End (E2E) Tests

E2E tests, located in `e2e/`, aim to verify the complete functionality of the application. They cover scenarios such as user authentication, navigation, and interactions with different pages. 

Check all scenarios [here](/e2e.md).

### 2. Visual Snapshot Tests

Visual snapshot tests, located in the `visual/` directory, play a crucial role in ensuring the visual consistency of the application across various test runs. Leveraging Playwright's powerful screenshot capabilities, these tests capture valid screenshots while navigating through the site in the context of a `standard_user`. Subsequently, the application's interface is tested against these baseline screenshots, this time with the user logged in as `visual_user`. This comparison process helps identify and verify any changes in the interface, ensuring a consistent and visually appealing user experience.

### 2. User Interface (UI) Tests

The UI tests, located in the `ui/` directory, are designed to scrutinize essential aspects such as usability, layout integrity, responsiveness, and the visual aesthetics of the application. In this initial version, responsiveness is assessed by simulating window resizing, and the integrity of the layout is validated. In upcoming versions, the testing scope will be expanded to delve deeper into these initiated aspects, while also addressing additional facets for a more comprehensive evaluation of the application's user interface. 

Check all scenarios [here](/ui.md).


## Page Objects and Componentization

The project embraces the Page Object pattern to encapsulate interactions with various pages of the SouceDemo website. Page objects are organized under the `pages/` directory, making the test code more readable, maintainable, and less prone to duplication.

Example of a Page Object (`LoginPage.ts`):

```typescript
export class LoginPage extends BasePage {
    // Implementation of page interactions
}
```

The project also incorporates a `components/` directory to house reusable components like `FooterComponent.ts`, promoting a modular and efficient approach to building and maintaining tests.

## Fixtures and Data

Data used in tests is organized under the `fixtures/` directory. This includes a `model.ts` file for defining data models and a `data/` directory housing various JSON files containing test data.


## State Maintenance

To maintain the logged-in state of the website and access protected pages, the framework utilizes a `.storeState()` function located in `auth.setup.ts`. This function stores the authentication credentials in a secure location, allowing subsequent tests to seamlessly navigate through the application without requiring repetitive logins.

## Test Execution

1. Navigate to the project directory:

   ```bash
   cd saucedemo
   ```

1. Install dependencies:

   ```bash
   npm install
   ```

1. Run the tests:

   ```bash
   npx playwright test
   ```

## HTML reporter

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

I'm learning, so if you find anything interesting or peculiar, I'd love to discuss! Feel free to open issues or propose improvements.
