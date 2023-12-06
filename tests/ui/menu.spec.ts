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

test.describe('Menu, Header, Footer', () => {
  test('Should have default UI', async () => {
    await inventoryPage.header.validateDefaultLayout();
    await inventoryPage.footer.validateDefaultLayout();
    await inventoryPage.header.openMenu();
    await inventoryPage.header.menu.validateDefaultLayout();
  });
})
