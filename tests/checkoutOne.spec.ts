import test from "@playwright/test";
import { CartPage } from "./pages/CartPage";
import { InventoryPage } from "./pages/InventoryPage";
import data from './fixtures/data/cart.json';
import dataCheckout from './fixtures/data/checkout.json';
import { CheckoutStepOnePage } from "./pages/CheckoutStepOnePage";
import { CheckoutStepTwoPage } from "./pages/CheckoutStepTwoPage";
import { CheckoutCompletePage } from "./pages/CheckoutCompletePage";

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

test.describe('Checkout Step One UX', () => {
  test('Should have default UX', async () => {
    await checkoutOnePage.validateDefaultUX();
  })

  test('Should have Error UX on invalid form', async () => {
    await checkoutOnePage.form.submit();
    await checkoutOnePage.validateErrorUX();
  })
});

test.describe('Checkout Step Two UX', () => {
  test('Should have default UX', async () => {
    await checkoutOnePage.form.fill(dataCheckout.success);
    await checkoutOnePage.form.submit();
    await checkoutTwoPage.validateDefaultUX();
  })
});

test.describe('Checkout Complete UX', () => {
  test('Should have default UX', async () => {
    await checkoutOnePage.form.fill(dataCheckout.success);
    await checkoutOnePage.form.submit();
    await checkoutTwoPage.finish();
    await checkoutCompletePage.validateDefaultUX();
  })
});

test.describe('Checkout features', () => {
  test('Should checkout and go back home', async ({page}) => {
    await checkoutOnePage.form.fill(dataCheckout.success);
    await checkoutOnePage.form.submit();
    await checkoutTwoPage.toBe();

    const totalItem = data[1].product.price + data[2].product.price + data[3].product.price;
    const taxItem = Math.round((totalItem * 0.08) * 100) / 100;
    const total = totalItem + taxItem;

    console.log(totalItem);
    console.log(taxItem);
    console.log(total);

    await checkoutTwoPage.itemPrice(totalItem.toString());
    await checkoutTwoPage.taxPrice(taxItem.toString());
    await checkoutTwoPage.totalPrice(total.toString());

    await checkoutTwoPage.finish();
    await checkoutCompletePage.toBe();
    await checkoutCompletePage.backHome();
    await inventoryPage.toBe();
  });

  test('Should not checkout with empty form', async () => {
    await checkoutOnePage.form.fill(dataCheckout.empty);
    await checkoutOnePage.form.submit();
    await checkoutOnePage.validateErrorUX();
    await checkoutOnePage.form.errorComponent.hasMessage('First Name is required');
  });

  test('Should not checkout without first name', async () => {
    await checkoutOnePage.form.fill(dataCheckout.empty_firstName);
    await checkoutOnePage.form.submit();
    await checkoutOnePage.validateErrorUX();
    await checkoutOnePage.form.errorComponent.hasMessage('First Name is required');
  });

  test('Should not checkout without last name', async () => {
    await checkoutOnePage.form.fill(dataCheckout.empty_lastName);
    await checkoutOnePage.form.submit();
    await checkoutOnePage.validateErrorUX();
    await checkoutOnePage.form.errorComponent.hasMessage('Last Name is required');
  });

  test('Should not checkout without zip code', async () => {
    await checkoutOnePage.form.fill(dataCheckout.empty_zipCode);
    await checkoutOnePage.form.submit();
    await checkoutOnePage.validateErrorUX();
    await checkoutOnePage.form.errorComponent.hasMessage('Postal Code is required');
  });

  test('Should cancel checkout on step one', async () => {
    await checkoutOnePage.cancel();
    await cartPage.toBe();
  })

  test('Should cancel checkout on step two', async ({page}) => {
    await checkoutOnePage.form.fill(dataCheckout.success);
    await checkoutOnePage.form.submit();
    await checkoutTwoPage.toBe();
    await checkoutTwoPage.cancel();
    await inventoryPage.toBe();
  });
})