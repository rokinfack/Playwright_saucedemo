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

test.describe('Menu, Header, Footer', () => {
  test('Should have default UX', async () => {
    await inventoryPage.header.validateDefaultUX();
    await inventoryPage.footer.validateDefaultUX();
    await inventoryPage.header.openMenu();
    await inventoryPage.header.menu.validateDefaultUX();
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
})