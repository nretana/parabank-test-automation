import { ForgotSignInInfoPage } from "@pages/forgot-signin-info.page";
import { test } from "@fixtures/merge.fixture";
import { forgotSignInInfo } from "@test-data/forgot-signin.data";
import { userRegistration } from '@test-data/signup.data';
import type { UserRegistration } from "@@types/user";
import { expect } from "@playwright/test";
import { SignUpPage } from '@pages/signup.page';
import { SignedInSideBarComponent } from '@pages/components/signedin-sidebar.component';
import { SignInSideBarComponent } from '@pages/components/signin-sidebar.component';

test("Successful recover sign in info with valid data", { tag: ["@smoke", "@regression"] }, async ({ page }) => {
  const newUser = userRegistration.getValidUser() as UserRegistration;
  const forgotInfoPage = new ForgotSignInInfoPage(page);
  const signupPage =  new SignUpPage(page);
  const signInSideBar = new SignInSideBarComponent(page);
  const signedInSideBar = new SignedInSideBarComponent(page);
  
  await test.step("Precondition: Register a new user", async () => {
    await signupPage.registerUser(newUser);
    await signedInSideBar.logOut(signInSideBar.EXPECTED_PAGE_URL);
  });

  await test.step("Navigating to forgot sign in info page", async () => {
    await forgotInfoPage.nagivate();
  });

  await test.step("Filling forgot sign in info form", async () => {
    await forgotInfoPage.FillForgotInfoForm(newUser);
  });

  await test.step("Submitting forgot sign in info form", async () => {
    await forgotInfoPage.submitForgotInfoForm(newUser);
  });

  await test.step("Validating user has been recovered", async() => {
    await expect(forgotInfoPage.forgotSignInInfoSubmittedSubtitle).toHaveText(forgotInfoPage.EXPECTED_FORM_SUBMITTED_SUCCESS);
    await expect(forgotInfoPage.forgotSignInInfoSubmittedCredentials).toContainText(`Username: ${newUser.username}`);
    await expect(forgotInfoPage.forgotSignInInfoSubmittedCredentials).toContainText(`Password: ${newUser.password}`);
  });
});

test("Unsuccessful attempt to recover sign in info with empty form values", { tag: ["@regression"] }, async ({ page }) => {
  const newUser = forgotSignInInfo.invalid[0] as UserRegistration;
  const forgotInfoPage = new ForgotSignInInfoPage(page);

  await test.step("Navigating to forgot sign in info page", async () => {
    await forgotInfoPage.nagivate();
  });

  await test.step("Filling forgot sign in info form", async () => {
    await forgotInfoPage.FillForgotInfoForm(newUser);
  });

  await test.step("Submitting forgot sign in info form", async () => {
    await forgotInfoPage.submitForgotInfoForm(newUser);
  });

  await test.step("Validating error messages of input validators are displayed", async () => {
    for (const locator of forgotInfoPage.validationErrorList) {
      await expect.soft(locator).toBeVisible();
    }
  });
});

test("Unsuccessful attempt to recover sign in info with incorrect form values", { tag: ["@regression"] }, async ({ page }) => {
  const newUser = forgotSignInInfo.invalid[1] as UserRegistration;
  const forgotInfoPage = new ForgotSignInInfoPage(page);

  await test.step("Navigating to forgot sign in info page", async () => {
    await forgotInfoPage.nagivate();
  });

  await test.step("Filling forgot sign in info form", async () => {
    await forgotInfoPage.FillForgotInfoForm(newUser);
  });

  await test.step("Submitting forgot sign in info form", async () => {
    await forgotInfoPage.submitForgotInfoForm(newUser);
  });

  await test.step("Validating error message is displayed", async () => {
    await expect(forgotInfoPage.formSubmittedErrorHeading).toBeVisible();
    await expect(forgotInfoPage.formSubmittedErrorMessage).toBeVisible();
    await expect(forgotInfoPage.formSubmittedErrorMessage).toHaveText(forgotInfoPage.EXPECTED_FORM_SUBMITTED_ERROR_MESSAGE);
  });
});
