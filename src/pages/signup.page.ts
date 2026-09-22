import { Locator, Page } from '@playwright/test';
import { getUrlPattern } from '@utils/get-url-pattern';
import { BASE_URL } from '@constants/base.constant';
import { Logger } from '@utils/logger';
import type { UserRegistration } from '@@types/user';

export class SignUpPage {

    private readonly page: Page;
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
    private readonly PAGE_NAME = "register";
    readonly EXPECTED_PAGE_URL = new RegExp(getUrlPattern(this.PAGE_NAME));
    readonly EXPECTED_USER_REGISTERED_SUBTITLE = "Your account was created successfully. You are now logged in.";

    constructor(page: Page){
        this.page = page;
        this.signupHeading = page.getByRole('heading', { name: 'Signing up is easy!' });
        this.signupSubTitle = page.getByText('If you have an account with');
        this.firstNameLabel = page.getByText('First Name:');
        this.firstNameInput = page.locator('[id="customer.firstName"]');
        this.firstNameErrorMessage = page.getByText('First name is required.');
        this.lastNameLabel = page.getByText('Last Name:');
        this.lastNameInput = page.locator('[id="customer.lastName"]');
        this.lastNameErrorMessage = page.getByText('Last name is required.');
        this.addressLabel = page.getByText('Address:');
        this.addressInput = page.locator('[id="customer.address.street"]');
        this.addressErrorMessage = page.getByText('Address is required.');
        this.cityLabel = page.getByText('City:');
        this.cityInput = page.locator('[id="customer.address.city"]');
        this.cityErrorMessage = page.getByText('City is required.');
        this.stateLabel = page.getByText('State:');
        this.stateInput = page.locator('[id="customer.address.state"]');
        this.stateErrorMessage = page.getByText('State name is required.');
        this.zipCodeLabel = page.getByText('Zip Code:');
        this.zipCodeInput = page.locator('[id="customer.address.zipCode"]');
        this.zipCodeErrorMessage = page.getByText('Zip Code is required.');
        this.phoneNumberLabel = page.getByText('Phone #:');
        this.phoneNumberInput = page.locator('[id="customer.phoneNumber"]');
        //this.phoneNumberErrorMessage = page.getByText('Phone number name is required.');
        this.ssnLabel = page.getByText('SSN:');
        this.ssnInput = page.locator('[id="customer.ssn"]');
        this.ssnErrorMessage = page.getByText('Social Security Number is required.');
        this.usernameLabel = page.getByText('Username:');
        this.usernameInput = page.locator('[id="customer.username"]');
        this.usernameErrorMessage = page.getByText('Username is required.');
        this.passwordLabel = page.getByText('Password:');
        this.passwordInput = page.locator('[id="customer.password"]');
        this.passwordErrorMessage = page.getByText('Password is required.');
        this.passwordConfirmationLabel = page.getByText('Confirm:');
        this.passwordConfirmationInput = page.locator('#repeatedPassword');
        this.passwordConfirmationErrorMessage = page.getByText('Password confirmation is required.');
        this.registerBtn = page.getByRole('button', { name: 'Register' });
        this.userRegisteredHeading = this.page.locator("#rightPanel > h1");
        this.userRegisteredSubtitle = this.page.locator("#rightPanel > p");
    }

    nagivate = async () => {
        await this.page.goto(`${BASE_URL}/${this.PAGE_NAME}.htm`);
    }

    submitSignUp = async (userData: UserRegistration) => {
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
        Logger.debug(`Submitting signup form for username: ${userData.username}`);
        await this.registerBtn.click();
    }

    expectedUserRegisteredHeading = (username: string) => `Welcome ${username}`;
    
}