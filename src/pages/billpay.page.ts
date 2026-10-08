import { Page, Locator } from "@playwright/test";
import { getUrlPattern } from "@utils/get-url-pattern";
import { BASE_URL } from "@constants/base.constant";
import { Logger } from "@utils/logger";
import { BillPayFormEntry } from "@@types/billpay";
import { billPayValidationErrors } from "@test-data/billpay.data";

export class BillPayPage {
  readonly page: Page;
  private readonly PAGE_NAME = "billpay";
  readonly billPayFormHeading: Locator;
  readonly billPayFormSubtitle: Locator;

  readonly payeeNameLabel: Locator;
  readonly payeeNameInput: Locator;
  readonly payeeNameErrorMessage: Locator;

  readonly addressLabel: Locator;
  readonly addressInput: Locator;
  readonly addressErrorMessage: Locator;

  readonly cityLabel: Locator;
  readonly cityInput: Locator;
  readonly cityErrorMessage: Locator;

  readonly stateLabel: Locator;
  readonly stateInput: Locator;
  readonly stateErrorMessage: Locator;

  readonly zipCodeLabel: Locator;
  readonly zipCodeInput: Locator;
  readonly zipCodeErrorMessage: Locator;

  readonly phoneLabel: Locator;
  readonly phoneInput: Locator;
  readonly phoneErrorMessage: Locator;

  readonly accountNumberLabel: Locator;
  readonly accountNumberInput: Locator;
  readonly accountNumberErrorMessage: Locator;

  readonly verifyAccountNumberLabel: Locator;
  readonly verifyAccountNumberInput: Locator;
  readonly verifyAccountNumberErrorMessage: Locator;

  readonly amountLabel: Locator;
  readonly amountInput: Locator;
  readonly amountErrorMessage: Locator;

  readonly fromAccountLabel: Locator;
  readonly fromAccountSelect: Locator;

  readonly submitFormBtn: Locator;
  readonly billPayConfirmationHeading: Locator;
  readonly billPayConfirmationSubtitle: Locator;
  readonly EXPECTED_PAGE_URL = new RegExp(getUrlPattern(this.PAGE_NAME));

  constructor(page: Page) {
    this.page = page;
    this.billPayFormHeading = page.locator("#rightPanel > h1");
    this.billPayFormSubtitle = page.locator("#rightPanel p").nth(0);

    this.payeeNameLabel = page.getByText("Payee Name:");
    this.payeeNameInput = page.locator('[name="payee.name"]');
    this.payeeNameErrorMessage = page.locator('[id="validationModel-name"]');

    this.addressLabel = page.getByText("Address:");
    this.addressInput = page.locator('[name="payee.address.street"]');
    this.addressErrorMessage = page.locator('[id="validationModel-address"]');

    this.cityLabel = page.getByText("City:");
    this.cityInput = page.locator('[name="payee.address.city"]');
    this.cityErrorMessage = page.locator('[id="validationModel-city"]');

    this.stateLabel = page.getByText("State:");
    this.stateInput = page.locator('[name="payee.address.state"]');
    this.stateErrorMessage = page.locator('[id="validationModel-state"]');

    this.zipCodeLabel = page.getByText("Zip Code:");
    this.zipCodeInput = page.locator('[name="payee.address.zipCode"]');
    this.zipCodeErrorMessage = page.locator('[id="validationModel-zipCode"]');

    this.phoneLabel = page.getByText("Phone #:");
    this.phoneInput = page.locator('[name="payee.phoneNumber"]');
    this.phoneErrorMessage = page.locator('[id="validationModel-phoneNumber"]');

    this.accountNumberLabel = page.getByText("Account #:", { exact: true });
    this.accountNumberInput = page.locator('[name="payee.accountNumber"]');
    this.accountNumberErrorMessage = page.locator('[id="validationModel-account"]');

    this.verifyAccountNumberLabel = page.getByText("Verify Account #:");
    this.verifyAccountNumberInput = page.locator('[name="verifyAccount"]');
    this.verifyAccountNumberErrorMessage = page.locator('[id="validationModel-verifyAccount"]');

    this.amountLabel = page.getByText("Amount: $");
    this.amountInput = page.locator('[name="amount"]');
    this.amountErrorMessage = page.locator('[id="validationModel-amount"]');

    this.fromAccountLabel = page.getByText("From account #:");
    this.fromAccountSelect = page.locator('[name="fromAccountId"]');

    this.submitFormBtn = page.getByRole("button", { name: "Send Payment" });
    this.billPayConfirmationHeading = page.locator("#rightPanel > h1");
    this.billPayConfirmationSubtitle = page.locator("#rightPanel p").nth(0);
  }

  navigate = async (): Promise<void> => {
    const currentUrl = `${BASE_URL}/${this.PAGE_NAME}.htm`;
    Logger.debug(`Navigating to url: ${currentUrl}`);
    await this.page.goto(currentUrl);
  };

  FillBillPayForm = async (billPayData: BillPayFormEntry): Promise<void> => {
    Logger.debug(`Filling bill pay form for payee: ${billPayData.payeeName}`);
    await this.payeeNameInput.fill(billPayData.payeeName);
    await this.addressInput.fill(billPayData.address);
    await this.cityInput.fill(billPayData.city);
    await this.stateInput.fill(billPayData.state);
    await this.zipCodeInput.fill(billPayData.zipCode);
    await this.phoneInput.fill(billPayData.phone);
    await this.accountNumberInput.fill(billPayData.accountNumber.toString());
    await this.verifyAccountNumberInput.fill(billPayData.verifyAccountNumber.toString());
    await this.amountInput.fill(billPayData.amount.toString());
    await this.fromAccountSelect.selectOption({ label: billPayData.fromAccountNumber.toString() });
  };

