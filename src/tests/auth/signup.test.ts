import { SignUpPage } from "@pages/signup.page";
import { test } from "@fixtures/merge.fixture";
import { userRegistration, signupForm, signupConfirmation } from "@test-data/signup.data";
import { UserRegistration } from "@@types/user";
import { SignedInSideBarComponent } from "@pages/components/signedin-sidebar.component";
import { expect } from "@playwright/test";
import { Logger } from "@utils/logger";

test("Successful sign up using valid data", { tag: ["@smoke", "@regression"] }, async ({ page }) => {
  const newUser = userRegistration.getValidUser() as UserRegistration;
  Logger.debug(`New User - ${newUser.username}`);
  const signupPage = new SignUpPage(page);

  await test.step("Navigating to sign up page", async () => {
    await signupPage.navigate();
  });

  await test.step("Filling sign up form", async () => {
    await signupPage.FillSignUpForm(newUser);
  });

  await test.step("Submitting sign up form", async () => {
    await signupPage.submitSignUpForm(newUser);
  });

  await test.step("Validating user has signed in", async () => {
    const signedInBar = new SignedInSideBarComponent(page);
    await expect(signedInBar.welcomeText).toBeVisible();
    await expect(signedInBar.accountServicesHeading).toHaveText("Account Services");
    for (const link of signedInBar.accountServicesLinks) {
      await expect.soft(link).toBeVisible();
    }
    await expect(signupPage.userRegisteredHeading).toHaveText(signupConfirmation.header(newUser.username));
    await expect(signupPage.userRegisteredSubtitle).toHaveText(signupConfirmation.message);
  });
});

test("Unsuccessful sign up attempt with empty form values", { tag: ["@regression"] }, async ({ page }) => {
  const newUser = userRegistration.invalid[0] as UserRegistration;
  const signupPage = new SignUpPage(page);

  await test.step("Navigating to sign up page", async () => {
    await signupPage.navigate();
  });

  await test.step("Filling sign up form", async () => {
    await signupPage.FillSignUpForm(newUser);
  });

  await test.step("Submitting sign up form", async () => {
    await signupPage.submitSignUpForm(newUser);
  });

  await test.step("Validating error messages are displayed", async () => {
    const signUpFields = signupPage.getSignUpFields();
    for (const field of signUpFields) {
      await expect.soft(field.requiredError).toHaveText(field?.expectedRequiredError);
    }
  });
});

test("Sign up page displays all required labels", { tag: ["@regression"] }, async ({ page }) => {
  const signupPage = new SignUpPage(page);
  await test.step("Navigating to sign up page", async () => {
    await signupPage.navigate();
  });

  await test.step("Validating UI elements are displayed", async () => {
    const signUpFields = signupPage.getSignUpFields();
    await expect(signupPage.signupHeading).toHaveText(signupForm.header);
    await expect(signupPage.signupSubTitle).toHaveText(signupForm.message);
    for (const field of signUpFields) {
      await expect.soft(field.label).toHaveText(field.expectedLabel);
    }
    await expect(signupPage.registerBtn).toBeVisible();
  });
});
