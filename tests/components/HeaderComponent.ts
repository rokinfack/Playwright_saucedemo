import { Locator, Page } from "playwright-core";
import { expect } from "playwright/test";

export class HeaderComponent {
  readonly page: Page;
  readonly locatorHeading: Locator;
  readonly locatorCartLink: Locator;
  readonly locatorMenuButton: Locator;

  constructor(page: Page){
    this.page = page;

    this.locatorHeading = this.page.getByTitle('Swag Labs');
    this.locatorCartLink = this.page.locator('a#shopping_cart_container');
    this.locatorMenuButton = page.getByRole('button', { name: 'Open Menu' });
  }

  containElements = async () => {
    await expect(this.locatorHeading).toBeVisible();
    await expect(this.locatorCartLink).toBeVisible();
    await expect(this.locatorMenuButton).toBeVisible();
  }

  openMenu = async () => {
    await this.locatorMenuButton.click();
  }

  visitCart = async () => {
    await this.locatorCartLink.click();
    await this.page.waitForLoadState('networkidle');
  }
}