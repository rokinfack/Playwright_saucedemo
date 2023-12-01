import { Page } from "playwright-core";
import { expect } from "playwright/test";

export abstract class BasePage {
  readonly page: Page;
  readonly url: string;

  constructor(page:Page, url: string){
    this.page = page;
    this.url = url;
  }

  toBe = async () => {
    const regex = new RegExp(`${this.url}`)
    await expect(this.page).toHaveURL(regex);
  }

  visit = async () => {
    await this.page.goto(this.url);
    await this.page.waitForLoadState('networkidle')
  }

  abstract validateDefaultUX();

}