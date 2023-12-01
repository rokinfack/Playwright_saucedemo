import test from "@playwright/test";
import { InventoryPage } from "./pages/InventoryPage";
import { InventoryItemPage } from "./pages/InventoryItemPage";
import data from './fixtures/data/products.json';

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

test.describe('Inventory Item UX', () => {
  test('Should have default UX when accessing a product that is not added', async () => {
    await inventoryPage.items[PROD_INDEX_OUT_CART].openDetailsClickingOnPhoto();
    await inventoryItemPage.validateDefaultUX();


  });

  test('Should have remove UX when accessing a product that is added', async () => {
    await inventoryPage.items[PROD_INDEX_IN_CART].openDetailsClickingOnPhoto();
    await inventoryItemInPage.validateRemoveUX();
  });
});

test.describe('Inventory Item features', async () => {
  test('Should add to cart and update cart counter', async () => {
    await inventoryPage.items[PROD_INDEX_OUT_CART].openDetailsClickingOnPhoto();
    await inventoryItemPage.header.cartCounter(1);
    await inventoryItemPage.addToCart();
    await inventoryItemPage.header.cartCounter(2);
  });

  test('Should remove from cart and update cart counter', async () => {
    await inventoryPage.items[PROD_INDEX_IN_CART].openDetailsClickingOnPhoto();
    await inventoryItemInPage.header.cartCounter(1);
    await inventoryItemInPage.removeFromCart();
    await inventoryItemInPage.header.cartCounter(0);
  });

  test('Should return to Inventory page', async () => {
    await inventoryPage.items[PROD_INDEX_IN_CART].openDetailsClickingOnPhoto();
    await inventoryItemInPage.backToProducts();
    await inventoryPage.toBe();
  })
});