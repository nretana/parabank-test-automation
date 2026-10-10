import { Locator, Page } from "@playwright/test";
import { BASE_URL } from "@constants/base.constant";
import { getUrlPattern } from "@utils/get-url-pattern";
import { Logger } from "@utils/logger";

export class OpenNewAccountPage {
  private readonly page: Page;
  private readonly PAGE_NAME = "openaccount";
  readonly openNewAccountHeading: Locator;
  readonly accountTypeText: Locator;
  readonly accountTypeSelector: Locator;

  readonly sourceAccountText: Locator;
  readonly sourceAccountSelector: Locator;
  
  readonly submitFormBtn: Locator;
  
  readonly openNewAccountConfirmationHeading: Locator;
  readonly openNewAccountConfirmationSubtitle: Locator;
  readonly openNewAccountConfirmationNumber: Locator;
  readonly openNewAccountConfirmationNumberLink: Locator;

  readonly openNewAccountErrorHeading: Locator;
  readonly openNewAccountErrorMessage: Locator;
  readonly EXPECTED_PAGE_URL = new RegExp(getUrlPattern(this.PAGE_NAME));

  constructor(page: Page) {
    this.page = page;
    this.openNewAccountHeading = page.getByRole("heading", { name: "Open New Account" });
    this.accountTypeText = page.locator("[id='openAccountForm'] p > b").nth(0);
    this.accountTypeSelector = page.locator("[id='type']");

    this.sourceAccountText = page.locator("[id='openAccountForm'] p > b").nth(1);
    this.sourceAccountSelector = page.locator("[id='fromAccountId']");

    this.submitFormBtn = page.getByRole("button", { name: "Open New Account" });
    this.openNewAccountConfirmationHeading = page.locator("[id='openAccountResult'] > h1");
    this.openNewAccountConfirmationSubtitle = page.locator("[id='openAccountResult'] > p").nth(0);
    this.openNewAccountConfirmationNumber = page.locator("[id='openAccountResult'] > p").nth(1);
    this. openNewAccountConfirmationNumberLink = page.locator("[id='newAccountId']");

    this.openNewAccountErrorHeading = this.page.getByRole("heading", { name: "Error!" });
    this.openNewAccountErrorMessage = this.page.locator("[id='openAccountError'] > p");
  }

  navigate = async (): Promise<void> => {
    const currentUrl = `${BASE_URL}/${this.PAGE_NAME}.htm`;
    Logger.debug(`Navigating to url: ${currentUrl}`);
    await this.page.goto(currentUrl);
  };

  FillOpenNewAccountForm = async (accountType: string): Promise<void> => {
    Logger.debug(`Filling open new account for account type: ${accountType}`);
    await this.accountTypeSelector.selectOption({ label: accountType });
    await this.sourceAccountSelector.selectOption({ index: 0 });
  };

  submitOpenNewAccountForm = async (accountType: string): Promise<void> => {
    Logger.debug(`Submitting open new account form for account type: ${accountType || "N/A"}`);
    await this.submitFormBtn.click();
  };

  openNewAccount = async (accounType: string): Promise<void> => {
    await this.navigate();
    await this.FillOpenNewAccountForm(accounType);
    await this.submitOpenNewAccountForm(accounType);
  };
}
