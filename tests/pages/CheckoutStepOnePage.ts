import { Page } from "playwright-core";
import { BasePage } from "./BasePage";

export class CheckoutStepOnePage extends BasePage{
  constructor(page: Page) {
    super(page, "/checkout-step-one");    
  }
  
  validateDefaultUX() {
    throw new Error("Method not implemented.");
  }
}