  submitBillPayForm = async (userData?: BillPayFormEntry): Promise<void> => {
    Logger.debug(`Submitting bill pay form for payee: ${userData?.payeeName || "N/A"}`);
    await this.submitFormBtn.click();
  };

  getBillPayFormFields = () => [
    {
      label: this.payeeNameLabel,
      expectedLabel: "Payee Name:",
      input: this.payeeNameInput,
      requiredError: this.payeeNameErrorMessage,
      expectedRequiredError: billPayValidationErrors.required.payeeNameRequired,
    },
    {
      label: this.addressLabel,
      expectedLabel: "Address:",
      input: this.addressInput,
      requiredError: this.addressErrorMessage,
      expectedRequiredError: billPayValidationErrors.required.addressRequired,
    },
    {
      label: this.cityLabel,
      expectedLabel: "City:",
      input: this.cityInput,
      requiredError: this.cityErrorMessage,
      expectedRequiredError: billPayValidationErrors.required.cityRequired,
    },
    {
      label: this.stateLabel,
      expectedLabel: "State:",
      input: this.stateInput,
      requiredError: this.stateErrorMessage,
      expectedRequiredError: billPayValidationErrors.required.stateRequired,
    },
    {
      label: this.zipCodeLabel,
      expectedLabel: "Zip Code:",
      input: this.zipCodeInput,
      requiredError: this.zipCodeErrorMessage,
      expectedRequiredError: billPayValidationErrors.required.zipCodeRequired,
    },
    {
      label: this.phoneLabel,
      expectedLabel: "Phone #:",
      input: this.phoneInput,
      requiredError: this.phoneErrorMessage,
      expectedRequiredError: billPayValidationErrors.required.phoneRequired,
    },
    {
      label: this.accountNumberLabel,
      expectedLabel: "Account #:",
      input: this.accountNumberInput,
      requiredError: this.accountNumberErrorMessage,
      expectedRequiredError: billPayValidationErrors.required.accountNumberRequired,
    },
    {
      label: this.verifyAccountNumberLabel,
      expectedLabel: "Verify Account #:",
      input: this.verifyAccountNumberInput,
      requiredError: this.verifyAccountNumberErrorMessage,
      expectedRequiredError: billPayValidationErrors.required.verifyAccountNumberRequired,
    },
    {
      label: this.amountLabel,
      expectedLabel: "Amount: $",
      input: this.amountInput,
      requiredError: this.amountErrorMessage,
      expectedRequiredError: billPayValidationErrors.required.amountRequired,
    },
    {
      label: this.fromAccountLabel,
      expectedLabel: "From account #",
      input: this.fromAccountSelect,
    },
  ];

  getBillPayFormFields2 = () => [
    {
      label: this.payeeNameLabel,
      expectedLabel: "Payee Name:",
      input: this.payeeNameInput,
      errorValidator: this.payeeNameErrorMessage,
      errors: {
        expectedRequiredError: billPayValidationErrors.required.payeeNameRequired,
      },
    },
    {
      label: this.addressLabel,
      expectedLabel: "Address:",
      input: this.addressInput,
      errorValidator: this.addressErrorMessage,
      errors: {
        expectedRequiredError: billPayValidationErrors.required.addressRequired,
      },
    },
    {
      label: this.cityLabel,
      expectedLabel: "City:",
      input: this.cityInput,
      errorValidator: this.cityErrorMessage,
      errors: {
        expectedRequiredError: billPayValidationErrors.required.cityRequired,
      },
    },
    {
      label: this.stateLabel,
      expectedLabel: "State:",
      input: this.stateInput,
      errorValidator: this.stateErrorMessage,
      errors: {
        expectedRequiredError: billPayValidationErrors.required.stateRequired,
      },
    },
    {
      label: this.zipCodeLabel,
      expectedLabel: "Zip Code:",
      input: this.zipCodeInput,
      errorValidator: this.zipCodeErrorMessage,
      errors: {
        expectedRequiredError: billPayValidationErrors.required.zipCodeRequired,
      },
    },
    {
      label: this.phoneLabel,
      expectedLabel: "Phone #:",
      input: this.phoneInput,
      errorValidator: this.phoneErrorMessage,
      errors: {
        expectedRequiredError: billPayValidationErrors.required.phoneRequired,
      }
    },
    {
      label: this.accountNumberLabel,
      expectedLabel: "Account #:",
      input: this.accountNumberInput,
      errorValidator: this.accountNumberErrorMessage,
      errors: {
        expectedRequiredError: billPayValidationErrors.required.accountNumberRequired,
        expectedInvalidError: billPayValidationErrors.invalid.accountNumberInvalid,
      }
    },
    {
      label: this.verifyAccountNumberLabel,
      expectedLabel: "Verify Account #:",
      input: this.verifyAccountNumberInput,
      errorValidator: this.verifyAccountNumberErrorMessage,
      errors: {
        expectedRequiredError: billPayValidationErrors.required.verifyAccountNumberRequired,
        expectedInvalidError: billPayValidationErrors.invalid.verifyAccountNumberInvalid,
      }
    },
    {
      label: this.amountLabel,
      expectedLabel: "Amount: $",
      input: this.amountInput,
      errorValidator: this.amountErrorMessage,
      errors: {
        expectedRequiredError: billPayValidationErrors.required.amountRequired,
        expectedInvalidError: billPayValidationErrors.invalid.amountInvalid,
      }
    },
    {
      label: this.fromAccountLabel,
      expectedLabel: "From account #",
      input: this.fromAccountSelect,
    },
  ];
}
