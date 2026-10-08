import { test } from "@fixtures/merge.fixture";
import { expect } from "@playwright/test";
import { Logger } from "@utils/logger";
import { accountType, openNewAccountConfirmation } from "@test-data/open-new-account.data";
import { OpenNewAccountPage } from "@pages/accounts/open-new-account.page";


test("Successful open new Savings account", { tag: ["@smoke", "@regression"] }, async ({ signedInPage }) => {
  Logger.debug(`Open new account for username - ${signedInPage.registeredUser.username}`);
  const openNewAccountPage = new OpenNewAccountPage(signedInPage.page);
  await test.step("Navigating to open new account page", async () => {
    await openNewAccountPage.navigate();
  });

  await test.step("Filling open new account form", async () => {
    await openNewAccountPage.FillOpenNewAccountForm(accountType.savings);
  });

  await test.step("Submitting open new account form", async () => {
    await openNewAccountPage.openNewAccount(accountType.savings);
  });

  await test.step("Validating new account has been opened", async () => {
    await expect(openNewAccountPage.openNewAccountConfirmationNumberLink).toHaveText(/^\d+$/);
    const accounNumber = await openNewAccountPage.openNewAccountConfirmationNumberLink.innerText();
    Logger.debug(`Account created with number: ${accounNumber}`);

    await expect(openNewAccountPage.openNewAccountConfirmationHeading).toHaveText(openNewAccountConfirmation.header);
    await expect(openNewAccountPage.openNewAccountConfirmationSubtitle).toHaveText(openNewAccountConfirmation.message);
    await expect(openNewAccountPage.openNewAccountConfirmationNumber).toContainText(openNewAccountConfirmation.newAccountNumber);
    await expect(openNewAccountPage.openNewAccountConfirmationNumberLink).toHaveAttribute("href", `activity.htm?id=${accounNumber}`);
  });
});

//TODO: check missing errro validator in open new account form 
/*test("Unsuccessful open a new Savings account", { tag: ["@regression"] }, async ({ page }) => {
  test.fail(true, "Known defect: ParaBank allows opening an account from an account with $0 available");
  //Logger.debug(`New User - ${newUser.username}`);
  const openNewAccountPage = new OpenNewAccountPage(page);
  await test.step("Navigating to open new account page", async () => {
    await openNewAccountPage.navigate();
  });

  await test.step("Filling open new account form", async () => {
    await openNewAccountPage.FillOpenNewAccountForm(accountType.savings);
  });

  await test.step("Submitting open new account form", async () => {
    await openNewAccountPage.openNewAccount(accountType.savings);
  });

  await test.step("Validating error message is displayed", async () => {
    await expect(openNewAccountPage.openNewAccountConfirmationHeading).toHaveText(openNewAccountConfirmation.header);
    await expect(openNewAccountPage.openNewAccountConfirmationSubtitle).toHaveText(openNewAccountConfirmation.message);
  });
});*/
