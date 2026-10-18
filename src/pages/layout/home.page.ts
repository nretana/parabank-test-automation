import { Page } from "@playwright/test";
import { BASE_URL } from "@constants/base.constant";
import { getUrlPattern } from "@utils/get-url-pattern";
import { Logger } from '@utils/logger';
import { HOME_PAGE } from '@constants/route.constant';

export class HomePage {
  private readonly page: Page;
  private readonly PAGE_NAME = HOME_PAGE;
  readonly EXPECTED_PAGE_URL = new RegExp(getUrlPattern(this.PAGE_NAME));

  constructor(page: Page) {
    this.page = page;
  }

  navigate = async (): Promise<void> => {
    const currentUrl = `${BASE_URL}/${this.PAGE_NAME}.htm`;
    Logger.debug(`Navigating to url: ${currentUrl}`);
    await this.page.goto(`${BASE_URL}/${this.PAGE_NAME}.htm`);
  };
}
