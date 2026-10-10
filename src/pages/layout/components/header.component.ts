import { Locator, Page } from "@playwright/test";
import { HyperLink } from "@@types/hyperlink";
import { BASE_URL } from "@constants/base.constant";
import { getUrlPattern } from "@utils/get-url-pattern";

export class HeaderComponent {
  readonly page: Page;
  readonly logoCaption: Locator;
  readonly logoLinks: HyperLink[];
  readonly leftMenuLinks: HyperLink[];
  readonly rightMenuLinks: HyperLink[];
  private readonly PAGE_NAME = "index";
  readonly EXPECTED_PAGE_URL = new RegExp(getUrlPattern(this.PAGE_NAME));
  constructor(page: Page) {
    this.page = page;
    this.logoCaption = this.page.getByText("Experience the difference");
    this.logoLinks = [
      {
        locator: this.page.locator("#topPanel > a[href='admin.htm']"),
        expectedHref: "admin.htm",
        expectedRedirectUrl: new RegExp(getUrlPattern("admin")),
        expectedVisible: false,
        expectedElements: [
          {
            locator: this.page.locator("#rightPanel").getByRole("heading", { name: "Administration", level: 1 }),
          },
        ],
        isUseDispatch: true
      },
      {
        locator: this.page.locator("#topPanel > a[href='index.htm']"),
        expectedHref: "index.htm",
        expectedRedirectUrl: new RegExp(getUrlPattern("index")),
        expectedVisible: false,
        expectedElements: [
          {
            locator: this.page.locator("#rightPanel li").getByText("ATM Services"),
          },
        ],
        isUseDispatch: true
      },
    ];

    this.leftMenuLinks = [
      //{ locator: this.page.getByText('Solutions'), expectedLabel: "Solutions", expectedHref: "https://www.parasoft.com/solutions/" },
      {
        locator: this.page.locator("#headerPanel").getByRole("link", { name: "About Us" }),
        expectedLabel: "About Us",
        expectedHref: "about.htm",
        expectedRedirectUrl: new RegExp(getUrlPattern("about")),
        expectedVisible: true,
        expectedElements: [
          {
            locator: this.page.locator("#rightPanel").getByRole("heading", { name: "ParaSoft Demo Website", level: 1 }),
          },
        ],
      },
      {
        locator: this.page.locator("#headerPanel").getByRole("link", { name: "Services" }),
        expectedLabel: "Services",
        expectedHref: "services.htm",
        expectedRedirectUrl: new RegExp(getUrlPattern("services")),
        expectedVisible: true,
        expectedElements: [
          {
            locator: this.page.locator("#rightPanel > span").first(),
            expectedText: "Available Bookstore SOAP services:",
          },
        ],
      },
      {
        locator: this.page.locator("#headerPanel").getByRole("link", { name: "Products" }),
        expectedLabel: "Products",
        expectedHref: "http://www.parasoft.com/jsp/products.jsp",
        expectedRedirectUrl: "https://www.parasoft.com/products/",
        expectedVisible: true,
        isExternal: true,
      },
      {
        locator: this.page.locator("#headerPanel").getByRole("link", { name: "Locations" }),
        expectedLabel: "Locations",
        expectedHref: "http://www.parasoft.com/jsp/pr/contacts.jsp",
        expectedRedirectUrl: "https://www.parasoft.com/solutions/",
        expectedVisible: true,
        isExternal: true,
      },
      {
        locator: this.page.locator("#headerPanel").getByRole("link", { name: "Admin Page" }),
        expectedLabel: "Admin Page",
        expectedHref: "admin.htm",
        expectedRedirectUrl: new RegExp(getUrlPattern("admin")),
        expectedVisible: true,
        expectedElements: [
          {
            locator: this.page.locator("#rightPanel").getByRole("heading", { name: "Administration", level: 1 }),
          },
        ],
      },
    ];
    this.rightMenuLinks = [
      {
        locator: this.page.locator("#headerPanel").getByRole("link", { name: "home", exact: true }),
        expectedLabel: "home",
        expectedHref: "index.htm",
        expectedRedirectUrl: new RegExp(getUrlPattern("index")),
        expectedVisible: true,
        expectedElements: [
          {
            locator: this.page.locator("#rightPanel li").getByText("ATM Services"),
          },
        ],
      },
      {
        locator: this.page.locator("#headerPanel").getByRole("link", { name: "about", exact: true }),
        expectedLabel: "about",
        expectedHref: "about.htm",
        expectedRedirectUrl: new RegExp(getUrlPattern("about")),
        expectedVisible: true,
        expectedElements: [
          {
            locator: this.page.getByRole("heading", { name: "ParaSoft Demo Website" }),
          },
        ],
      },
      {
        locator: this.page.locator("#headerPanel").getByRole("link", { name: "contact", exact: true }),
        expectedLabel: "contact",
        expectedHref: "contact.htm",
        expectedRedirectUrl: new RegExp(getUrlPattern("contact")),
        expectedVisible: true,
        expectedElements: [
          {
            locator: this.page.getByRole("heading", { name: "Customer Care", level: 1 }),
          },
        ],
      },
    ];
  }

  navigate = async (): Promise<void> => {
    await this.page.goto(`${BASE_URL}/${this.PAGE_NAME}.htm`);
  };
}
