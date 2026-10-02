import { Page, test as base, expect } from '@playwright/test'
import { userCredentials, signedinConfirmation } from '@test-data/signin.data';
import { SignInSideBarComponent } from '@pages/components/signin-sidebar.component';
import { SignedInSideBarComponent } from '@pages/components/signedin-sidebar.component';
import { AccountsOverviewPage } from '@pages/accounts-overview.page';

export const authTest = base.extend<{ authPage: Page }>({
    authPage: async({ page }, use) => {
        const currentUser = (userCredentials.valid).find(u => u.role === "member");
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
        await expect(signedInComponent.welcomeText).toBeVisible();
        await expect(signedInComponent.welcomeText).toHaveText(signedinConfirmation.greetingMessage(currentUser.firstName, currentUser.lastName));
        const accountsOverview = new AccountsOverviewPage(page);
        await expect(page).toHaveURL(accountsOverview.EXPECTED_PAGE_URL);
        await use(page);
    }
})