import { expect } from "@playwright/test";
import { AccountsOverviewPage } from "@pages/accounts-overview.page";
import { SignedInSideBarComponent } from "@pages/components/signedin-sidebar.component";
import { SignInSideBarComponent } from "@pages/components/signin-sidebar.component";
import { test } from "@fixtures/merge.fixture";
import { userCredentials, signinErrors, signedinConfirmation } from "@test-data/signin.data";
import { userRegistration } from '@test-data/signup.data';
import type { UserRegistration } from '@@types/user';

import { SignUpPage } from '@pages/signup.page';

test("Successful sign in using valid credentials", { tag: ["@smoke", "@regression"] }, async ({ page }) => {
  const newUser = userRegistration.getValidUser() as UserRegistration;
  const signInSideBar = new SignInSideBarComponent(page);
  const signedInSideBar = new SignedInSideBarComponent(page);
  const signupPage = new SignUpPage(page);

  await test.step("Precondition: Register a new user", async () => {
    await signupPage.registerUser(newUser);
    await signedInSideBar.logOut(signInSideBar.EXPECTED_PAGE_URL);
  });

  await test.step("Navigating to sign in page", async () => {
    await signInSideBar.navigate();
  });

  await test.step("Filling and submitting sign in form", async () => {
    await signInSideBar.submitLogin(newUser.username, newUser.password);
  });

  await test.step("Validating user has signed in", async () => {
    const signedInSideBar = new SignedInSideBarComponent(page);
    await expect(signedInSideBar.welcomeText).toBeVisible();
    await expect(signedInSideBar.welcomeText).toHaveText(signedinConfirmation.greetingMessage(newUser.firstName, newUser.lastName));
    await expect(signedInSideBar.accountServicesHeading).toHaveText("Account Services");
    for (const link of signedInSideBar.accountServicesLinks) {
      await expect.soft(link).toBeVisible();
    }
  });
});

test("Unsuccessful sign in attempt with invalid username or password", { tag: ["@regression"] }, async ({ page }) => {
  const { username, password } = userCredentials.invalid[0];
  const signInSideBarcomponent = new SignInSideBarComponent(page);
  await test.step("Navigating to sign in page", async () => {
    await signInSideBarcomponent.navigate();
  });

  await test.step("Filling and submitting sign in form", async () => {
    await signInSideBarcomponent.submitLogin(username, password);
  });

  await test.step("Validating error message is displayed", async () => {
    await expect(signInSideBarcomponent.errorHeading).toBeVisible();
    await expect(signInSideBarcomponent.errorHeading).toHaveText(signinErrors.incorrectValues.header);
    await expect(signInSideBarcomponent.errorMessage).toBeVisible();
    await expect(signInSideBarcomponent.errorMessage).toHaveText(signinErrors.incorrectValues.message);
  });
});

test("Unsuccessful sign in attempt with empty username or password", { tag: ["@regression"] }, async ({ page }) => {
  const signInSideBarcomponent = new SignInSideBarComponent(page);
  await test.step("Navigating to sign in page", async () => {
    await signInSideBarcomponent.navigate();
  });

  await test.step("Filling and submitting sign in form", async () => {
    await signInSideBarcomponent.submitLogin("", "");
  });

  await test.step("Validating error message is displayed", async () => {
    await expect(signInSideBarcomponent.errorHeading).toBeVisible();
    await expect(signInSideBarcomponent.errorHeading).toHaveText(signinErrors.emptyValues.header);
    await expect(signInSideBarcomponent.errorMessage).toBeVisible();
    await expect(signInSideBarcomponent.errorMessage).toHaveText(signinErrors.emptyValues.message);
  });
});

test("Redirection attempt to secure pages without active session authentication", { tag: ["@security", "@smoke", "@regression"] }, async ({ page }) => {
  const overviewPage = new AccountsOverviewPage(page);
  await test.step("Navigating to overview page", async () => {
    await overviewPage.navigate();
  });

  await test.step("Validating error message is displayed", async () => {
    await expect(overviewPage.errorHeading).toBeVisible();
    await expect(overviewPage.errorHeading).toHaveText(signinErrors.noActiveSession.header);
    await expect(overviewPage.errorMessage).toBeVisible();
    await expect(overviewPage.errorMessage).toHaveText(signinErrors.noActiveSession.message);
  });
});

test("Successful user logout and invalidation of the active session", { tag: ["@security", "@smoke", "@regression"] }, async ({ page }) => {
  const { username, password } = userCredentials.valid[0];
  const signInSideBarcomponent = new SignInSideBarComponent(page);
  await test.step("Navigating to sign in page", async () => {
    await signInSideBarcomponent.navigate();
  });

  await test.step("Filling and submitting sign in form", async () => {
    await signInSideBarcomponent.submitLogin(username, password);
  });

  await test.step("Signing out", async () => {
    const signedInSideBar = new SignedInSideBarComponent(page);
    await signedInSideBar.logOut(signInSideBarcomponent.EXPECTED_PAGE_URL);
  });

  await test.step("Validating user has signed out", async () => {
    await expect(page).toHaveURL(signInSideBarcomponent.EXPECTED_PAGE_URL);
    for (const elem of signInSideBarcomponent.loginSideBarElements) {
      await expect.soft(elem).toBeVisible();
    }
  });
});

test("Pre-login sidebar displays all required labels, inputs, and links", { tag: ["@regression"] }, async ({ page }) => {
  const signInSideBarcomponent = new SignInSideBarComponent(page);
  await test.step("Navigating to sign in page", async () => {
    await signInSideBarcomponent.navigate();
  });

  await test.step("Validating UI elements are displayed", async () => {
    for (const elem of signInSideBarcomponent.loginSideBarElements) {
      await expect.soft(elem).toBeVisible();
    }
  });
});
