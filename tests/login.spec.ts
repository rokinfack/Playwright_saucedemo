import { test } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import data from './fixtures/data/users.json';
import { InventoryPage } from './pages/InventoryPage';
let loginPage: LoginPage;

test.beforeEach(async ({page}) => {
  loginPage = new LoginPage(page);
  await loginPage.visit();
  await loginPage.toBe();
})

test.describe('login UX', () => {
  test('should have default UX on start', async ({page}) => {
    await loginPage.validateDefaultUX();
  })

  test('should have Error UX on invalid form', async ({page}) => {
    await loginPage.formComponent.submit()
    await loginPage.validateErrorUX();
  })

});

test.describe('login feature', () => {
  test('should login', async ({ page }) => {
    await loginPage.formComponent.fill(data.success);
    await loginPage.formComponent.submit()
    await new InventoryPage(page).toBe();
  });
  
  test('should not login with wrong credentials', async({page}) => {
    await loginPage.formComponent.fill(data.bad_credential);
    await loginPage.formComponent.submit()
    await loginPage.validateErrorUX();
    await loginPage.formComponent.errorComponent.hasMessage('Username and password do not match any user in this service');
  })
  
  test('should not login with locked user', async({page}) => {
    await loginPage.formComponent.fill(data.locked_user);
    await loginPage.formComponent.submit()
    await loginPage.validateErrorUX();
    await loginPage.formComponent.errorComponent.hasMessage('Sorry, this user has been locked out.');
  })
  
  test('should not login with empty user', async({page}) => {
    await loginPage.formComponent.fill(data.empty_user);
    await loginPage.formComponent.submit()
    await loginPage.validateErrorUX();
    await loginPage.formComponent.errorComponent.hasMessage('Username is required');
  })
  
  test('should not login with empty password', async({page}) => {
    await loginPage.formComponent.fill(data.empty_password);
    await loginPage.formComponent.submit()
    await loginPage.validateErrorUX();
    await loginPage.formComponent.errorComponent.hasMessage('Password is required');
  })
  
  test('should not login with empty credential', async({page}) => {
    await loginPage.formComponent.fill(data.empty_credential);
    await loginPage.formComponent.submit()
    await loginPage.validateErrorUX();
    await loginPage.formComponent.errorComponent.hasMessage('Username is required');
  })
})