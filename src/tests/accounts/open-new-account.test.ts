import { test } from "@fixtures/merge.fixture";
import { expect } from "@playwright/test";
import { Logger } from "@utils/logger";
import { accountTypes, openNewAccountConfirmation, openNewAccountError } from "@test-data/open-new-account.data";
import { OpenNewAccountPage } from "@pages/accounts/open-new-account.page";

for (const accType of accountTypes) {
  test(`Successful open new ${accType.type} account`, { tag: ["@smoke", "@regression"] }, async ({ signedInPage }) => {
    Logger.debug(`Open new account for username - ${signedInPage.registeredUser.username}`);
    const openNewAccountPage = new OpenNewAccountPage(signedInPage.page);
    await test.step("Navigating to open new account page", async () => {
      await openNewAccountPage.navigate();
    });

    await test.step("Filling open new account form", async () => {
      await openNewAccountPage.FillOpenNewAccountForm(accType.expectedLabel);
    });

    await test.step("Submitting open new account form", async () => {
      await openNewAccountPage.openNewAccount(accType.expectedLabel);
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
}

for (const accType of accountTypes) {
  test(
    `Unsuccessful open a new ${accType.type} account`,
    { tag: ["@regression"], annotation: { type: "issue", description: "https://github.com/nretana/parabank-test-automation/issues/1" } },
    async ({ signedInPage }) => {
      test.fail(true, "Issue #1: ParaBank allows opening an account from a source with less than $100");
      Logger.debug(`Opening 5 additional accounts to reduce the source account balance below $100 for username: ${signedInPage.registeredUser.username}`);
      const openNewAccountPage = new OpenNewAccountPage(signedInPage.page);
      await test.step("Opening 5 additional accounts to reduce the source account balance below $100", async () => {
        for (let i = 1; i <= 5; i++) {
          Logger.debug(`open account #${i} for username: ${signedInPage.registeredUser.username}`);
          await test.step("Opening a new account ", async () => {
            await openNewAccountPage.openNewAccount(accType.expectedLabel);
            await expect(openNewAccountPage.openNewAccountConfirmationHeading).toBeVisible();
          });
        }
      });

      Logger.debug(`Attempt to open a new account for username: ${signedInPage.registeredUser.username}`);
      await test.step("Navigating to open new account page", async () => {
        await openNewAccountPage.navigate();
      });

      await test.step("Filling open new account form", async () => {
        await openNewAccountPage.FillOpenNewAccountForm(accType.expectedLabel);
      });

      await test.step("Submitting open new account form", async () => {
        await openNewAccountPage.submitOpenNewAccountForm(accType.type);
      });

      await test.step("Validating error message is displayed", async () => {
        await expect(openNewAccountPage.openNewAccountErrorHeading).toHaveText(openNewAccountError.header);
        await expect(openNewAccountPage.openNewAccountErrorMessage).toHaveText(openNewAccountError.message);
      });
    },
  );
}
