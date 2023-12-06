import test from "@playwright/test";
import { InventoryPage } from "../pages/InventoryPage";
import { InventoryItemPage } from "../pages/InventoryItemPage";
import data from '../fixtures/data/products.json';

let inventoryPage: InventoryPage;
let inventoryItemInPage: InventoryItemPage;
let inventoryItemPage: InventoryItemPage;
const PROD_INDEX_IN_CART = 2;
const PROD_INDEX_OUT_CART = 1;

test.beforeEach(async ({page}) => {
  inventoryItemPage = new InventoryItemPage(page, data.az[PROD_INDEX_OUT_CART]);
  inventoryItemInPage = new InventoryItemPage(page, data.az[PROD_INDEX_IN_CART]);
  inventoryPage = new InventoryPage(page);
  inventoryPage.visit();
  await inventoryPage.items[PROD_INDEX_IN_CART].addToCart();
});

test.describe('Inventory Item UI', () => {
  test('Viewport should resize correctly @responsive', async () => {
    await inventoryItemPage.validateViewportResize();
  })

  test('Should have default Layout when accessing a product that is not added', async () => {
    await inventoryPage.items[PROD_INDEX_OUT_CART].openDetailsClickingOnPhoto();
    await inventoryItemPage.validateDefaultLayout();


  });

  test('Should have Remove-Layout when accessing a product that is added', async () => {
    await inventoryPage.items[PROD_INDEX_IN_CART].openDetailsClickingOnPhoto();
    await inventoryItemInPage.validateRemoveLayout();
  });

  test('Viewport should resize correctly', async () => {
    await inventoryItemInPage.validateViewportResize();
  })
});
