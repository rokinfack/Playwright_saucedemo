# End-to-End (E2E) Tests
E2E tests, located in `e2e/`, aim to verify the complete functionality of the application. They cover scenarios such as user authentication, navigation, and interactions with different pages.

## E2E scenarios

### login.spec.ts

1. **Should Login with user "standard_user"**
   - Description: Verify that `standard_user` can successfully log in.
   - Steps: Navigate to the login page, enter valid credentials for standard_user, and confirm successful login.

2. **Should Login with user "visual_user"**
   - Description: Verify that `visual_user` can successfully log in.
   - Steps: Navigate to the login page, enter valid credentials for a visual user, and ensure successful login.

3. **Should Login with user "error_user"**
   - Description: Verify that `error_user` can successfully log in.
   - Steps: Attempt to log in with the credentials of a user prone to errors and validate the system's response.

4. **Should Login with user "problem_user"**
   - Description: Verify that `problem_user` can successfully log in.
   - Steps: Log in using the credentials of a user known for causing problems and analyze the system's response.

5. **Should Login with user "performance_user"**
   - Description: Validate the `performance_user`'s behavior when a known problematic user attempts to log in.
   - Steps: Log in using the credentials of a user specifically used for performance testing and assess the login speed.

6. **Should Not Login with Wrong Credentials**
   - Description: Confirm that the system rejects login attempts with incorrect credentials.
   - Steps: Attempt to log in with invalid username and password combinations and verify that the system denies access.

7. **Should Not Login with Locked User**
   - Description: Test the system's response when attempting to log in with a locked user account.
   - Steps: Use the credentials of a locked user account and check for the expected system behavior.

8. **Should Not Login with Empty User**
   - Description: Confirm that login is not possible with an empty username field.
   - Steps: Attempt to log in without entering a username and validate the system's response.

9. **Should Not Login with Empty Password**
   - Description: Verify that login is not allowed when the password field is left empty.
   - Steps: Attempt to log in without entering a password and confirm the expected system behavior.

10. **Should Not Login with Empty Credential**
    - Description: Test the system's response to an attempt to log in without entering any credentials.
    - Steps: Try to log in without providing any username or password and ensure that access is denied.

### inventory.spec.ts

1. **Should List by Name (Z to A)**
   - Description: Confirm that the inventory items are displayed in descending order by name.
   - Steps: Navigate to the inventory page, select the "Z to A" sorting option, and validate the item order.

2. **Should List by Name (A to Z)**
   - Description: Ensure that the inventory items are displayed in ascending order by name.
   - Steps: Navigate to the inventory page, select the "A to Z" sorting option, and verify the item order.

3. **Should List by Price (Low to High)**
   - Description: Validate that the inventory items are sorted from low to high based on price.
   - Steps: Navigate to the inventory page, select the "Low to High" sorting option, and check the item order.

4. **Should List by Price (High to Low)**
   - Description: Check that the inventory items are sorted from high to low based on price.
   - Steps: Navigate to the inventory page, select the "High to Low" sorting option, and confirm the item order.

5. **Should Add to Cart and Then Remove from Cart**
   - Description: Test the ability to add an item to the cart and subsequently remove it.
   - Steps: Add an item to the cart, remove the added item.

### inventoryItem.spec.ts

1. **Should Add to Cart and Update Cart Counter**
   - Description: Confirm that adding an item to the cart updates the cart counter.
   - Steps:  Navigate to an item's detailed view, add item to the cart and verify that the cart counter reflects the updated count.

2. **Should Remove from Cart and Update Cart Counter**
   - Description: Verify that removing an item from the cart updates the cart counter accordingly.
   - Steps:  Navigate to an item's detailed view, add item to the cart, remove it, and check that the cart counter is decremented.

3. **Should Return to Inventory Page**
   - Description: Test the functionality to return to the inventory page from an item-specific view.
   - Steps: Navigate to an item's detailed view, use the back button, and confirm returning to the inventory page.

### cart.spec.ts

1. **Should Remove Item and Decrease Cart Counter**
   - **Description:** Validate that removing an item from the cart results in a decrease in the cart counter.
   - **Steps:** Add an item to the cart, note the initial cart count, remove the item, and confirm the cart counter is decremented.

2. **Should Remove All Items**
   - **Description:** Test the ability to remove all items from the cart.
   - **Steps:** Add multiple items to the cart, initiate the removal of all items, and verify that the cart is empty afterward.

3. **Should Continue Shopping**
   - **Description:** Confirm the functionality to continue shopping from the cart.
   - **Steps:** Navigate to the cart, choose to continue shopping, and ensure a return to the inventory page.

4. **Should Checkout**
   - **Description:** Validate the checkout process initiated from the cart.
   - **Steps:** Add an item to the cart, proceed to checkout, and confirm successful navigation to the checkout process.

### checkout.spec.ts

1. **Should Checkout and Go Back Home**
   - Description: Confirm the successful checkout process, leading back to the home page.
   - Steps: Go through the checkout process, complete the purchase, and validate redirection to the home page.

2. **Should Not Checkout with Empty Form**
   - Description: Validate that attempting to check out with an empty form is not allowed.
   - Steps: Initiate the checkout process with an empty form and confirm the expected system behavior.

3. **Should Not Checkout Without First Name**
   - Description: Confirm that checkout is not possible without entering a first name.
   - Steps: Start the checkout process without providing a first name and validate the system's response.

4. **Should Not Checkout Without Last Name**
   - Description: Verify that checkout requires entering a last name.
   - Steps: Attempt to check out without providing a last name and ensure the expected system behavior.

5. **Should Not Checkout Without Zip Code**
   - Description: Confirm that a zip code is a required field for the checkout process.
   - Steps: Start the checkout without entering a zip code and check for the system's expected response.

6. **Should Cancel Checkout on Step One**
   - Description: Test the ability to cancel the checkout process on the first step.
   - Steps: Begin the checkout process and choose to cancel at the first step, verifying a return to the previous state.

7. **Should Cancel Checkout on Step Two**
   - Description: Confirm that the checkout process can be canceled on the second step.
   - Steps: Progress to the second step of checkout and choose to cancel, checking for the expected system behavior.

### menu.spec.ts

1. **Should Open and Close Menu**
   - **Description:** Verify that the menu can be successfully opened and closed.
   - **Steps:** Open the menu, confirm its visibility, close the menu, and validate its closure.

2. **Should Reset App State**
   - **Description:** Test the functionality to reset the application state from the menu.
   - **Steps:** Navigate to the menu, choose the option to reset the app state, and confirm a reset.

3. **Should Visit About**
   - **Description:** Confirm that the "About" section is accessible from the menu.
   - **Steps:** Open the menu, select the "About" option, and validate successful navigation to the "About" page.

4. **Should Visit All Items**
   - **Description:** Validate the ability to visit the "Inventory" page from the menu.
   - **Steps:** Open the menu, choose the "All Items" option, and confirm successful navigation to the corresponding page.

5. **Should Logout**
   - **Description:** Test the logout functionality from the menu.
   - **Steps:** Open the menu, select the logout option, and confirm the expected logout behavior.