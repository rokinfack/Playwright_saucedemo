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
test.describe('Menu features', () => {
  test('Should open and close menu', async () => {
    await inventoryPage.header.menu.isClosed();
    await inventoryPage.header.openMenu();
    await inventoryPage.header.menu.isOpened();
    await inventoryPage.header.menu.close();
    await inventoryPage.header.menu.isClosed();
  });

  test('Should reset app state', async () => {
    await inventoryPage.items[0].addToCart();
    await inventoryPage.header.cartCounter(1);
    await inventoryPage.header.openMenu();
    await inventoryPage.header.menu.reset();
    await inventoryPage.header.cartCounter(0);
  })

  test('Should visit about', async () => {
    await inventoryPage.header.openMenu();
    await inventoryPage.header.menu.visitAbout();
  })

  test('Should visit All Items', async () => {
    await inventoryPage.header.visitCart();
    await inventoryPage.header.openMenu();
    await inventoryPage.header.menu.visitItems();
    await inventoryPage.toBe();
  })

  test('Should logout', async ({page}) => {
    await inventoryPage.header.openMenu();
    await inventoryPage.header.menu.visitLogout();
    await expect(page).toHaveURL('/');
  })
})