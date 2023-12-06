import test, { expect } from "@playwright/test";
import { InventoryPage } from "../pages/InventoryPage";
import { InventoryItemPage } from "../pages/InventoryItemPage";
import { IProduct, SortOptions } from "../fixtures/models";
import data from '../fixtures/data/products.json';

let inventoryPage: InventoryPage;

test.beforeEach( async ({page}) => {
  inventoryPage = new InventoryPage(page);
  await inventoryPage.visit();
});

test.describe('Inventory UI', () => {
  test('Viewport should resize correctly @responsive', async () => {
    await inventoryPage.validateViewportResize();
  })
  
  test('Should have default Layout', async ({page}) => {
    await inventoryPage.validateDefaultLayout();
  })

  test('Should alternate Add To Cart button and Remove button when add/remove item to/from cart', async () => {
    const index = Math.floor(Math.random()*inventoryPage.items.length);
    await inventoryPage.items[index].addToCart();
    await inventoryPage.items[index].validateRemoveUX();
    await inventoryPage.items[index].removeFromCart();
    await inventoryPage.items[index].validateAddLayout();
  })

  test('Viewport should resize correctly', async () => {
    await inventoryPage.validateViewportResize();
  })

})