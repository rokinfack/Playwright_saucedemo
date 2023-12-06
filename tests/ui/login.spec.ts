import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import data from '../fixtures/data/users.json';
import { InventoryPage } from '../pages/InventoryPage';
let loginPage: LoginPage;

test.use({ storageState: { cookies: [], origins: [] } });

test.beforeEach(async ({page}) => {
  loginPage = new LoginPage(page);
  await loginPage.visit();
  await loginPage.toBe();
})

test.describe('login UI', () => {
  test('Viewport should resize correctly @responsive', async () => {
    await loginPage.validateViewportResize();
  })

  test('should have default Layout on start', async ({page}) => {
    await loginPage.validateDefaultLayout();
  })

  test('should have Error Layout on invalid form', async ({page}) => {
    await loginPage.formComponent.submit()
    await loginPage.validateErrorLayout();
  })

  test('Viewport should resize correctly', async () => {
    await loginPage.validateViewportResize();
  })
});
