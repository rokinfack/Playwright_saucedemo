import test from "@playwright/test";
import { InventoryPage } from "./pages/InventoryPage";
import { InventoryItemPage } from "./pages/InventoryItemPage";
import { IProduct, SortOptions } from "./fixtures/models";
import data from './fixtures/data/products.json';

let inventoryPage: InventoryPage;

test.beforeEach( async ({page}) => {
  inventoryPage = new InventoryPage(page);
  await inventoryPage.visit();
});

test.describe('Inventory UX', () => {
  
  test('Should have default UX', async ({page}) => {
    await inventoryPage.validateDefaultUX();
  })

  test('Should alternate Add To Cart button and Remove button when add/remove item to/from cart', async () => {
    const index = Math.floor(Math.random()*inventoryPage.items.length);
    await inventoryPage.items[index].addToCart();
    await inventoryPage.items[index].validateRemoveUX();
    await inventoryPage.items[index].removeFromCart();
    await inventoryPage.items[index].validateAddUX();
  })
})

test.describe('Inventory features', () => {
  test('Should list by Name (Z to A)', async () => {
    await inventoryPage.sort(SortOptions.ZA);
  });
  test('Should list by Name (A to Z)', async () => {
    await inventoryPage.sort(SortOptions.AZ);
  });
  test('Should list by Price (Low to High)', async () => {
    await inventoryPage.sort(SortOptions.LoHi);
  });
  test('Should list by Price (High to Low)', async () => {
    await inventoryPage.sort(SortOptions.HiLo);
  });

  test('Should add to cart and then remove from cart', async () => {
    const index = Math.floor(Math.random()*inventoryPage.items.length);
    await inventoryPage.items[index].addToCart();
    await inventoryPage.items[index].removeFromCart();
  });

  test('Should increase cart counter while adding product and decrease while removing product', async () => {
    await inventoryPage.header.cartCounter(0);

    for(let i = 0; i < inventoryPage.items.length; i++){
      await inventoryPage.items[i].addToCart();
      await inventoryPage.header.cartCounter(i + 1);
    }
    
    for(let i = inventoryPage.items.length -1; i >= 0; i--){
      await inventoryPage.items[i].removeFromCart();
      await inventoryPage.header.cartCounter(i);
    }
  });

  test('Should open product details from image', async ({page}) => {
    const index = Math.floor(Math.random()*inventoryPage.items.length);
    await inventoryPage.items[index].openDetailsClickingOnPhoto();
    await new InventoryItemPage(page, data.az[0]).toBe();
  });

  test('Should open product details from title', async ({page}) => {
    const index = Math.floor(Math.random()*inventoryPage.items.length);
    await inventoryPage.items[index].openDetailsClickingOnTitle();
    await new InventoryItemPage(page, data.az[0]).toBe();
  });
});