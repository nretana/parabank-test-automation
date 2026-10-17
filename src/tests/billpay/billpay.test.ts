import { test } from "@fixtures/merge.fixture";
import { BillPayPage } from "@pages/billpay/billpay.page";
import { billPayFormData, billPayForm, billPayConfirmation, billPayError } from "@test-data/billpay.data";
import { expect } from "@playwright/test";

test("TC-BILL-001: Bill pay page displays the expected labels and inputs", { tag: ["@regression"] }, async ({ signedInPage }) => {
  const { page } = signedInPage;
  const billPayPage = new BillPayPage(page);

  await test.step("Navigating to bill pay page", async () => {
    await billPayPage.navigate();
  });

  await test.step("Validating UI elements are displayed", async () => {
    const billPayFields = billPayPage.getBillPayFormFields();
    await expect.soft(billPayPage.billPayFormHeading).toHaveText(billPayForm.header);
    await expect.soft(billPayPage.billPayFormSubtitle).toHaveText(billPayForm.message);
    for (const field of billPayFields) {
      await expect.soft(field.locator).toHaveText(field.expectedLabel);
    }
    await expect.soft(billPayPage.submitFormBtn).toHaveText("Send Payment");
  });
});

test("TC-BILL-002: Successful bill payment transaction", { tag: ["@smoke", "@regression"] }, async ({ signedInPage }) => {
  const { page } = signedInPage;
  const billPayData = billPayFormData.valid[0];
  const billPayPage = new BillPayPage(page);

  await test.step("Navigating to bill pay page", async () => {
    await billPayPage.navigate();
  });

  await test.step("Filling bill pay form", async () => {
    await billPayPage.FillBillPayForm(billPayData);
  });
  const currentFromAcc = await billPayPage.fromAccountSelect.inputValue();
  await test.step("Submitting bill pay form", async () => {
    await billPayPage.submitBillPayForm(billPayData);
  });

  await test.step("Validate payment has been sent", async () => {
    await expect(billPayPage.billPayConfirmationHeading).toHaveText(billPayConfirmation.header);
    await expect(billPayPage.billPayConfirmationSubtitle).toHaveText(billPayConfirmation.message(parseInt(billPayData.amount.toString()), currentFromAcc));
    await expect(billPayPage.billPayConfirmationDetails).toHaveText(billPayConfirmation.details);
  });
});

test("TC-BILL-003: Unsuccessful attempt to make a bill payment with empty values", { tag: ["@regression"] }, async ({ signedInPage }) => {
  const { page } = signedInPage;
  const billPayPage = new BillPayPage(page);

  await test.step("Navigating to bill pay page", async () => {
    await billPayPage.navigate();
  });

  await test.step("Submitting bill pay form", async () => {
    await billPayPage.submitBillPayForm();
  });

  await test.step("Validating error messages are displayed", async () => {
    const billPayFields = billPayPage.getBillPayFormFields();
    for (const field of billPayFields) {
      if (field.errors) {
        await expect.soft(field.errors.required.errorLocator).toHaveText(field.errors.required.expectedErrorMessage);
      }
    }
  });

  await test.step("Validating error messages are displayed", async () => {
    const billPayFields = billPayPage.getBillPayFormFields();
    for (const field of billPayFields) {
      if (field.errors) {
        await expect.soft(field.errors.required.errorLocator).toHaveText(field.errors.required.expectedErrorMessage);
      }
    }
  });
});

test("TC-BILL-004: Unsuccessful attempt to make a bill payment with invalid values", { tag: ["@regression"] }, async ({ signedInPage }) => {
  const { page } = signedInPage;
  const billPayData = billPayFormData.invalid[1];
  const billPayPage = new BillPayPage(page);

  await test.step("Navigating to bill pay page", async () => {
    await billPayPage.navigate();
  });

  await test.step("Filling bill pay form", async () => {
    await billPayPage.FillBillPayForm(billPayData);
  });

  await test.step("Submitting bill pay form", async () => {
    await billPayPage.submitBillPayForm(billPayData);
  });

  await test.step("Validating error messages is displayed", async () => {
    const billPayFields = billPayPage.getBillPayFormFields();
    for (const field of billPayFields) {
      if (field.errors && field.errors.invalid) {
        await expect.soft(field.errors.invalid.errorLocator).toHaveText(field.errors.invalid.expectedErrorMessage);
      }
    }
  });
});

test("TC-BILL-005: Unsuccessful bill payment transaction after submission", { tag: ["@regression"] }, async ({ signedInPage }) => {
  const { page } = signedInPage;
  const billPayData = billPayFormData.invalid[2];
  const billPayPage = new BillPayPage(page);

  await test.step("Navigating to bill pay page", async () => {
    await billPayPage.navigate();
  });

  await test.step("Filling bill pay form", async () => {
    await billPayPage.FillBillPayForm(billPayData);
  });

  await test.step("Submitting bill pay form", async () => {
    await billPayPage.submitBillPayForm(billPayData);
  });

  await test.step("Validating error message is displayed", async () => {
    await expect(billPayPage.billPayErrorHeading).toHaveText(billPayError.header);
    await expect(billPayPage.billPayErrorSubtitle).toHaveText(billPayError.message);
  });
});
