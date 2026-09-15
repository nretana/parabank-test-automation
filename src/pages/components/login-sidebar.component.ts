import { Page, Locator } from '@playwright/test'
import { BASE_URL } from 'src/constants/base.constant';
import { getUrlPattern } from 'src/utils/getUrlPattern';


export class LogInSideBarComponent {
    private page: Page;
    readonly logInHeading: Locator;
    readonly usernameLabel: Locator;
    readonly passwordLabel: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly forgotLoginLink: Locator;
    readonly registerLink: Locator;
    readonly logInBtn: Locator;
    readonly errorHeading: Locator;
    readonly errorMessage: Locator;
    readonly loginSideBarElements: Locator[];
    private readonly PAGE_NAME = "index";
    readonly EXPECTED_PAGE_URL = new RegExp(getUrlPattern(this.PAGE_NAME));

    constructor(page: Page){
        this.page = page;
        this.logInHeading = this.page.getByRole("heading", { name: "Customer Login" });
        this.usernameLabel = this.page.getByText("Username");
        this.passwordLabel = this.page.getByText("Password");
        this.usernameInput  = this.page.locator("input[name='username']");
        this.passwordInput = this.page.locator("input[name='password']");
        this.forgotLoginLink = this.page.getByRole("link", { name: "Forgot login info?" });
        this.registerLink = this.page.getByRole("link", { name: "Register" });
        this.logInBtn = this.page.getByRole("button", { name: "LOG IN" });
        this.errorHeading = this.page.getByRole("heading", { name: "Error!" });
        this.errorMessage = this.page.locator("#rightPanel > p");
        this.loginSideBarElements = [
            this.logInHeading,
            this.usernameLabel,
            this.passwordLabel,
            this.forgotLoginLink,
            this.registerLink,
            this.usernameInput,
            this.passwordInput,
            this.logInBtn
        ]
    }

    navigate = async(): Promise<void> => {
        await this.page.goto(`${BASE_URL}/${this.PAGE_NAME}.htm`);
    }

    submitLogin = async(username: string, password: string) => {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.logInBtn.click()
    }
}