import { Page, test as base, expect } from '@playwright/test'
import { userCredentials, signedinConfirmation } from '@test-data/signin.data';
import { SignInSideBarComponent } from '@pages/components/signin-sidebar.component';
import { SignedInSideBarComponent } from '@pages/components/signedin-sidebar.component';
import { AccountsOverviewPage } from '@pages/accounts/accounts-overview.page';
import { SignUpPage } from '@pages/signup.page';
import { userRegistration } from '@test-data/signup.data';
import { UserRegistration } from '@@types/user';

interface AuthFixtures {
    registeredUser: UserRegistration,
    signedInPage: { page: Page, registeredUser: UserRegistration }
}

export const authTest = base.extend<AuthFixtures>({
    registeredUser: async({ browser }, use) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        const signupPage = new SignUpPage(page);
        const newUser = userRegistration.getValidUser();
        await signupPage.navigate();
        await signupPage.registerUser(newUser);
        await context.close();
        await use(newUser);
    },
    signedInPage: async({ page, registeredUser }, use) => {
        const signinPage = new SignInSideBarComponent(page);
        await signinPage.navigate();
        await signinPage.submitLogin(registeredUser.username, registeredUser.password);

        const signedInComponent = new SignedInSideBarComponent(page);
        await expect(signedInComponent.welcomeText).toBeVisible();
        await expect(signedInComponent.welcomeText).toHaveText(signedinConfirmation.greetingMessage(registeredUser.firstName, registeredUser.lastName));
        const accountsOverview = new AccountsOverviewPage(page);
        await expect(page).toHaveURL(accountsOverview.EXPECTED_PAGE_URL);
        await use({ page, registeredUser });
    }
})