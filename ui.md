# User Interface (UI) Tests

This set of UI tests, located in the `ui/` and `visual/` directories, is designed to thoroughly evaluate various aspects of the user interface, including layout, usability, responsiveness, and visual elements.

## UI Test Scenarios

### login.spec.ts

1. **Viewport should resize correctly**
   - Description: Simulate resizing the browser window and check if the page responds correctly, dynamically adapting to the window size.

1. **Should Have Default Layout on Start**
   - Description: Confirm that the login page exhibits the expected default layout upon initial loading.
   - Steps: Access the login page and verify the layout conforms to the default design.

1. **Should Have Error Layout on Invalid Form**
   - Description: Validate that the login page switches to an error-specific layout when an invalid form is submitted.
   - Steps: Submit a login form with incorrect credentials and ensure the error layout is displayed.

### inventory.spec.ts

1. **Viewport should resize correctly**
   - Description: Simulate resizing the browser window and check if the page responds correctly, dynamically adapting to the window size.

1. **Should Have Default Layout**
   - Description: Verify that the inventory page maintains the default layout upon initial access.
   - Steps: Navigate to the inventory page and confirm adherence to the default design.

1. **Should Alternate Add To Cart and Remove Buttons**
   - Description: Confirm that the "Add to Cart" and "Remove" buttons on the inventory page alternate their visibility and layout when items are added or removed from the cart.
   - Steps: Add an item to the cart and verify the change in button layout. Then, remove the item and confirm the reversal of button layout.

1. **Viewport should resize correctly**
   - Description: Simulate resizing the browser window and check if the page responds correctly, dynamically adapting to the window size.

### inventoryItem.spec.ts

1. **Viewport should resize correctly**
   - Description: Simulate resizing the browser window and check if the page responds correctly, dynamically adapting to the window size.

1. **Should Have Default Layout When Accessing a Product That is Not Added**
   - Description: Ensure that the product-specific page displays the default layout when accessing a product that has not been added to the cart.
   - Steps: Access the detailed view of a product not in the cart and validate the default layout.

1. **Should Have Remove Layout When Accessing a Product That is Added**
   - Description: Confirm that the product-specific page displays a layout with the option to remove the product when accessing an item already added to the cart.
   - Steps: Add a product to the cart, then access its detailed view and verify the presence of the remove-specific layout.

1. **Viewport should resize correctly**
   - Description: Simulate resizing the browser window and check if the page responds correctly, dynamically adapting to the window size.

### cart.spec.ts

1. **Viewport should resize correctly**
   - Description: Simulate resizing the browser window and check if the page responds correctly, dynamically adapting to the window size.

1. **Should Have Default Layout**
   - Description: Confirm that the cart page displays the default layout upon navigation.
   - Steps: Navigate to the cart and validate the default layout.

1. **Viewport should resize correctly**
   - Description: Simulate resizing the browser window and check if the page responds correctly, dynamically adapting to the window size.

### checkout.spec.ts

1. **Viewport should resize correctly**
   - Description: Simulate resizing the browser window and check if the page responds correctly, dynamically adapting to the window size.

1. **Checkout Step One Should Have Default Layout**
   - Description: Validate that the first step of the checkout process displays the default layout.
   - Steps: Initiate the checkout process and verify the layout on the first step.

1. **Checkout Step One Should Have Error Layout on Invalid Form**
   - Description: Confirm that the first step of the checkout process switches to an error-specific layout when an invalid form is submitted.
   - Steps: Submit an incomplete or invalid form during the first step of checkout and ensure the error layout is displayed.

1. **Checkout Step Two Should Have Default Layout**
    - Description: Validate that the second step of the checkout process displays the default layout.
    - Steps: Progress to the second step of checkout and verify the layout.

1. **Checkout Complete Should Have Default Layout**
    - Description: Confirm that the completion page of the checkout process exhibits the default layout.
    - Steps: Complete the checkout process and validate the default layout on the completion page.

1. **Viewport should resize correctly**
   - Description: Simulate resizing the browser window and check if the page responds correctly, dynamically adapting to the window size.

### menu.spec.ts

1. **Menu, Header, Footer Should Have Default Layout**
    - Description: Validate that the menu, header, and footer components maintain the default layout.
    - Steps: Navigate through menu options and access different sections to ensure the default layout is consistent.
