import { test as base } from '@playwright/test'

export const sessionTest = base.extend({
    page: async({ page, context }, use) => {
        await context.addCookies([
        {
            name: 'JSESSIONID',
            value: 'ESTABLISHED_SESSION',
            domain: 'parabank.parasoft.com',
            path: '/',
        }
    ]);
    await use(page);
    }
 }) 
