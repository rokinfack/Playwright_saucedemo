import { Page } from "playwright-core";
import { BasePage } from "./BasePage";
import { Locator, expect } from "@playwright/test";
import { IProduct } from "../fixtures/models";
import { FooterComponent } from "../components/FooterComponent";
import { HeaderComponent } from "../components/HeaderComponent";

export class InventoryItemPage extends BasePage{
  
  readonly locatorHeaderBackButton: Locator;
  readonly locatorProductPhoto: Locator;
  readonly locatorProductTitle: Locator;
  readonly locatorProductDescription: Locator;
  readonly locatorProductPrice: Locator;
  readonly locatorAddCartButton: Locator;
  readonly locatorRemoveCartButton: Locator; 
  readonly footer: FooterComponent;
  readonly header: HeaderComponent;

  constructor(page: Page, product: IProduct) {
    super(page, "/inventory-item");    

    this.locatorHeaderBackButton = this.page.locator('[data-test="back-to-products"]');

    this.locatorProductTitle = this.page.getByText(product.name, { exact: true });
    this.locatorProductPhoto  = this.page.getByAltText(product.name);
    this.locatorProductDescription = this.page.getByText(product.description);
    this.locatorProductPrice = this.page.getByText(`$${product.price}`);
    this.locatorAddCartButton = this.page.getByRole('button', {name: 'Add to cart'});
    this.locatorRemoveCartButton = this.page.getByRole('button', {name: 'Remove'});

    this.footer = new FooterComponent(this.page);
    this.header = new HeaderComponent(this.page);
  }
  
  validateDefaultLayout = async () => {
    await expect(this.locatorProductPhoto).toBeVisible();
    await expect(this.locatorProductTitle).toBeVisible();
    await expect(this.locatorProductDescription).toBeVisible();
    await expect(this.locatorProductPrice).toBeVisible();
    await expect(this.locatorAddCartButton).toBeVisible();
    await expect(this.locatorRemoveCartButton).not.toBeVisible();
    await expect(this.locatorHeaderBackButton).toBeVisible();
    this.footer.validateDefaultLayout();
    this.header.validateDefaultLayout();
  }
  
  validateRemoveLayout = async () => {
    await expect(this.locatorProductPhoto).toBeVisible();
    await expect(this.locatorProductTitle).toBeVisible();
    await expect(this.locatorProductDescription).toBeVisible();
    await expect(this.locatorProductPrice).toBeVisible();
    await expect(this.locatorRemoveCartButton).toBeVisible();
    await expect(this.locatorAddCartButton).not.toBeVisible();
    await expect(this.locatorHeaderBackButton).toBeVisible();
    
    this.footer.validateDefaultLayout();
    this.header.validateDefaultLayout();
  }

  addToCart = async () => {
    await this.locatorAddCartButton.click();
  }

  removeFromCart = async () => {
    await this.locatorRemoveCartButton.click();
  }

  backToProducts = async () => {
    await this.locatorHeaderBackButton.click();
    await this.page.waitForLoadState('networkidle');
  }
}