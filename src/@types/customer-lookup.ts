import { Locator } from '@playwright/test'

export interface CustomerLookupField {
    label: Locator,
    expectedLabel: string,
    input: Locator,
    requiredError?: Locator,
    expectedRequiredError?: string
}