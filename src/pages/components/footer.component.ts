import { Page, Locator } from "@playwright/test";
import { getUrlPattern } from "src/utils/getUrlPattern";
import { HyperLink } from "src/@types/hyperlink";
import { BASE_URL } from "src/constants/base.constant";

export class FooterComponent {
    readonly page: Page;
    readonly copyright: Locator;
    readonly visitLabel: Locator;
    readonly footerLinks: HyperLink[];
    private readonly PAGE_NAME = "index"
    readonly EXPECTED_PAGE_URL = new RegExp(getUrlPattern(this.PAGE_NAME));
    constructor(page: Page) {
        this.page = page;
        this.copyright = this.page.locator("#footerPanel").getByText("© Parasoft. All rights reserved.");
        this.visitLabel = this.page.locator("#footerPanel > ul").getByText("Visit us at:");
        this.footerLinks = [
            { locator: this.page.locator("#footerPanel").getByRole("link", { name: "Home" }), 
              expectedLabel: "Home", 
              expectedHref: "index.htm",
              expectedRedirectUrl: new RegExp(getUrlPattern("index")),
              expectedElements: [{
                locator: this.page.locator("#rightPanel li").getByText("ATM Services")
              }]
            },
            { locator: this.page.locator("#footerPanel").getByRole("link", { name: "About Us", exact: true }), 
              expectedLabel: "About Us", 
              expectedHref: "about.htm",
              expectedRedirectUrl: new RegExp(getUrlPattern("about")),
              expectedElements: [{
                locator: this.page.getByRole("heading", { name: "ParaSoft Demo Website", exact: true })
              }]
            },
            { locator: this.page.locator("#footerPanel").getByRole("link", { name: "Services", exact: true }), 
              expectedLabel: "Services", 
              expectedHref: "services.htm",
              expectedRedirectUrl: new RegExp(getUrlPattern("services")),
              expectedElements: [{
                locator: this.page.locator("#rightPanel > span").first(),
                expectedText: "Available Bookstore SOAP services:"
               }]
            },
            { locator: this.page.locator("#footerPanel").getByRole("link", { name: "Products", exact: true }), 
              expectedLabel: "Products",
              expectedHref: "http://www.parasoft.com/jsp/products.jsp",
              expectedRedirectUrl: "https://www.parasoft.com/products/",
              isExternal: true,
            },
            { locator: this.page.locator("#footerPanel").getByRole("link", { name: "Locations", exact: true }),
              expectedLabel: "Locations",
              expectedHref: "http://www.parasoft.com/jsp/pr/contacts.jsp",
              expectedRedirectUrl: "https://www.parasoft.com/solutions/",
              isExternal: true
            },
            { locator: this.page.locator("#footerPanel").getByRole("link", { name: "Site Map", exact: true }),
              expectedLabel: "Site Map",
              expectedHref: "sitemap.htm",
              expectedRedirectUrl: new RegExp(getUrlPattern("sitemap")),
              expectedElements: [{
                locator: this.page.locator("#rightPanel > ul.leftmenu").getByText("Solutions")
              }]
            },
            { locator: this.page.locator("#footerPanel").getByRole("link", { name: "Contact Us", exact: true }), 
              expectedLabel: "Contact Us", 
              expectedHref: "contact.htm",
              expectedRedirectUrl: new RegExp(getUrlPattern("contact")),
              expectedElements: [{
                locator: this.page.getByRole("heading", { name: "Customer Care", exact: true  })
              }]
            }
        ]
    }

    navigate = async(): Promise<void> => {
        await this.page.goto(`${BASE_URL}/${this.PAGE_NAME}.htm`)
    }

}