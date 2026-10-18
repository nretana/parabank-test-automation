import { Page, Locator } from "@playwright/test";
import { getUrlPattern } from "@utils/get-url-pattern";
import type { HyperLink } from "@@types/hyperlink";

export class ServicesMenuComponent {
  private readonly page: Page;
  private readonly servicesMenu: Locator;
  private readonly onlineServicesMenu: Locator;
  readonly atmTitle: Locator;
  readonly onlineServicesTitle: Locator;
  readonly serviceLinks: HyperLink[];
  readonly onlineServiceLinks: HyperLink[];
  private readonly EXPECTED_SERVICE_HREF = "services/ParaBank?wsdl";
  private readonly EXPECTED_SERVICE_URL = new RegExp(String.raw`services/ParaBank\?wsdl$`);
  private readonly EXPECTED_ONLINE_SERVICE_HREF = "services/bank?_wadl&_type=xml";
  private readonly EXPECTED_ONLINE_SERVICE_URL = new RegExp(String.raw`services/bank\?_wadl\&_type=xml$`);

  constructor(page: Page) {
    this.page = page;
    this.servicesMenu = this.page.locator("#rightPanel ul.services");
    this.onlineServicesMenu = this.page.locator("#rightPanel ul.servicestwo");
    this.atmTitle = this.servicesMenu.locator("> li").nth(0);
    this.onlineServicesTitle = this.onlineServicesMenu.locator("> li").nth(0);
    this.serviceLinks = [
      {
        locator: this.servicesMenu.locator("a").nth(0),
        expectedLabel: "Withdraw Funds",
        expectedHref: this.EXPECTED_SERVICE_HREF,
        expectedRedirectUrl: this.EXPECTED_SERVICE_URL,
        expectedVisible: true,
      },
      {
        locator: this.servicesMenu.locator("a").nth(1),
        expectedLabel: "Transfer Funds",
        expectedHref: this.EXPECTED_SERVICE_HREF,
        expectedRedirectUrl: this.EXPECTED_SERVICE_URL,
        expectedVisible: true,
      },
      {
        locator: this.servicesMenu.locator("a").nth(2),
        expectedLabel: "Check Balances",
        expectedHref: this.EXPECTED_SERVICE_HREF,
        expectedRedirectUrl: this.EXPECTED_SERVICE_URL,
        expectedVisible: true,
      },
      {
        locator: this.page.locator("#rightPanel p.more > a").nth(0),
        expectedLabel: "Read More",
        expectedHref: "services.htm",
        expectedRedirectUrl: new RegExp(getUrlPattern("services")),
        expectedVisible: true,
      },
    ];

    this.onlineServiceLinks = [
      {
        locator: this.onlineServicesMenu.locator("a").nth(0),
        expectedLabel: "Bill Pay",
        expectedHref: this.EXPECTED_ONLINE_SERVICE_HREF,
        expectedRedirectUrl: this.EXPECTED_ONLINE_SERVICE_URL,
        expectedVisible: true,
      },
      {
        locator: this.onlineServicesMenu.locator("a").nth(1),
        expectedLabel: "Account History",
        expectedHref: this.EXPECTED_ONLINE_SERVICE_HREF,
        expectedRedirectUrl: this.EXPECTED_ONLINE_SERVICE_URL,
        expectedVisible: true,
      },
      {
        locator: this.onlineServicesMenu.locator("a").nth(2),
        expectedLabel: "Transfer Funds",
        expectedHref: this.EXPECTED_ONLINE_SERVICE_HREF,
        expectedRedirectUrl: this.EXPECTED_ONLINE_SERVICE_URL,
        expectedVisible: true,
      },
    ];
  }
}
