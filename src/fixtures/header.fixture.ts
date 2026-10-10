import { test as base } from '@playwright/test';
import { HeaderComponent } from '@pages/layout/components/header.component';

export const headerTest = base.extend<{ header: HeaderComponent }>({
    header: async ({ page }, use) => {       
        await use(new HeaderComponent(page));
    }
});