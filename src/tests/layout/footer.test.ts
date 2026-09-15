import { expect } from '@playwright/test';
import { test } from 'src/fixtures/merge.fixture';

test("Global navigation footer", async({ page, context, footer }) => {
     await footer.navigate();
        await expect(footer.copyright).toBeVisible();
        await expect(footer.visitLabel).toBeVisible();
        for (const link of footer.footerLinks){
            await expect.soft(link.locator).toBeVisible();
            if(link.expectedLabel){
                await expect.soft(link.locator).toHaveText(link.expectedLabel);
            }
            await expect.soft(link.locator).toHaveAttribute("href", link.expectedHref);
            if (link.isNewTab){
                await expect.soft(link.locator).toHaveAttribute("target", "_blank");
                 const [newPage] = await Promise.all([
                    context.waitForEvent('page'),
                    link.locator.click(),
                ]);
                await newPage.waitForLoadState();
                await expect.soft(newPage).toHaveURL(link.expectedRedirectUrl);
                await newPage.close();
            }
            else {
                await link.locator.click();
                await expect.soft(page).toHaveURL(link.expectedRedirectUrl);
                if (link.isExternal){
                    await page.goBack();
                }

                if(link.expectedElements){
                    for (const expectedElem of link.expectedElements){
                        await expect(expectedElem.locator).toBeVisible();
                        if (expectedElem.expectedText){ 
                            await expect(expectedElem.locator).toHaveText(expectedElem.expectedText);
                        }
                    }
                }
            }
        }
})