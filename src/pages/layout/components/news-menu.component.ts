import { Page, Locator } from "@playwright/test";
import { getUrlPattern } from "@utils/get-url-pattern";
import type { HyperLink } from "@@types/hyperlink";

export class NewsMenuComponent {
  private readonly page: Page;
  private readonly eventsMenu: Locator;
  readonly latestNewsHeading: Locator;
  readonly dateTitle: Locator;
  readonly eventLinks: HyperLink[];
  readonly newsHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.latestNewsHeading = this.page.locator("#rightPanel ");
    this.eventsMenu = this.page.locator("#rightPanel ul.events");
    this.dateTitle = this.eventsMenu.locator("li").nth(0);
    this.newsHeading = this.page.locator("#rightPanel").getByRole("heading", { name: "Parabank News" });
    this.eventLinks = [
      {
        locator: this.eventsMenu.locator("a").nth(0),
        expectedLabel: "ParaBank Is Now Re-Opened",
        expectedHref: "news.htm#6",
        expectedRedirectUrl: this.getExpectedNewsUrl(6),
        expectedVisible: true,
      },
      {
        locator: this.eventsMenu.locator("a").nth(1),
        expectedLabel: "New! Online Bill Pay",
        expectedHref: "news.htm#5",
        expectedRedirectUrl: this.getExpectedNewsUrl(5),
        expectedVisible: true,
        expectedElements: [{ locator: this.newsHeading }],
      },
      {
        locator: this.eventsMenu.locator("a").nth(2),
        expectedLabel: "New! Online Account Transfers",
        expectedHref: "news.htm#4",
        expectedRedirectUrl: this.getExpectedNewsUrl(4),
        expectedVisible: true,
        expectedElements: [{ locator: this.newsHeading }],
      },
      {
        locator: page.locator("#rightPanel p.more > a").nth(1),
        expectedLabel: "Read More",
        expectedHref: "news.htm",
        expectedRedirectUrl: new RegExp(getUrlPattern("news")),
        expectedVisible: true,
        expectedElements: [{ locator: this.newsHeading }],
      },
    ];
  }

  private getExpectedNewsUrl = (num: number) => new RegExp(String.raw`news\.htm\#${num}$`);
}
