import { Page, test as base, expect } from '@playwright/test'
import { TEST_USER_CREDENTIALS } from 'src/test-data/login.data';
import { LogInSideBarComponent } from 'src/pages/components/login-sidebar.component';
import { LoggedInSideBarComponent } from 'src/pages/components/loggedin-sidebar.component';
import { AccountsOverviewPage } from 'src/pages/accounts-overview.page';

export const authTest = base.extend<{ authPage: Page }>({
    authPage: async({ page }, use) => {
        const currentUser = TEST_USER_CREDENTIALS.valid.find(u => u.role === "member");
        if(currentUser === null && currentUser){
            throw new Error(`[Auth error]: credentials not found`);
        }

        if(!currentUser?.username || !currentUser?.password){
            throw new Error(`[Auth error]: credentials not found`);
        }

        const loginPage = new LogInSideBarComponent(page);
        await loginPage.navigate();
        await loginPage.submitLogin(currentUser.username, currentUser.password);

        const loggedInComponent = new LoggedInSideBarComponent(page);
        //TODO: validate firstname and lastname of the current user in the left panel
        await expect(loggedInComponent.welcomeText).toBeVisible();

        const accountsOverview = new AccountsOverviewPage(page);
        await expect(page).toHaveURL(accountsOverview.EXPECTED_PAGE_URL);
        await use(page);
    }
})