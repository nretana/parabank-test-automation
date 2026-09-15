import { Locator } from '@playwright/test';

export interface ExpectedElement {
    locator: Locator,
    expectedText?: string
}

export interface HyperLink {
    locator: Locator,
    expectedLabel?: string,
    expectedHref: string,
    isExternal?: boolean,
    isNewTab?: boolean,
    expectedRedirectUrl: RegExp | string,
    expectedElements?: ExpectedElement[]
}