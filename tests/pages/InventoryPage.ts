import { Locator, expect } from "@playwright/test";
import { Page } from "playwright-core";
import { BasePage } from "./BasePage";
import { ProductItemComponent } from "../components/ProductItemComponent";
import data from '../fixtures/data/products.json';
import { FooterComponent } from "../components/FooterComponent";
import { HeaderComponent } from "../components/HeaderComponent";
import { SortOptions } from "../fixtures/models";

export class InventoryPage extends BasePage{
  
  readonly locatorHeaderTitle: Locator;
  readonly locatorHeaderFilterSelect: Locator;
  readonly items: ProductItemComponent[];
  readonly footer: FooterComponent;
  readonly header: HeaderComponent;

  constructor(page: Page) {
    super(page, "/inventory.html");  
    
    this.locatorHeaderTitle = this.page.locator('#header_container').getByText('Products');
    this.locatorHeaderFilterSelect = this.page.locator('[data-test="product_sort_container"]');

    this.footer = new FooterComponent(this.page);
    this.header = new HeaderComponent(this.page);
    this.items = new Array<ProductItemComponent>();
    
    for(const prod of data.az){
      this.items.push(new ProductItemComponent(this.page, prod))
    }
  }

  validateDefaultUX = async () => {
    await expect(this.locatorHeaderFilterSelect).toBeVisible();
    await expect(this.locatorHeaderTitle).toBeVisible();
    
    for(const item of this.items){
      await item.validateDefaultUX ();
    }

    await this.header.validateDefaultUX();
    await this.footer.validateDefaultUX();
  }

  sort = async (sort: SortOptions) => {
    await this.locatorHeaderFilterSelect.selectOption(sort.toString());
    
    for(let i = 0; i < (data[sort.toString()] as []).length; i++){
      await expect(this.page.locator(`div:nth-child(${i+1}) > .inventory_item_description`, { hasText: data[sort.toString()][i].name})).toBeVisible();
    }
  }
}