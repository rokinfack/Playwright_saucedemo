import { Page } from "playwright-core";
import { BasePage } from "./BasePage";

export class InventoryItemPage extends BasePage{
  constructor(page: Page) {
    super(page, "/inventory-item");    
  }
  
  validateDefaultUX() {
    throw new Error("Method not implemented.");
  }
}