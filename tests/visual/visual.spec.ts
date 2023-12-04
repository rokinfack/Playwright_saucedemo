import { test,  expect, Page } from "@playwright/test";
import { InventoryPage } from "../pages/InventoryPage";
import { InventoryItemPage } from "../pages/InventoryItemPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutStepOnePage } from "../pages/CheckoutStepOnePage";
import { CheckoutStepTwoPage } from "../pages/CheckoutStepTwoPage";
import { CheckoutCompletePage } from "../pages/CheckoutCompletePage";
import { LoginPage } from "../pages/LoginPage";

import cart from '../fixtures/data/cart.json';
import products from '../fixtures/data/products.json';
import checkout from '../fixtures/data/checkout.json';
import user from '../fixtures/data/users.json';
import { ILogin } from "../fixtures/models";

let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let inventoryItemPage: InventoryItemPage;
let cartPage: CartPage;
let checkoutOnePage: CheckoutStepOnePage;
let checkoutTwoPage: CheckoutStepTwoPage;
let checkoutCompletePage: CheckoutCompletePage;

test.beforeEach(async ({page}) => {
  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);
  inventoryItemPage = new InventoryItemPage(page, products.az[0]);
  checkoutOnePage = new CheckoutStepOnePage(page);
  checkoutTwoPage = new CheckoutStepTwoPage(page, [cart[1], cart[2], cart[3]]);
  checkoutCompletePage = new CheckoutCompletePage(page);
  cartPage = new CartPage(page, [cart[1], cart[2], cart[3]]);
})

test.describe.serial('visual test', ()=>{

  test('Should pass with standard user @create-snapshots', async ({page}) => {
    await visualTest(page, user.success);
  })

  test('Should fail with visual user', async ({page}) => {
    await visualTest(page, user.visual_user);
  })

})

const visualTest = async (page: Page, user: ILogin) => {
  await loginPage.visit();
  await expect.soft(page).toHaveScreenshot('loginPage.png', {
    fullPage: true
  });
  
  await loginPage.formComponent.submit();

  await expect.soft(page).toHaveScreenshot('loginPage-error.png', {
    fullPage: true
  });

  await loginPage.formComponent.fill(user);
  await loginPage.formComponent.submit();

  await expect.soft(page).toHaveScreenshot('inventoryPage.png', {
    fullPage: true
  });
  
  await inventoryPage.header.visitCart();
  
  await expect.soft(page).toHaveScreenshot('cartPage-empty.png', {
    fullPage: true
  });
  
  await cartPage.continueShopping();

  await inventoryPage.items[0].addToCart();
  await inventoryPage.items[2].addToCart();
  await inventoryPage.items[4].addToCart();

  await expect.soft(page).toHaveScreenshot('inventoryPage-added.png', {
    fullPage: true
  });

  await inventoryPage.items[0].openDetailsClickingOnTitle();

  await expect.soft(page).toHaveScreenshot('inventoryItemPage-added.png', {
    fullPage: true
  });

  await inventoryItemPage.backToProducts();
  await inventoryPage.items[1].openDetailsClickingOnTitle();

  await expect.soft(page).toHaveScreenshot('inventoryItemPage.png', {
    fullPage: true
  });

  await inventoryPage.header.openMenu();

  await expect.soft(page).toHaveScreenshot('menu.png', {
    fullPage: true
  });

  await inventoryPage.header.menu.close();
  await inventoryPage.header.visitCart();

  await expect.soft(page).toHaveScreenshot('cartPage.png', {
    fullPage: true
  });

  await cartPage.checkout();

  await expect.soft(page).toHaveScreenshot('checkoutPage-one.png', {
    fullPage: true
  });

  await checkoutOnePage.form.fill(checkout.success);
  await checkoutOnePage.form.submit();

  await expect.soft(page).toHaveScreenshot('checkoutPage-two.png', {
    fullPage: true
  });

  await checkoutTwoPage.finish();

  await expect.soft(page).toHaveScreenshot('checkoutPage-complete.png', {
    fullPage: true
  });
}