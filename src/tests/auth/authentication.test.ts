import { expect } from '@playwright/test'
import { AccountsOverviewPage } from 'src/pages/accounts-overview.page'
import { LoggedInSideBarComponent } from 'src/pages/components/loggedin-sidebar.component';
import { LogInSideBarComponent } from 'src/pages/components/login-sidebar.component';
import { test } from 'src/fixtures/merge.fixture';


test("Successful login using valid credentials", { tag:["@smoke", "@regression"] },  async({ page }) => {
    const loginSideBarcomponent = new LogInSideBarComponent(page);
    await loginSideBarcomponent.navigate();
    await loginSideBarcomponent.submitLogin('john', 'demo');

    const userSideBarComponent = new LoggedInSideBarComponent(page);
    await expect(userSideBarComponent.welcomeText).toBeVisible();
    await expect(userSideBarComponent.accountServicesHeading).toHaveText("Account Services");
    for (const link of userSideBarComponent.accountServicesLinks){
        await expect.soft(link).toBeVisible();
    }
});

test("Unsuccessful login attempt with invalid username or password", async({ page }) => {
    const loginSideBarcomponent = new LogInSideBarComponent(page);
    await loginSideBarcomponent.navigate();
    await loginSideBarcomponent.submitLogin('invalid_user_xyz', 'WrongPassword999!');
    await expect(loginSideBarcomponent.errorHeading).toBeVisible();
    await expect(loginSideBarcomponent.errorMessage).toBeVisible();
    await expect(loginSideBarcomponent.errorMessage).toHaveText("The username and password could not be verified.");
    //await expect(loginSideBarcomponent.errorMessage).toHaveText("An internal error has occurred and has been logged.");
});

test("Unsuccessful login attempt with empty username or password", async({ page }) => {
    const loginSideBarcomponent = new LogInSideBarComponent(page);
    await loginSideBarcomponent.navigate();
    await loginSideBarcomponent.submitLogin("", "");
    await expect(loginSideBarcomponent.errorHeading).toBeVisible();
    await expect(loginSideBarcomponent.errorMessage).toBeVisible();
    await expect(loginSideBarcomponent.errorMessage).toHaveText("Please enter a username and password.");
});

test("Redirection attempt to secure pages without active session authentication", async({ page }) => {
    const overviewPage = new AccountsOverviewPage(page);
    await overviewPage.navigate();
    await expect(overviewPage.errorHeading).toBeVisible();
    await expect(overviewPage.errorMessage).toBeVisible();
    await expect(overviewPage.errorMessage).toHaveText("An internal error has occurred and has been logged.");
});

test("Successful user logout and invalidation of the active session", async({ page }) => {
const loginSideBarcomponent = new LogInSideBarComponent(page);
    await loginSideBarcomponent.navigate();
    await loginSideBarcomponent.submitLogin('john', 'demo');

    const loggedInSideBar = new LoggedInSideBarComponent(page);
    await loggedInSideBar.logOut();
    await expect(page).toHaveURL(loginSideBarcomponent.EXPECTED_PAGE_URL);
    for (const elem of loginSideBarcomponent.loginSideBarElements){
        await expect.soft(elem).toBeVisible();
    }
});

test("Pre-login sidebar displays all required labels, inputs, and links", async({ page }) => {
    const loginSideBarcomponent = new LogInSideBarComponent(page);
    await loginSideBarcomponent.navigate();
    for (const elem of loginSideBarcomponent.loginSideBarElements){
        await expect.soft(elem).toBeVisible();
    }
});