import { Locator, Page } from "playwright-core";
import { expect } from "playwright/test";

export class MenuComponent {
  readonly page: Page;
  readonly locatorCloseMenuButton: Locator;
  readonly locatorAllItemsLink: Locator;
  readonly locatorAboutLink: Locator;
  readonly locatorLogoutLink: Locator;
  readonly locatorResetLink: Locator;
  readonly locatorMenuNav: Locator;

  constructor(page:Page){
    this.page = page;
    this.locatorCloseMenuButton = this.page.getByRole('button', { name: 'Close Menu' });    
    this.locatorMenuNav = this.page.getByRole('navigation');
    this.locatorAllItemsLink = this.locatorMenuNav.getByRole('link', { name: 'All Items' });
    this.locatorAboutLink = this.locatorMenuNav.getByRole('link', { name: 'About' });
    this.locatorResetLink = this.locatorMenuNav.getByRole('link', { name: 'Reset App State' });
    this.locatorLogoutLink = this.locatorMenuNav.getByRole('link', { name: 'Logout' });
  }
  validateDefaultLayout = async () => {
    await expect(this.locatorMenuNav).toBeVisible();
    await expect(this.locatorCloseMenuButton).toBeVisible();
    await expect(this.locatorAllItemsLink).toBeVisible();
    await expect(this.locatorAboutLink).toBeVisible();
    await expect(this.locatorResetLink).toBeVisible();
    await expect(this.locatorLogoutLink).toBeVisible();
  };

  visitItems = async () => {
    await this.locatorAllItemsLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  visitAbout = async () => {
    await this.locatorAboutLink.click();
    await this.page.waitForLoadState('networkidle');
    await expect(this.page).toHaveURL('https://saucelabs.com/');    
  }

  reset = async () => {
    await this.locatorResetLink.click();
  }

  visitLogout = async () => {
    await this.locatorLogoutLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  close = async () => {
    await this.locatorCloseMenuButton.click();
  }

  isClosed = async () => {
    await expect(this.locatorMenuNav).toBeHidden();
    await expect(this.locatorCloseMenuButton).toBeHidden();
    await expect(this.locatorAllItemsLink).toBeHidden();
    await expect(this.locatorAboutLink).toBeHidden();
    await expect(this.locatorResetLink).toBeHidden();
    await expect(this.locatorLogoutLink).toBeHidden();
  }

  isOpened = async () => {
    await expect(this.locatorMenuNav).toBeVisible();
    await expect(this.locatorCloseMenuButton).toBeVisible();
    await expect(this.locatorAllItemsLink).toBeVisible();
    await expect(this.locatorAboutLink).toBeVisible();
    await expect(this.locatorResetLink).toBeVisible();
    await expect(this.locatorLogoutLink).toBeVisible();
  }
}