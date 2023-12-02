import {test as setup} from "@playwright/test";
import { LoginPage } from "./pages/LoginPage";
import data from "./fixtures/data/users.json";
import { STORAGE_STATE_DEFAULT_USER, STORAGE_STATE_PERFORMANCE_USER, STORAGE_STATE_ERROR_USER, STORAGE_STATE_PROBLEM_USER, STORAGE_STATE_VISUAL_USER } from "../playwright.config";
let loginPage: LoginPage;

setup('authenticate default user', async({page}) => {
  loginPage = new LoginPage(page);
  await loginPage.visit();
  await loginPage.formComponent.fill(data.success);
  await loginPage.formComponent.submit();
  await page.waitForLoadState('networkidle');

  await page.context().storageState({path: STORAGE_STATE_DEFAULT_USER});
})

setup('authenticate visual user', async({page}) => {
  loginPage = new LoginPage(page);
  await loginPage.visit();
  await loginPage.formComponent.fill(data.visual_user);
  await loginPage.formComponent.submit();
  await page.waitForLoadState('networkidle');

  await page.context().storageState({path: STORAGE_STATE_VISUAL_USER});
})

setup('authenticate problem user', async({page}) => {
  loginPage = new LoginPage(page);
  await loginPage.visit();
  await loginPage.formComponent.fill(data.problem_user);
  await loginPage.formComponent.submit();
  await page.waitForLoadState('networkidle');

  await page.context().storageState({path: STORAGE_STATE_PROBLEM_USER});
})

setup('authenticate error user', async({page}) => {
  loginPage = new LoginPage(page);
  await loginPage.visit();
  await loginPage.formComponent.fill(data.error_user);
  await loginPage.formComponent.submit();
  await page.waitForLoadState('networkidle');

  await page.context().storageState({path: STORAGE_STATE_ERROR_USER});
})

setup('authenticate performance user', async({page}) => {
  loginPage = new LoginPage(page);
  await loginPage.visit();
  await loginPage.formComponent.fill(data.performance_user);
  await loginPage.formComponent.submit();
  await page.waitForLoadState('networkidle');

  await page.context().storageState({path: STORAGE_STATE_PERFORMANCE_USER});
})