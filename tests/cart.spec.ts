import { test, expect } from '@playwright/test';
import { InventoryPage } from './pages/InventoryPage';
import { CartPage } from './pages/CartPage';
import data from './fixtures/data/cart.json';
import { CheckoutStepOnePage } from './pages/CheckoutStepOnePage';

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

test.describe('Cart UX', () => {

  test('Should have default UX', async () => {
    await cartPage.validateDefaultUX();
  })
});

test.describe('Cart features', () => {

  test('Should remove item and decrease cart counter', async () => {
    await cartPage.header.cartCounter(3);
    await cartPage.products[0].remove();
    await cartPage.products[0].isRemoved();
    await cartPage.header.cartCounter(2);
  })
  
  test('Should remove all items', async () => {
    await cartPage.header.cartCounter(3);
    await cartPage.products[0].remove();
    await cartPage.products[1].remove();
    await cartPage.products[2].remove();
    await cartPage.header.cartCounter(0);
  })

  test('Should continue shopping', async () => {
    await cartPage.continueShopping();
    await inventoryPage.toBe();
  })

  test('Should checkout', async ({page}) => {
    await cartPage.checkout();
    await new CheckoutStepOnePage(page).toBe();
  })

});