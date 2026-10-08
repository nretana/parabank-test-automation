import { test } from "@fixtures/merge.fixture";
import { BillPayPage } from "@pages/billpay.page";
import { billPay } from "@test-data/billpay.data";
import { expect } from "@playwright/test";

test("Unsuccessful attempt to make a bill payment with empty values", { tag: ["@smoke", "@regression"] }, async ({ page }) => {
  const billPayPage = new BillPayPage(page);

  await test.step("Navigating to bill pay page", async () => {
    await billPayPage.navigate();
  });

  //TODO: wait for dependencies to continue building tests 
  /*await test.step("Filling bill pay form", async () => {
    await billPayPage.FillBillPayForm({});
  });

  await test.step("Submitting bill pay form", async () => {
    await billPayPage.submitBillPayForm({});
  });*/

  await test.step("Validating error messages are displayed", async () => {
    const signUpFields = billPayPage.getBillPayFormFields2();
    for (const field of signUpFields) {
      if (field.errors) {
        await expect.soft(field.errorValidator).toHaveText(field.errors.expectedRequiredError);
      }
    }
  });
});

test("Unsuccessful attempt to make a bill payment with invalid values", { tag: ["@smoke", "@regression"] }, async ({ page }) => {
  const billPayPage = new BillPayPage(page);

  await test.step("Navigating to bill pay page", async () => {
    await billPayPage.navigate();
  });

  //TODO: wait for dependencies to continue building tests
  /*await test.step("Filling bill pay form", async () => {
    await billPayPage.FillBillPayForm({});
  });

  await test.step("Submitting bill pay form", async () => {
    await billPayPage.submitBillPayForm({});
  });*/

  await test.step("Validating error messages are displayed", async () => {
    const signUpFields = billPayPage.getBillPayFormFields2();
    for (const field of signUpFields) {
      if (field.errors && field.errors.expectedInvalidError) {
        await expect.soft(field.errorValidator).toHaveText(field.errors.expectedInvalidError);
      }
    }
  });
});