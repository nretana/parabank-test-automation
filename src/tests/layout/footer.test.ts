import { expect } from "@playwright/test";
import { test } from "@fixtures/merge.fixture";

test.describe("Footer Component", { tag: ["@regression"] }, () => {
  test.beforeEach(async ({ footer }) => {
    await test.step("Navigating to home page", async () => {
      await footer.navigate();
    });
  });

  test("TC-FOOTER-001: Validate footer links", { tag: ["@regression"] }, async ({ page, context, footer }) => {
    await test.step("Validating footer menu", async () => {
      for (const link of footer.footerLinks) {
        if (link.expectedVisible) {
          await expect.soft(link.locator).toBeVisible();
        }
        if (link.expectedLabel) {
          await expect.soft(link.locator).toHaveText(link.expectedLabel);
        }
        await expect.soft(link.locator).toHaveAttribute("href", link.expectedHref);
        if (link.isNewTab) {
          await expect.soft(link.locator).toHaveAttribute("target", "_blank");
          const [newPage] = await Promise.all([context.waitForEvent("page"), link.locator.click()]);
          await newPage.waitForLoadState();
          await expect.soft(newPage).toHaveURL(link.expectedRedirectUrl);
          await newPage.close();
        } else {
          await link.locator.click();
          await expect.soft(page).toHaveURL(link.expectedRedirectUrl);
          if (link.isExternal) {
            await page.goBack();
          }

          if (link.expectedElements) {
            for (const expectedElem of link.expectedElements) {
              await expect(expectedElem.locator).toBeVisible();
              if (expectedElem.expectedText) {
                await expect(expectedElem.locator).toHaveText(expectedElem.expectedText);
              }
            }
          }
        }
      }
    });
  });

  test("TC-FOOTER-002: Validate copyright in footer section", { tag: ["@regression"] }, async ({ page, context, footer }) => {
    await test.step("Validating copyright", async () => {
      await expect(footer.copyright).toBeVisible();
      await expect(footer.visitLabel).toBeVisible();
    });
  });
});
