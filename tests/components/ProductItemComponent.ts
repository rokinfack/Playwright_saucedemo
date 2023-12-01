import { Locator, Page, expect } from "@playwright/test";
import { IProduct } from "../fixtures/models";

export class ProductItemComponent {
  readonly page: Page;

  readonly locatorProductPhoto: Locator;
  readonly locatorProductTitle: Locator;
  readonly locatorProductDescription: Locator;
  readonly locatorProductPrice: Locator;
  readonly locatorAddCartButton: Locator;
  readonly locatorRemoveCartButton: Locator;

  constructor(page: Page, product: IProduct){
    this.page = page;

    this.locatorProductTitle = this.page.locator('a[id$=title_link]', {hasText: product.name});
    const locatorContainer = this.page.locator('#inventory_container .inventory_item', { has: this.locatorProductTitle});
    this.locatorProductPhoto  = locatorContainer.getByAltText(product.name);
    this.locatorProductDescription = locatorContainer.getByText(product.description);
    this.locatorProductPrice = locatorContainer.getByText(`$${product.price}`);
    this.locatorAddCartButton = locatorContainer.getByRole('button', {name: 'Add to cart'});
    this.locatorRemoveCartButton = locatorContainer.getByRole('button', {name: 'Remove'});
  }

  validateDefaultUX = async () => {
    await expect(this.locatorProductPhoto).toBeVisible();
    await expect(this.locatorProductTitle).toBeVisible();
    await expect(this.locatorProductDescription).toBeVisible();
    await expect(this.locatorProductPrice).toBeVisible();
    await expect(this.locatorAddCartButton).toBeVisible();
  }

  validateRemoveUX = async () => {
    await expect(this.locatorAddCartButton).not.toBeVisible();
    await expect(this.locatorRemoveCartButton).toBeVisible();    
  }

  validateAddUX =async () => {
    await expect(this.locatorRemoveCartButton).not.toBeVisible();
    await expect(this.locatorAddCartButton).toBeVisible();
  }

  addToCart = async () => {
    await this.locatorAddCartButton.click();
  }

  removeFromCart = async () => {
    await this.locatorRemoveCartButton.click();
  }

  openDetailsClickingOnPhoto = async () =>  {
    await this.locatorProductPhoto.click();
    await this.page.waitForLoadState('networkidle');
  }

  openDetailsClickingOnTitle = async () =>  {
    await this.locatorProductTitle.click();
    await this.page.waitForLoadState('networkidle');
  }
}