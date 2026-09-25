import { expect, Page } from "@playwright/test";
import { test } from "@fixtures/merge.fixture";
import { HyperLink } from "@@types/hyperlink";

const verifyHeaderLinks = async (page: Page, headerLinks: HyperLink[]) => {
  for (const link of headerLinks) {
    if (link.expectedVisible) {
      await expect.soft(link.locator).toBeVisible();
    }
    if (link.expectedLabel) {
      await expect.soft(link.locator).toHaveText(link.expectedLabel);
    }
    await expect.soft(link.locator).toHaveAttribute("href", link.expectedHref);

    if (link.isUseDispatch) {
      await link.locator.dispatchEvent("click");
    } else {
      await link.locator.click();
    }
    await page.waitForURL(link.expectedRedirectUrl, { waitUntil: 'domcontentloaded' });
    await expect.soft(page).toHaveURL(link.expectedRedirectUrl);
    if (link.isExternal) {
      await page.goBack({ waitUntil: 'domcontentloaded' });
    }
    if (link.expectedElements) {
      for (const expectedElem of link.expectedElements) {
        await expect.soft(expectedElem.locator).toBeVisible();
        if (expectedElem.expectedText) {
          await expect.soft(expectedElem.locator).toHaveText(expectedElem.expectedText);
        }
      }
    }
  }
};

test.describe("Header Component", { tag: ["@regression"] }, () => {
  test.beforeEach(async ({ header }) => {
    await test.step("Navigating to home page", async() => {
      await header.navigate();
    });
  });

  test("Header renders logo links and logo caption", async ({ page, header }) => {
    await test.step("verifying logo links", async() => {
      await expect(header.logoCaption).toBeVisible();
      await verifyHeaderLinks(page, header.logoLinks);
    });
  });

  test("Left navigation menu renders all links", async ({ page, header }) => {
    await test.step("verifying links from left navigation menu", async() => {
      await verifyHeaderLinks(page, header.leftMenuLinks);
    });
  });

  test("Right navigation menu renders all links", async ({ page, header }) => {
    await test.step("verifying links from right navigation menu", async() => {
      await verifyHeaderLinks(page, header.rightMenuLinks);
    });
  });
});
