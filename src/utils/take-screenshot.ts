import type { Page } from "@playwright/test";

export const takeScreenshot = async (page: Page, name: string) => {
  const context = page.context().browser()?.browserType().name();
  await page.screenshot({ path: `${name}_${context}.png` });
};
