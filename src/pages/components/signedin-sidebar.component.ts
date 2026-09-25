import { Page, Locator } from "@playwright/test";
import { BASE_URL } from "@constants/base.constant";
import { getUrlPattern } from "@utils/get-url-pattern";

export class SignedInSideBarComponent {
  private readonly page: Page;
  readonly welcomeText: Locator;
  readonly accountServicesHeading: Locator;
  readonly openNewAccountLink: Locator;
  readonly accountOverviewLink: Locator;
  readonly transferFundsLink: Locator;
  readonly billPayLink: Locator;
  readonly findTransactionsLink: Locator;
  readonly updateContactInfoLink: Locator;
  readonly requestLoanLink: Locator;
  readonly logOutLink: Locator;
  readonly accountServicesLinks: Locator[];
  private readonly PAGE_NAME = "overview";
  readonly EXPECTED_PAGE_URL = new RegExp(getUrlPattern(this.PAGE_NAME));

  constructor(page: Page) {
    this.page = page;
    this.welcomeText = this.page.locator("#leftPanel > p");
    this.accountServicesHeading = this.page.locator("#leftPanel h2");
    this.openNewAccountLink = this.page.getByRole("link", { name: "Open New Account" });
    this.accountOverviewLink = this.page.getByRole("link", { name: "Accounts Overview" });
    this.transferFundsLink = this.page.getByRole("link", { name: "Transfer Funds" });
    this.billPayLink = this.page.getByRole("link", { name: "Bill Pay" });
    this.findTransactionsLink = this.page.getByRole("link", { name: "Find Transactions" });
    this.updateContactInfoLink = this.page.getByRole("link", { name: "Update Contact Info" });
    this.requestLoanLink = this.page.getByRole("link", { name: "Request Loan" });
    this.logOutLink = this.page.getByRole("link", { name: "Log Out" });
    this.accountServicesLinks = [
      this.openNewAccountLink,
      this.accountOverviewLink,
      this.transferFundsLink,
      this.billPayLink,
      this.findTransactionsLink,
      this.updateContactInfoLink,
      this.requestLoanLink,
      this.logOutLink,
    ];
  }

  navigate = async (): Promise<void> => {
    await this.page.goto(`${BASE_URL}/${this.PAGE_NAME}.htm`);
  };

  logOut = async (waitForUrl?: string | RegExp): Promise<void> => {
    if (waitForUrl) {
    await Promise.all([
        this.page.waitForURL(waitForUrl, { waitUntil: "domcontentloaded" }), 
        this.logOutLink.click()]);
    }
    else {
        await this.logOutLink.click();
    }
  };

  getAccountServicesLinkUrls = () => {
    return [
      { locator: this.openNewAccountLink, expectedHref: "/parabank/openaccount.htm" },
      { locator: this.accountOverviewLink, expectedHref: "/parabank/overview.htm" },
      { locator: this.transferFundsLink, expectedHref: "/parabank/transfer.htm" },
      { locator: this.billPayLink, expectedHref: "/parabank/billpay.htm" },
      { locator: this.findTransactionsLink, expectedHref: "/parabank/findtrans.htm" },
      { locator: this.updateContactInfoLink, expectedHref: "/parabank/updateprofile.htm" },
      { locator: this.requestLoanLink, expectedHref: "/parabank/requestloan.htm" },
      { locator: this.logOutLink, expectedHref: "/parabank/logout.htm" },
    ];
  };
}
