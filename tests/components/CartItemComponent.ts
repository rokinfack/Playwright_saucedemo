import { Locator, Page } from "playwright-core";
import { ICartProduct, IProduct } from "../fixtures/models";
import { expect } from "playwright/test";

export class CartItemComponent {
  readonly page: Page;
  readonly locatorQuantity: Locator;
  readonly locatorProductTitle: Locator;
  readonly locatorProductDescription: Locator;
  readonly locatorProductPrice: Locator;
  readonly locatorRemoveButton: Locator;

  constructor(page: Page, cart: ICartProduct){
    this.page = page;

    this.locatorProductTitle = this.page.getByRole('link', {name: `${cart.product.name}`});
    
    const container = this.page.locator('.cart_item', {hasText: `${cart.product.name}`});
    this.locatorProductDescription = container.getByText(cart.product.description);
    this.locatorQuantity = container.locator('.cart_quantity', {hasText: `${cart.qty}`});
    this.locatorProductPrice = container.locator('.inventory_item_price', {hasText: `$${cart.product.price}`});
    this.locatorRemoveButton = container.getByRole('button', { name: 'Remove'});

  }

  containsElements = async () => {
    expect(this.locatorQuantity).toBeVisible();
    expect(this.locatorProductTitle).toBeVisible();
    expect(this.locatorProductDescription).toBeVisible();
    expect(this.locatorProductPrice).toBeVisible();
    expect(this.locatorRemoveButton).toBeVisible();
  }

  remove = async () => {
    this.locatorRemoveButton.click();
  }

  isRemoved = async () => {
    expect(this.locatorQuantity).not.toBeVisible();
    expect(this.locatorProductTitle).not.toBeVisible();
    expect(this.locatorProductDescription).not.toBeVisible();
    expect(this.locatorProductPrice).not.toBeVisible();
    expect(this.locatorRemoveButton).not.toBeVisible();
  }
}