import { FooterComponent } from '@pages/components/footer.component';
import { test as base } from '@playwright/test';

export const footerTest = base.extend<{ footer: FooterComponent }>({
    footer: async({ page }, use) => {
        await use(new FooterComponent(page));
    }
});