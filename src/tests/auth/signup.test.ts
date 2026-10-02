import { SignUpPage } from "@pages/signup.page";
import { test } from "@fixtures/merge.fixture";
import { TEST_USER_REGISTRATION } from "@test-data/signup.data";
import { UserRegistration } from "@@types/user";
import { SignedInSideBarComponent } from "@pages/components/signedin-sidebar.component";
import { expect } from "@playwright/test";

test("Successful sign up using valid data", { tag: ["@smoke", "@regression"] }, async ({ page }) => {
  const newUser = TEST_USER_REGISTRATION.valid[0] as UserRegistration;
  const signupPage = new SignUpPage(page);

  await test.step("Navigating to sign up page", async () => {
    await signupPage.nagivate();
  });

  await test.step("Filling sign up form", async () => {
    await signupPage.FillSignUpForm(newUser);
  });

  await test.step("Submitting sign up form", async () => {
    await signupPage.submitSignUpForm(newUser);
  });

  await test.step("Validating user has signed in", async () => {
    const userSideBarComponent = new SignedInSideBarComponent(page);
    await expect(userSideBarComponent.welcomeText).toBeVisible();
    await expect(userSideBarComponent.accountServicesHeading).toHaveText("Account Services");
    for (const link of userSideBarComponent.accountServicesLinks) {
      await expect.soft(link).toBeVisible();
    }
    await expect(signupPage.userRegisteredHeading).toHaveText(signupPage.expectedUserRegisteredHeading(newUser.username));
    await expect(signupPage.userRegisteredSubtitle).toHaveText(signupPage.EXPECTED_USER_REGISTERED_SUBTITLE);
  });
});

test("Unsuccessful sign up attempt with empty form values", { tag: ["@regression"] }, async ({ page }) => {
  const newUser = TEST_USER_REGISTRATION.invalid[0] as UserRegistration;
  const signupPage = new SignUpPage(page);

  await test.step("Navigating to sign up page", async () => {
    await signupPage.nagivate();
  });

  await test.step("Filling sign up form", async () => {
    await signupPage.FillSignUpForm(newUser);
  });

  await test.step("Submitting sign up form", async () => {
    await signupPage.submitSignUpForm(newUser);
  });

  await test.step("Validating error messages are displayed", async () => {
    for (const locator of signupPage.errorMessageList){
      await expect.soft(locator).toBeVisible();
    }
  });
});
