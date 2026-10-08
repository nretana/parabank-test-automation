import { Locator, Page } from '@playwright/test'
import { BASE_URL } from '@constants/base.constant';
import { getUrlPattern } from '@utils/get-url-pattern';

export class AccountsOverviewPage {

    private readonly page: Page;
    readonly errorHeading: Locator;
    readonly errorMessage: Locator;
    private readonly PAGE_NAME = "overview";
    readonly EXPECTED_PAGE_URL = new RegExp(getUrlPattern(this.PAGE_NAME));
    constructor(page: Page){
        this.page = page;
        this.errorHeading = this.page.getByRole("heading", { name: "Error!" });
        this.errorMessage = this.page.locator("#rightPanel > p");
    }

    navigate = async(): Promise<void> => {
        await this.page.goto(`${BASE_URL}/${this.PAGE_NAME}.htm`);
    }
}