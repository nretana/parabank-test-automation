import { Page, test as base, expect } from '@playwright/test'
import { TEST_USER_CREDENTIALS } from '@test-data/signin.data';
import { SignInSideBarComponent } from '@pages/components/signin-sidebar.component';
import { SignedInSideBarComponent } from '@pages/components/signedin-sidebar.component';
import { AccountsOverviewPage } from '@pages/accounts-overview.page';

export const authTest = base.extend<{ authPage: Page }>({
    authPage: async({ page }, use) => {
        const currentUser = (TEST_USER_CREDENTIALS.valid).find(u => u.role === "member");
        if(currentUser === null && currentUser){
            throw new Error(`[Auth error]: credentials not found`);
        }

        if(!currentUser?.username || !currentUser?.password){
            throw new Error(`[Auth error]: credentials not found`);
        }

        const signinPage = new SignInSideBarComponent(page);
        await signinPage.navigate();
        await signinPage.submitLogin(currentUser.username, currentUser.password);

        const signedInComponent = new SignedInSideBarComponent(page);
        //TODO: validate firstname and lastname of the current user in the left panel
        await expect(signedInComponent.welcomeText).toBeVisible();

        const accountsOverview = new AccountsOverviewPage(page);
        await expect(page).toHaveURL(accountsOverview.EXPECTED_PAGE_URL);
        await use(page);
    }
})