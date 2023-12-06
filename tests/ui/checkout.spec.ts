import test from "@playwright/test";
import { CartPage } from "../pages/CartPage";
import { InventoryPage } from "../pages/InventoryPage";
import data from '../fixtures/data/cart.json';
import dataCheckout from '../fixtures/data/checkout.json';
import { CheckoutStepOnePage } from "../pages/CheckoutStepOnePage";
import { CheckoutStepTwoPage } from "../pages/CheckoutStepTwoPage";
import { CheckoutCompletePage } from "../pages/CheckoutCompletePage";

let inventoryPage: InventoryPage;
let cartPage: CartPage;
let checkoutOnePage: CheckoutStepOnePage;
let checkoutTwoPage: CheckoutStepTwoPage;
let checkoutCompletePage: CheckoutCompletePage;

test.beforeEach(async ({page})=> {
  inventoryPage = new InventoryPage(page);
  checkoutOnePage = new CheckoutStepOnePage(page);
  checkoutTwoPage = new CheckoutStepTwoPage(page, [data[1], data[2], data[3]]);
  checkoutCompletePage = new CheckoutCompletePage(page);

  cartPage = new CartPage(page, [data[1], data[2], data[3]]);

  await inventoryPage.visit();
  await inventoryPage.items[0].addToCart();
  await inventoryPage.items[2].addToCart();
  await inventoryPage.items[4].addToCart();
  await inventoryPage.header.visitCart();
  await cartPage.checkout();
})

test.describe('Checkout Step One UI', () => {
  
  test('Viewport should resize correctly @responsive', async () => {
    await checkoutOnePage.validateViewportResize();
  })
  
  test('Should have default UI', async () => {
    await checkoutOnePage.validateDefaultLayout();
  })

  test('Should have Error UI on invalid form', async () => {
    await checkoutOnePage.form.submit();
    await checkoutOnePage.validateErrorLayout();
  })

  test('Viewport should resize correctly', async () => {
    await checkoutOnePage.validateViewportResize();
  })
});

test.describe('Checkout Step Two UI', () => {
  test('Viewport should resize correctly @responsive', async () => {
    await checkoutTwoPage.validateViewportResize();
  })

  test('Should have default UI', async () => {
    await checkoutOnePage.form.fill(dataCheckout.success);
    await checkoutOnePage.form.submit();
    await checkoutTwoPage.validateDefaultLayout();
  })

  test('Viewport should resize correctly', async () => {
    await checkoutTwoPage.validateViewportResize();
  })
});

test.describe('Checkout Complete UI', () => {
  test('Viewport should resize correctly @responsive', async () => {
    await checkoutCompletePage.validateViewportResize();
  })

  test('Should have default UI', async () => {
    await checkoutOnePage.form.fill(dataCheckout.success);
    await checkoutOnePage.form.submit();
    await checkoutTwoPage.finish();
    await checkoutCompletePage.validateDefaultLayout();
  })

  test('Viewport should resize correctly', async () => {
    await checkoutCompletePage.validateViewportResize();
  })
});