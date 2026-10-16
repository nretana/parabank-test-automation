import { HyperLink } from "@@types/hyperlink";
import { test } from "@fixtures/merge.fixture";
import { HomePage } from "@pages/layout/home.page";
import { expect, Page } from "@playwright/test";
import { NewsMenuComponent } from '@pages/layout/components/news-menu.component';
import { ServicesMenuComponent } from '@pages/layout/components/services-menu.component';

const verifyLinks = async (page: Page, links: HyperLink[]) => {
  for (const link of links) {
    await expect.soft(link.locator).toBeVisible();
    await expect.soft(link.locator).toHaveAttribute("href", link.expectedHref);
    if (link.expectedLabel) await expect.soft(link.locator).toHaveText(link.expectedLabel);
    await link.locator.click();
    await page.waitForURL(link.expectedRedirectUrl, { waitUntil: "domcontentloaded" });
    await expect.soft(page).toHaveURL(link.expectedRedirectUrl);
    if(link.expectedElements && link.expectedElements?.length > 0) {
      for (const elem of link.expectedElements){
        await expect.soft(elem.locator).toBeVisible();
        if(elem.expectedText) await expect.soft(elem.locator).toHaveText(elem.expectedText)
      }
    }
    await page.goBack({ waitUntil: "domcontentloaded" });
  }
};

test("TC-HOME-001: Validate service links in home page", { tag: ["@regression"] }, async ({ page }) => {
  const homePage = new HomePage(page);
  const serviceMenuCom = new ServicesMenuComponent(page);

  await test.step("Navigating to home page", async () => {
    await homePage.navigate();
  });

  await test.step("Validating service links in home page", async () => {
    await expect(serviceMenuCom.atmTitle).toHaveText("ATM Services");
    await verifyLinks(page, serviceMenuCom.serviceLinks);
  });
});

test("TC-HOME-002: Validate online service links in home page", { tag: ["@regression"] }, async ({ page }) => {
  const homePage = new HomePage(page);
  const serviceMenuCom = new ServicesMenuComponent(page);

  await test.step("Navigating to home page", async () => {
    await homePage.navigate();
  });

  await test.step("Validating online service links in home page", async () => {
    await expect(serviceMenuCom.onlineServicesTitle).toHaveText("Online Services");
    await verifyLinks(page, serviceMenuCom.onlineServiceLinks);
  });
});

test("TC-HOME-003: Validate latest news links in home page", { tag: ["@regression"] }, async ({ page }) => {
  const homePage = new HomePage(page);
  const newsMenuCom = new NewsMenuComponent(page);

  await test.step("Navigating to home page", async () => {
    await homePage.navigate();
  });

  await test.step("Validating event links in home page", async () => {
    await expect(newsMenuCom.dateTitle).toHaveText(new Date().toLocaleDateString("en-US", { timeZone: "UTC" }));
    await verifyLinks(page, newsMenuCom.eventLinks);
  });
});
