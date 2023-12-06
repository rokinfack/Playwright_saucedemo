import { Locator, Page } from "playwright-core";
import { expect } from "playwright/test";
import { MenuComponent } from "./MenuComponent";

export class HeaderComponent {
  readonly page: Page;
  readonly locatorHeading: Locator;
  readonly locatorCartLink: Locator;
  readonly locatorMenuButton: Locator;
  readonly menu: MenuComponent;

  constructor(page: Page){
    this.page = page;

    this.menu = new MenuComponent(this.page);

    this.locatorHeading = this.page.locator('#header_container').locator('.app_logo', { hasText: 'Swag Labs'});
    this.locatorCartLink = this.page.locator('#shopping_cart_container a');
    this.locatorMenuButton = this.page.getByRole('button', { name: 'Open Menu' });
  }

  validateDefaultLayout = async () => {
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

  cartCounter = async (count: number) => {
    if(count === 0)
    {
      await expect(this.locatorCartLink.locator('.shopping_cart_badge')).not.toBeVisible();
    }
    else{
      await expect(this.locatorCartLink).toContainText(count.toString());
    }
  }
}