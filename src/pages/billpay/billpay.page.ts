import { Page, Locator } from "@playwright/test";
import { getUrlPattern } from "@utils/get-url-pattern";
import { BASE_URL } from "@constants/base.constant";
import { Logger } from "@utils/logger";
import { BillPayFormEntry } from "@@types/billpay";
import { billPayLabels, billPayValidationErrors } from "@test-data/billpay.data";

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
  readonly accountNumberRequiredErrorMessage: Locator;
  readonly accountNumberInvalidErrorMessage: Locator;

  readonly verifyAccountNumberLabel: Locator;
  readonly verifyAccountNumberInput: Locator;
  readonly verifyAccountNumberRequiredErrorMessage: Locator;
  readonly verifyAccountNumberInvalidErrorMessage: Locator;
  readonly verifyAccountNumberMismatchErrorMessage: Locator;

  readonly amountLabel: Locator;
  readonly amountInput: Locator;
  readonly amountRequiredErrorMessage: Locator;
  readonly amountInvalidErrorMessage: Locator;

  readonly fromAccountLabel: Locator;
  readonly fromAccountSelect: Locator;

  readonly submitFormBtn: Locator;
  readonly billPayConfirmationHeading: Locator;
  readonly billPayConfirmationSubtitle: Locator;
  readonly billPayConfirmationDetails: Locator;

  readonly billPayErrorHeading: Locator;
  readonly billPayErrorSubtitle: Locator;

  readonly EXPECTED_PAGE_URL = new RegExp(getUrlPattern(this.PAGE_NAME));

  constructor(page: Page) {
    this.page = page;
    this.billPayFormHeading = page.locator("#rightPanel [id='billpayForm'] > h1");
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
    this.accountNumberRequiredErrorMessage = page.locator('[id="validationModel-account-empty"]');
    this.accountNumberInvalidErrorMessage = page.locator('[id="validationModel-account-invalid"]');

    this.verifyAccountNumberLabel = page.getByText("Verify Account #:");
    this.verifyAccountNumberInput = page.locator('[name="verifyAccount"]');
    this.verifyAccountNumberRequiredErrorMessage = page.locator('[id="validationModel-verifyAccount-empty"]');
    this.verifyAccountNumberInvalidErrorMessage = page.locator('[id="validationModel-verifyAccount-invalid"]');
    this.verifyAccountNumberMismatchErrorMessage = page.locator('[id="validationModel-verifyAccount-mismatch"]');

    this.amountLabel = page.getByText("Amount: $");
    this.amountInput = page.locator('[name="amount"]');
    this.amountRequiredErrorMessage = page.locator('[id="validationModel-amount-empty"]');
    this.amountInvalidErrorMessage = page.locator('[id="validationModel-amount-invalid"]');

    this.fromAccountLabel = page.getByText("From account #:");
    this.fromAccountSelect = page.locator('[name="fromAccountId"]');

    this.submitFormBtn = page.getByRole("button", { name: "Send Payment" });
    this.billPayConfirmationHeading = page.locator("#rightPanel [id='billpayResult'] > h1");
    this.billPayConfirmationSubtitle = page.locator("#rightPanel [id='billpayResult'] > p").nth(0);
    this.billPayConfirmationDetails = page.locator("#rightPanel [id='billpayResult'] > p").nth(1);

    this.billPayErrorHeading = page.locator("#rightPanel [id='billpayError'] > h1");
    this.billPayErrorSubtitle = page.locator("#rightPanel [id='billpayError'] > p").nth(0);
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
    await this.fromAccountSelect.selectOption({ index: 0 });
  };

  submitBillPayForm = async (billPayData?: BillPayFormEntry): Promise<void> => {
    Logger.debug(`Submitting bill pay form for payee: ${billPayData?.payeeName || "N/A"}`);
    await this.submitFormBtn.click();
  };

  getBillPayFormFields = () => [
  {
    locator: this.payeeNameLabel,
    expectedLabel: billPayLabels.payeeNameLabel,
    input: this.payeeNameInput,
    errors: {
      required: {
        errorLocator: this.payeeNameErrorMessage,
        expectedErrorMessage: billPayValidationErrors.required.payeeNameRequired,
      },
    },
  },
  {
    locator: this.addressLabel,
    expectedLabel: billPayLabels.addressLabel,
    input: this.addressInput,
    errors: {
      required: {
        errorLocator: this.addressErrorMessage,
        expectedErrorMessage: billPayValidationErrors.required.addressRequired
      },
    },
  },
  {
    locator: this.cityLabel,
    expectedLabel: billPayLabels.cityLabel,
    input: this.cityInput,
    errors: {
      required: {
        errorLocator: this.cityErrorMessage,
        expectedErrorMessage: billPayValidationErrors.required.cityRequired,
      },
    },
  },
  {
    locator: this.stateLabel,
    expectedLabel: billPayLabels.stateLabel,
    input: this.stateInput,
    errors: {
      required: {
        errorLocator: this.stateErrorMessage,
        expectedErrorMessage: billPayValidationErrors.required.stateRequired,
      },
    },
  },
  {
    locator: this.zipCodeLabel,
    expectedLabel: billPayLabels.zipCodeLabel,
    input: this.zipCodeInput,
    errors: {
      required: {
        errorLocator: this.zipCodeErrorMessage,
        expectedErrorMessage: billPayValidationErrors.required.zipCodeRequired,
      },
    },
  },
  {
    locator: this.phoneLabel,
    expectedLabel: billPayLabels.phoneLabel,
    input: this.phoneInput,
    errors: {
      required: {
        errorLocator: this.phoneErrorMessage,
        expectedErrorMessage: billPayValidationErrors.required.phoneRequired,
      },
    }
  },
  {
    locator: this.accountNumberLabel,
    expectedLabel: billPayLabels.accountNumberLabel,
    input: this.accountNumberInput,
    errors: {
      required: {
        errorLocator: this.accountNumberRequiredErrorMessage,
        expectedErrorMessage: billPayValidationErrors.required.accountNumberRequired,
      },
      invalid: {
        errorLocator: this.accountNumberInvalidErrorMessage,
        expectedErrorMessage: billPayValidationErrors.invalid.accountNumberInvalid
      }
    }
  },
  {
    locator: this.verifyAccountNumberLabel,
    expectedLabel: billPayLabels.verifyAccountNumberLabel,
    input: this.verifyAccountNumberInput,
    errors: {
      required: {
        errorLocator: this.verifyAccountNumberRequiredErrorMessage,
        expectedErrorMessage: billPayValidationErrors.required.accountNumberRequired,
      },
      invalid: {
        errorLocator: this.verifyAccountNumberInvalidErrorMessage,
        expectedErrorMessage: billPayValidationErrors.invalid.accountNumberInvalid
      },
      mismatch: {
        errorLocator: this.verifyAccountNumberMismatchErrorMessage,
        expectedErrorMessage: billPayValidationErrors.mismatch.verifyAccountNumberMismatch
      }
    }
  },
  {
    locator: this.amountLabel,
    expectedLabel: billPayLabels.amountLabel,
    input: this.amountInput,
    errors: {
      required: {
        errorLocator: this.amountRequiredErrorMessage,
        expectedErrorMessage: billPayValidationErrors.required.amountRequired,
      },
      invalid: {
        errorLocator: this.amountInvalidErrorMessage,
        expectedErrorMessage: billPayValidationErrors.invalid.amountInvalid,
      }
    }
  },
  {
    locator: this.fromAccountLabel,
    expectedLabel: billPayLabels.fromAccountLabel,
    input: this.fromAccountSelect
  },
];
}
