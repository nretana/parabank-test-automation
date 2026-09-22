import { SignUpPage } from "@pages/signup.page";
import { test } from "@fixtures/merge.fixture";
import { TEST_USER_REGISTRATION } from "@test-data/signup.data";
import { UserRegistration } from "@@types/user";
import { SignedInSideBarComponent } from "@pages/components/signedin-sidebar.component";
import { expect } from "@playwright/test";

test("Successful signup using valid data", { tag:["@smoke", "@regression"] }, async ({ page }) => {
  const newUser = TEST_USER_REGISTRATION.valid[0] as UserRegistration;
  const signupPage = new SignUpPage(page);
  await signupPage.nagivate();
  await signupPage.submitSignUp(newUser);
  
  const userSideBarComponent = new SignedInSideBarComponent(page);
  await expect(userSideBarComponent.welcomeText).toBeVisible();
  await expect(userSideBarComponent.accountServicesHeading).toHaveText("Account Services");
  for (const link of userSideBarComponent.accountServicesLinks) {
    await expect.soft(link).toBeVisible();
  }
  await expect(signupPage.userRegisteredHeading).toHaveText(signupPage.expectedUserRegisteredHeading(newUser.username));
  await expect(signupPage.userRegisteredSubtitle).toHaveText(signupPage.EXPECTED_USER_REGISTERED_SUBTITLE);
});
