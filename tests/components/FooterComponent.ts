import { Locator, Page } from "playwright-core";
import { expect } from "playwright/test";

export class FooterComponent {
  readonly page: Page;
  readonly locatorFooter: Locator;
  readonly locatorCopyRights: Locator;
  readonly locatorTwitterLink: Locator;
  readonly locatorFacebookLink: Locator;
  readonly locatorLinkedinLink: Locator;

  constructor(page: Page){
    this.page = page;

    this.locatorFooter = this.page.locator('footer');
    this.locatorCopyRights = this.locatorFooter.getByText('© 2023 Sauce Labs. All Rights');
    this.locatorTwitterLink = this.locatorFooter.getByRole('link', { name: 'Twitter' });
    this.locatorFacebookLink = this.locatorFooter.getByRole('link', { name: 'Facebook' });
    this.locatorLinkedinLink = this.locatorFooter.getByRole('link', { name: 'Linkedin' });
  }

  validateDefaultLayout = async () => {
    await expect(this.locatorCopyRights).toBeVisible();
    await expect(this.locatorTwitterLink).toBeVisible();
    await expect(this.locatorFacebookLink).toBeVisible();
    await expect(this.locatorLinkedinLink).toBeVisible();
  }

  visitTwitter = async () => {
    const page2Promise = this.page.waitForEvent('popup');
    await this.locatorTwitterLink.click();
    const page2 = await page2Promise;
    await expect(page2).toHaveURL('twitter.com')
  }

  visitFacebook = async () => {
    const page2Promise = this.page.waitForEvent('popup');
    await this.locatorFacebookLink.click();
    const page2 = await page2Promise;
    await expect(page2).toHaveURL('facebook.com')
  }

  visitLinkedin = async () => {
    const page2Promise = this.page.waitForEvent('popup');
    await this.locatorLinkedinLink.click();
    const page2 = await page2Promise;
    await expect(page2).toHaveURL('linkedin.com')
  }
}