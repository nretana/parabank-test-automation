import { test as base } from '@playwright/test'


export const sessionTest = base.extend({
    page: async({ page, context }, use) => {
        await context.addCookies([
        {
            name: 'JSESSIONID',
            value: 'ESTABLISHED_SESSION',
            domain: process.env.COOKIE_DOMAIN,
            path: process.env.COOKIE_PATH,
        }
    ]);
    await use(page);
    }
 }) 
