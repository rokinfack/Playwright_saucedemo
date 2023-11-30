import { Page } from "playwright-core";
import { expect } from "playwright/test";

export class BasePage {
  readonly page: Page;
  readonly url: string;

  constructor(page:Page, url: string){
    this.page = page;
    this.url = url;
  }

  toBe = async () => {
    await expect(this.page).toHaveURL(this.url);
  }

  visit = async () => {
    await this.page.goto(this.url);
    await this.page.waitForLoadState('networkidle')
  }
}