import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import data from '../fixtures/data/cart.json';
import { CheckoutStepOnePage } from '../pages/CheckoutStepOnePage';

let inventoryPage: InventoryPage;
let cartPage: CartPage;


test.beforeEach(async ({page}) => {
  inventoryPage = new InventoryPage(page);
  cartPage = new CartPage(page, [data[1], data[2], data[3]]);

  await inventoryPage.visit();
  await inventoryPage.items[0].addToCart();
  await inventoryPage.items[2].addToCart();
  await inventoryPage.items[4].addToCart();
  await inventoryPage.header.visitCart();
  await cartPage.toBe();

})

test.describe('Cart UI', () => {

  test('Viewport should resize correctly @responsive', async () => {
    await cartPage.validateViewportResize();
  })
  
  test('Should have default Layout', async () => {
    await cartPage.validateDefaultLayout();
  })

});
