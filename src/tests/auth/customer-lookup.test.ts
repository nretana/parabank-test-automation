import { CustomerLookupPage } from "@pages/customer-lookup.page";
import { test } from "@fixtures/merge.fixture";
import { customerLookup, customerLookupConfirmation, customerLookupForm, customerLookupError } from "@test-data/customer-lookup.data";
import { userRegistration } from '@test-data/signup.data';
import type { UserRegistration } from "@@types/user";
import { expect } from "@playwright/test";
import { SignUpPage } from '@pages/signup.page';
import { SignedInSideBarComponent } from '@pages/components/signedin-sidebar.component';
import { SignInSideBarComponent } from '@pages/components/signin-sidebar.component';

test("Successful recover of sign in info", { tag: ["@smoke", "@regression"] }, async ({ page }) => {
  const newUser = userRegistration.getValidUser() as UserRegistration;
  const customerLookupPage = new CustomerLookupPage(page);
  const signupPage =  new SignUpPage(page);
  const signInSideBar = new SignInSideBarComponent(page);
  const signedInSideBar = new SignedInSideBarComponent(page);
  
  await test.step("Precondition: Register a new user", async () => {
    await signupPage.registerUser(newUser);
    await signedInSideBar.logOut(signInSideBar.EXPECTED_PAGE_URL);
  });

  await test.step("Navigating to customer lookup page", async () => {
    await customerLookupPage.navigate();
  });

  await test.step("Filling customer lookup form", async () => {
    await customerLookupPage.FillForgotInfoForm(newUser);
  });

  await test.step("Submitting customer lookup form", async () => {
    await customerLookupPage.submitForgotInfoForm(newUser);
  });

  await test.step("Validating user has been recovered", async() => {
    await expect(customerLookupPage.customerLookupConfirmationSubtitle).toHaveText(customerLookupConfirmation.message);
    await expect(customerLookupPage.customerLookupConfirmationCredentials).toContainText(`Username: ${newUser.username}`);
    await expect(customerLookupPage.customerLookupConfirmationCredentials).toContainText(`Password: ${newUser.password}`);
  });
});

test("Unsuccessful attempt to recover sign in info using empty form values", { tag: ["@regression"] }, async ({ page }) => {
  const newUser = customerLookup.invalid[0] as UserRegistration;
  const customerLookupPage = new CustomerLookupPage(page);

  await test.step("Navigating to customer lookup page", async () => {
    await customerLookupPage.navigate();
  });

  await test.step("Filling customer lookup form", async () => {
    await customerLookupPage.FillForgotInfoForm(newUser);
  });

  await test.step("Submitting customer lookup form", async () => {
    await customerLookupPage.submitForgotInfoForm(newUser);
  });

  await test.step("Validating error messages of input validators are displayed", async () => {
    const customerLookupFields = customerLookupPage.getCustomerLookupFields();
    for (const field of customerLookupFields) {
      await expect.soft(field.requiredError).toHaveText(field.expectedRequiredError);
    }
  });
});

test("Unsuccessful attempt to recover sign in info using incorrect form values", { tag: ["@regression"] }, async ({ page }) => {
  const newUser = customerLookup.invalid[1] as UserRegistration;
  const customerLookupPage = new CustomerLookupPage(page);

  await test.step("Navigating to customer lookup page", async () => {
    await customerLookupPage.navigate();
  });

  await test.step("Filling customer lookup form", async () => {
    await customerLookupPage.FillForgotInfoForm(newUser);
  });

  await test.step("Submitting customer lookup form", async () => {
    await customerLookupPage.submitForgotInfoForm(newUser);
  });

  await test.step("Validating error message is displayed", async () => {
    await expect(customerLookupPage.customerLookupFormErrorHeading).toHaveText(customerLookupError.header);
    await expect(customerLookupPage.customerLookupFormErrorMessage).toHaveText(customerLookupError.message);
  });
});


test("Customer lookup page displays all required labels", { tag: ["@regression"] }, async ({ page }) => {
  const customerLookupPage = new CustomerLookupPage(page);
  await test.step("Navigating to sign up page", async () => {
    await customerLookupPage.navigate();
  });

  await test.step("Validating UI elements are displayed", async () => {
    const customerLookupFields = customerLookupPage.getCustomerLookupFields();
    await expect(customerLookupPage.customerLookupHeading).toHaveText(customerLookupForm.header);
    await expect(customerLookupPage.customerLookupSubtitle).toHaveText(customerLookupForm.message); 
    for (const field of customerLookupFields) {
      await expect.soft(field.label).toHaveText(field.expectedLabel);
    }
    await expect(customerLookupPage.findInfoBtn).toBeVisible();
  });
});