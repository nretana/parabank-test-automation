import { Locator, Page } from "@playwright/test";
import { getUrlPattern } from "@utils/get-url-pattern";
import { BASE_URL } from "@constants/base.constant";
import { Logger } from "@utils/logger";
import type { UserRegistration } from "@@types/user";
import type { SignUpField } from '@@types/signup';
import { signupValidatorErrors } from "@test-data/signup.data";

export class SignUpPage {
  private readonly page: Page;
  private readonly mainContent: Locator;
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
  readonly phoneNumberLabel: Locator;
  readonly phoneNumberInput: Locator;
  //readonly phoneNumberErrorMessage: Locator;
  readonly ssnLabel: Locator;
  readonly ssnInput: Locator;
  readonly ssnErrorMessage: Locator;
  readonly usernameLabel: Locator;
  readonly usernameInput: Locator;
  readonly usernameErrorMessage: Locator;
  readonly passwordLabel: Locator;
  readonly passwordInput: Locator;
  readonly passwordErrorMessage: Locator;
  readonly passwordConfirmationLabel: Locator;
  readonly passwordConfirmationInput: Locator;
  readonly passwordConfirmationErrorMessage: Locator;
  readonly signupHeading: Locator;
  readonly signupSubTitle: Locator;
  readonly registerBtn: Locator;
  readonly userRegisteredHeading: Locator;
  readonly userRegisteredSubtitle: Locator;
  private readonly signUpFields: SignUpField[]
  private readonly PAGE_NAME = "register";
  readonly EXPECTED_PAGE_URL = new RegExp(getUrlPattern(this.PAGE_NAME));

  constructor(page: Page) {
    this.page = page;
    this.mainContent = page.locator("#rightPanel");
    this.signupHeading = page.getByRole("heading", { name: "Signing up is easy!" });
    this.signupSubTitle = page.getByText("If you have an account with");

    this.firstNameLabel = page.getByText("First Name:");
    this.firstNameInput = page.locator('[id="customer.firstName"]');
    this.firstNameErrorMessage = page.locator('[id="customer.firstName.errors"]');

    this.lastNameLabel = page.getByText("Last Name:");
    this.lastNameInput = page.locator('[id="customer.lastName"]');
    this.lastNameErrorMessage = page.locator('[id="customer.lastName.errors"]');

    this.addressLabel = page.getByText("Address:");
    this.addressInput = page.locator('[id="customer.address.street"]');
    this.addressErrorMessage = page.locator('[id="customer.address.street.errors"]');

    this.cityLabel = page.getByText("City:");
    this.cityInput = page.locator('[id="customer.address.city"]');
    this.cityErrorMessage = page.locator('[id="customer.address.city.errors"]');

    this.stateLabel = page.getByText("State:");
    this.stateInput = page.locator('[id="customer.address.state"]');
    this.stateErrorMessage = page.locator('[id="customer.address.state.errors"]');

    this.zipCodeLabel = page.getByText("Zip Code:");
    this.zipCodeInput = page.locator('[id="customer.address.zipCode"]');
    this.zipCodeErrorMessage = page.locator('[id="customer.address.zipCode.errors"]');

    this.phoneNumberLabel = page.getByText("Phone #:");
    this.phoneNumberInput = page.locator('[id="customer.phoneNumber"]');
    //TODO: phone number error message not present in sign up form
    //this.phoneNumberErrorMessage = page.getByText('Phone number name is required.');

    this.ssnLabel = page.getByText("SSN:");
    this.ssnInput = page.locator('[id="customer.ssn"]');
    this.ssnErrorMessage = page.locator('[id="customer.ssn.errors"]');

    this.usernameLabel = page.getByText("Username:");
    this.usernameInput = page.locator('[id="customer.username"]');
    this.usernameErrorMessage = page.locator('[id="customer.username.errors"]');

    this.passwordLabel = page.getByText("Password:");
    this.passwordInput = page.locator('[id="customer.password"]');
    this.passwordErrorMessage = page.locator('[id="customer.password.errors"]');

    this.passwordConfirmationLabel = page.getByText("Confirm:");
    this.passwordConfirmationInput = page.locator('[id="repeatedPassword"]');
    this.passwordConfirmationErrorMessage = page.locator('[id="repeatedPassword.errors"]');

    this.registerBtn = page.getByRole("button", { name: "Register" });
    this.userRegisteredHeading = page.locator("#rightPanel > h1");
    this.userRegisteredSubtitle = page.locator("#rightPanel > p");
    this.signUpFields = [
      {
        label: this.firstNameLabel,
        expectedLabel: "First Name:",
        input: this.firstNameInput,
        requiredError: this.firstNameErrorMessage,
        expectedRequiredError: signupValidatorErrors.firstNameRequired,
      },
      {
        label: this.lastNameLabel,
        expectedLabel: "Last Name:",
        input: this.lastNameInput,
        requiredError: this.lastNameErrorMessage,
        expectedRequiredError: signupValidatorErrors.lastNameRequired,
      },
      {
        label: this.addressLabel,
        expectedLabel: "Address:",
        input: this.addressInput,
        requiredError: this.addressErrorMessage,
        expectedRequiredError: signupValidatorErrors.addressRequired,
      },
      {
        label: this.cityLabel,
        expectedLabel: "City:",
        input: this.cityInput,
        requiredError: this.cityErrorMessage,
        expectedRequiredError: signupValidatorErrors.cityRequired,
      },
      {
        label: this.stateLabel,
        expectedLabel: "State:",
        input: this.stateInput,
        requiredError: this.stateErrorMessage,
        expectedRequiredError: signupValidatorErrors.stateRequired,
      },
      {
        label: this.zipCodeLabel,
        expectedLabel: "Zip Code:",
        input: this.zipCodeInput,
        requiredError: this.zipCodeErrorMessage,
        expectedRequiredError: signupValidatorErrors.zipCodeRequired,
      },
      {
        label: this.phoneNumberLabel,
        expectedLabel: "Phone #:",
        input: this.phoneNumberInput
      },
      {
        label: this.ssnLabel,
        expectedLabel: "SSN:",
        input: this.ssnInput,
        requiredError: this.ssnErrorMessage,
        expectedRequiredError: signupValidatorErrors.ssnRequired,
      },
      {
        label: this.usernameLabel,
        expectedLabel: "Username:",
        input: this.usernameInput,
        requiredError: this.usernameErrorMessage,
        expectedRequiredError: signupValidatorErrors.usernameRequired,
      },
      {
        label: this.passwordLabel,
        expectedLabel: "Password:",
        input: this.passwordInput,
        requiredError: this.passwordErrorMessage,
        expectedRequiredError: signupValidatorErrors.passwordRequired,
      },
      {
        label: this.passwordConfirmationLabel,
        expectedLabel: "Confirm:",
        input: this.passwordConfirmationInput,
        requiredError: this.passwordConfirmationErrorMessage,
        expectedRequiredError: signupValidatorErrors.passwordConfirmationRequired,
      },
    ];
  }

