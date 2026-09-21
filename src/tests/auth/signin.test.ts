import { expect } from '@playwright/test'
import { AccountsOverviewPage } from 'src/pages/accounts-overview.page'
import { SignedInSideBarComponent } from '@pages/components/signedin-sidebar.component';
import { SignInSideBarComponent } from '@pages/components/signin-sidebar.component';
import { test } from 'src/fixtures/merge.fixture';
import { TEST_USER_CREDENTIALS } from '@test-data/signin.data';


test("Successful login using valid credentials", { tag:["@smoke", "@regression"] },  async({ page }) => {
    const { username, password } = TEST_USER_CREDENTIALS.valid[0]
    const signInSideBarcomponent = new SignInSideBarComponent(page);
    await signInSideBarcomponent.navigate();
    await signInSideBarcomponent.submitLogin(username, password);

    const signedInSideBar = new SignedInSideBarComponent(page);
    await expect(signedInSideBar.welcomeText).toBeVisible();
    await expect(signedInSideBar.accountServicesHeading).toHaveText("Account Services");
    for (const link of signedInSideBar.accountServicesLinks){
        await expect.soft(link).toBeVisible();
    }
});

test("Unsuccessful login attempt with invalid username or password", { tag:["@regression"] }, async({ page }) => {
    const { username, password } = TEST_USER_CREDENTIALS.invalid[0]
    const signInSideBarcomponent = new SignInSideBarComponent(page);
    await signInSideBarcomponent.navigate();
    await signInSideBarcomponent.submitLogin(username, password);
    await expect(signInSideBarcomponent.errorHeading).toBeVisible();
    await expect(signInSideBarcomponent.errorMessage).toBeVisible();
    await expect(signInSideBarcomponent.errorMessage).toHaveText("The username and password could not be verified.");
    //await expect(signInSideBarcomponent.errorMessage).toHaveText("An internal error has occurred and has been logged.");
});

test("Unsuccessful login attempt with empty username or password", {tag:["@regression"] }, async({ page }) => {
    const signInSideBarcomponent = new SignInSideBarComponent(page);
    await signInSideBarcomponent.navigate();
    await signInSideBarcomponent.submitLogin("", "");
    await expect(signInSideBarcomponent.errorHeading).toBeVisible();
    await expect(signInSideBarcomponent.errorMessage).toBeVisible();
    await expect(signInSideBarcomponent.errorMessage).toHaveText("Please enter a username and password.");
});

test("Redirection attempt to secure pages without active session authentication", {tag:["@security", "@smoke", "@regression"] }, async({ page }) => {
    const overviewPage = new AccountsOverviewPage(page);
    await overviewPage.navigate();
    await expect(overviewPage.errorHeading).toBeVisible();
    await expect(overviewPage.errorMessage).toBeVisible();
    await expect(overviewPage.errorMessage).toHaveText("An internal error has occurred and has been logged.");
});

test("Successful user logout and invalidation of the active session", { tag:["@security", "@smoke", "@regression"] }, async({ page }) => {
    const { username, password } = TEST_USER_CREDENTIALS.valid[0]
    const signInSideBarcomponent = new SignInSideBarComponent(page);
    await signInSideBarcomponent.navigate();
    await signInSideBarcomponent.submitLogin(username, password);

    const signedInSideBar = new SignedInSideBarComponent(page);
    await signedInSideBar.logOut();
    await expect(page).toHaveURL(signInSideBarcomponent.EXPECTED_PAGE_URL);
    for (const elem of signInSideBarcomponent.loginSideBarElements){
        await expect.soft(elem).toBeVisible();
    }
});

test("Pre-login sidebar displays all required labels, inputs, and links", { tag:["@regression"] }, async({ page }) => {
    const signInSideBarcomponent = new SignInSideBarComponent(page);
    await signInSideBarcomponent.navigate();
    for (const elem of signInSideBarcomponent.loginSideBarElements){
        await expect.soft(elem).toBeVisible();
    }
});