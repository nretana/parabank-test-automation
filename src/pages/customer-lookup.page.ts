import { Locator, Page } from "@playwright/test";
import { getUrlPattern } from "@utils/get-url-pattern";
import { BASE_URL } from "@constants/base.constant";
import { Logger } from "@utils/logger";
import type { CustomerLookup } from "@@types/user";
import type { CustomerLookupField } from "@@types/customer-lookup";
import { getFullname } from "@utils/get-fullname";
import { customerLookupValidatorErrors } from "@test-data/customer-lookup.data";

export class CustomerLookupPage {
  private readonly page: Page;
  private readonly mainContent: Locator;
  private readonly PAGE_NAME = "lookup";
  readonly customerLookupHeading: Locator;
  readonly customerLookupSubtitle: Locator;
  readonly firstNameLabel: Locator;
  readonly firstNameInput: Locator;
  readonly firstNameErrorMessage: Locator;
  readonly lastNameLabel: Locator;
  readonly lastNameInput: Locator;
  readonly lastNameErrorMessage: Locator;
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
  readonly ssnLabel: Locator;
  readonly ssnInput: Locator;
  readonly ssnErrorMessage: Locator;
  readonly findInfoBtn: Locator;
  readonly customerLookupFormErrorHeading: Locator;
  readonly customerLookupFormErrorMessage: Locator;
  readonly customerLookupConfirmationSubtitle: Locator;
  readonly customerLookupConfirmationCredentials: Locator;
  readonly EXPECTED_PAGE_URL = new RegExp(getUrlPattern(this.PAGE_NAME));

  constructor(page: Page) {
    this.page = page;
    this.mainContent = page.locator("#rightPanel");
    this.customerLookupHeading = page.getByRole("heading", { name: "Customer Lookup" });
    this.customerLookupSubtitle = page.locator("#rightPanel > p");

    this.firstNameLabel = this.mainContent.getByText("First Name:");
    this.firstNameInput = page.locator('[id="firstName"]');
    this.firstNameErrorMessage = this.mainContent.getByText("First name is required.");

    this.lastNameLabel = page.getByText("Last Name:");
    this.lastNameInput = page.locator('[id="lastName"]');
    this.lastNameErrorMessage = this.mainContent.getByText("Last name is required.");

    this.addressLabel = page.getByText("Address:");
    this.addressInput = page.locator('[id="address.street"]');
    this.addressErrorMessage = this.mainContent.getByText("Address is required.");

    this.cityLabel = page.getByText("City:");
    this.cityInput = page.locator('[id="address.city"]');
    this.cityErrorMessage = this.mainContent.getByText("City is required.");

    this.stateLabel = page.getByText("State:");
    this.stateInput = page.locator('[id="address.state"]');
    this.stateErrorMessage = this.mainContent.getByText("State is required.");

    this.zipCodeLabel = page.getByText("Zip Code:");
    this.zipCodeInput = page.locator('[id="address.zipCode"]');
    this.zipCodeErrorMessage = this.mainContent.getByText("Zip Code is required.");

    this.ssnLabel = page.getByText("SSN:");
    this.ssnInput = page.locator('[id="ssn"]');
    this.ssnErrorMessage = this.mainContent.getByText("Social Security Number is required.");

    this.findInfoBtn = page.getByRole("button", { name: "Find My Login Info" });
    this.customerLookupConfirmationSubtitle = this.mainContent.locator("> p").nth(0);
    this.customerLookupConfirmationCredentials = this.mainContent.locator("> p").nth(1);
    this.customerLookupFormErrorHeading = this.page.getByRole("heading", { name: "Error!" });
    this.customerLookupFormErrorMessage = this.page.locator("#rightPanel > p");
  }

  nagivate = async () => {
    const currentUrl = `${BASE_URL}/${this.PAGE_NAME}.htm`;
    Logger.debug(`Navigating to url: ${currentUrl}`);
    await this.page.goto(currentUrl);
  };

  FillForgotInfoForm = async (userData: CustomerLookup) => {
    Logger.debug(`Filling forgot info form for: ${getFullname(userData.firstName, userData.lastName)}`);
    await this.firstNameInput.fill(userData.firstName);
    await this.lastNameInput.fill(userData.lastName);
    await this.addressInput.fill(userData.address);
    await this.cityInput.fill(userData.city);
    await this.stateInput.fill(userData.state);
    await this.zipCodeInput.fill(userData.zipCode);
    await this.ssnInput.fill(userData.ssn);
  };

  submitForgotInfoForm = async (userData?: CustomerLookup) => {
    Logger.debug(`Submitting forgot info form for username: ${getFullname(userData?.firstName || "", userData?.lastName || "")}`);
    await this.findInfoBtn.click();
  };

  getCustomerLookupFields = () => [
      {
        label: this.firstNameLabel,
        expectedLabel: "First Name:",
        input: this.firstNameInput,
        requiredError: this.firstNameErrorMessage,
        expectedRequiredError: customerLookupValidatorErrors.firstNameRequired,
      },
      {
        label: this.lastNameLabel,
        expectedLabel: "Last Name:",
        input: this.lastNameInput,
        requiredError: this.lastNameErrorMessage,
        expectedRequiredError: customerLookupValidatorErrors.lastNameRequired,
      },
      {
        label: this.addressLabel,
        expectedLabel: "Address:",
        input: this.addressInput,
        requiredError: this.addressErrorMessage,
        expectedRequiredError: customerLookupValidatorErrors.addressRequired,
      },
      {
        label: this.cityLabel,
        expectedLabel: "City:",
        input: this.cityInput,
        requiredError: this.cityErrorMessage,
        expectedRequiredError: customerLookupValidatorErrors.cityRequired,
      },
      {
        label: this.stateLabel,
        expectedLabel: "State:",
        input: this.stateInput,
        requiredError: this.stateErrorMessage,
        expectedRequiredError: customerLookupValidatorErrors.stateRequired,
      },
      {
        label: this.zipCodeLabel,
        expectedLabel: "Zip Code:",
        input: this.zipCodeInput,
        requiredError: this.zipCodeErrorMessage,
        expectedRequiredError: customerLookupValidatorErrors.zipCodeRequired,
      },
      {
        label: this.ssnLabel,
        expectedLabel: "SSN:",
        input: this.ssnInput,
        requiredError: this.ssnErrorMessage,
        expectedRequiredError: customerLookupValidatorErrors.ssnRequired,
      },
    ];
}