  nagivate = async (): Promise<void> => {
    const currentUrl = `${BASE_URL}/${this.PAGE_NAME}.htm`;
    Logger.debug(`Navigating to url: ${currentUrl}`);
    await this.page.goto(currentUrl);
  };

  FillSignUpForm = async (userData: UserRegistration): Promise<void> => {
    Logger.debug(`Filling signup form for username: ${userData.username}`);
    await this.firstNameInput.fill(userData.firstName);
    await this.lastNameInput.fill(userData.lastName);
    await this.addressInput.fill(userData.address);
    await this.cityInput.fill(userData.city);
    await this.stateInput.fill(userData.state);
    await this.zipCodeInput.fill(userData.zipCode);
    await this.phoneNumberInput.fill(userData.phoneNumber);
    await this.ssnInput.fill(userData.ssn);
    await this.usernameInput.fill(userData.username);
    await this.passwordInput.fill(userData.password);
    await this.passwordConfirmationInput.fill(userData.passwordConfirmation);
  };

  submitSignUpForm = async (userData?: UserRegistration): Promise<void> => {
    Logger.debug(`Submitting signup form for username: ${userData?.username || "N/A"}`);
    await this.registerBtn.click();
  };

  registerUser = async (userData: UserRegistration): Promise<void> => {
    await this.nagivate();
    await this.FillSignUpForm(userData);
    await this.submitSignUpForm(userData);
  };

  getSignUpFields = () => [
      {
        label: this.firstNameLabel,
        expectedLabel: "First Name:",
        input: this.firstNameInput,
        requiredError: this.firstNameErrorMessage,
        expectedRequiredError: signupValidatorErrors.firstNameRequired,
      },
      {
        label: this.lastNameLabel,
        expectedLabel: "Last Name:",
        input: this.lastNameInput,
        requiredError: this.lastNameErrorMessage,
        expectedRequiredError: signupValidatorErrors.lastNameRequired,
      },
      {
        label: this.addressLabel,
        expectedLabel: "Address:",
        input: this.addressInput,
        requiredError: this.addressErrorMessage,
        expectedRequiredError: signupValidatorErrors.addressRequired,
      },
      {
        label: this.cityLabel,
        expectedLabel: "City:",
        input: this.cityInput,
        requiredError: this.cityErrorMessage,
        expectedRequiredError: signupValidatorErrors.cityRequired,
      },
      {
        label: this.stateLabel,
        expectedLabel: "State:",
        input: this.stateInput,
        requiredError: this.stateErrorMessage,
        expectedRequiredError: signupValidatorErrors.stateRequired,
      },
      {
        label: this.zipCodeLabel,
        expectedLabel: "Zip Code:",
        input: this.zipCodeInput,
        requiredError: this.zipCodeErrorMessage,
        expectedRequiredError: signupValidatorErrors.zipCodeRequired,
      },
      {
        label: this.phoneNumberLabel,
        expectedLabel: "Phone #:",
        input: this.phoneNumberInput
      },
      {
        label: this.ssnLabel,
        expectedLabel: "SSN:",
        input: this.ssnInput,
        requiredError: this.ssnErrorMessage,
        expectedRequiredError: signupValidatorErrors.ssnRequired,
      },
      {
        label: this.usernameLabel,
        expectedLabel: "Username:",
        input: this.usernameInput,
        requiredError: this.usernameErrorMessage,
        expectedRequiredError: signupValidatorErrors.usernameRequired,
      },
      {
        label: this.passwordLabel,
        expectedLabel: "Password:",
        input: this.passwordInput,
        requiredError: this.passwordErrorMessage,
        expectedRequiredError: signupValidatorErrors.passwordRequired,
      },
      {
        label: this.passwordConfirmationLabel,
        expectedLabel: "Confirm:",
        input: this.passwordConfirmationInput,
        requiredError: this.passwordConfirmationErrorMessage,
        expectedRequiredError: signupValidatorErrors.passwordConfirmationRequired,
      },
    ];
}
