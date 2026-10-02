import { Locator, Page } from "@playwright/test";
import { getUrlPattern } from "@utils/get-url-pattern";
import { BASE_URL } from "@constants/base.constant";
import { Logger } from "@utils/logger";
import type { ForgotSignInInfo, UserRegistration } from "@@types/user";
import { getFullname } from '@utils/get-fullname';

export class ForgotSignInInfoPage {
  private readonly page: Page;
  private readonly mainContent: Locator;
  readonly forgotSigninInfoHeading: Locator;
  readonly forgotSigninInfoSubtitle: Locator;
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
  readonly formSubmittedErrorHeading: Locator;
  readonly formSubmittedErrorMessage: Locator;
  readonly validationErrorList: Locator[];
  readonly forgotSignInInfoSubmittedSubtitle: Locator;
  readonly forgotSignInInfoSubmittedCredentials: Locator;

  private readonly PAGE_NAME = "lookup";
  readonly EXPECTED_PAGE_URL = new RegExp(getUrlPattern(this.PAGE_NAME));
  readonly EXPECTED_FORM_SUBMITTED_ERROR_MESSAGE = "The customer information provided could not be found.";
  readonly EXPECTED_FORM_SUBMITTED_SUCCESS = "Your login information was located successfully. You are now logged in.";


  constructor(page: Page) {
    this.page = page;
    this.mainContent = page.locator("#rightPanel");
    this.forgotSigninInfoHeading = page.getByRole("heading", { name: "Customer Lookup" });
    this.forgotSigninInfoSubtitle = page.getByText("Please fill out the following information in order to validate your account.");
    
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
    this.forgotSignInInfoSubmittedSubtitle = this.mainContent.locator("> p").nth(0);
    this.forgotSignInInfoSubmittedCredentials = this.mainContent.locator("> p").nth(1);
    this.formSubmittedErrorHeading = this.page.getByRole("heading", { name: "Error!" });
    this.formSubmittedErrorMessage = this.page.locator("#rightPanel > p");
    this.validationErrorList = [
      this.firstNameErrorMessage,
      this.lastNameErrorMessage,
      this.addressErrorMessage,
      this.cityErrorMessage,
      this.stateErrorMessage,
      this.zipCodeErrorMessage,
      this.ssnErrorMessage
    ];
  }

  nagivate = async () => {
    const currentUrl = `${BASE_URL}/${this.PAGE_NAME}.htm`;
    Logger.debug(`Navigating to url: ${currentUrl}`);
    await this.page.goto(currentUrl);
  };

  FillForgotInfoForm = async (userData: ForgotSignInInfo) => {
    Logger.debug(`Filling forgot info form for: ${getFullname(userData.firstName, userData.lastName)}`);
    await this.firstNameInput.fill(userData.firstName);
    await this.lastNameInput.fill(userData.lastName);
    await this.addressInput.fill(userData.address);
    await this.cityInput.fill(userData.city);
    await this.stateInput.fill(userData.state);
    await this.zipCodeInput.fill(userData.zipCode);
    await this.ssnInput.fill(userData.ssn);
  };

  submitForgotInfoForm = async (userData?: ForgotSignInInfo) => {
    Logger.debug(`Submitting forgot info form for username: ${getFullname(userData?.firstName || '', userData?.lastName || '')}`);
    await this.findInfoBtn.click();
  };
}