import { Locator } from '@playwright/test'
export interface SignUpField {
    label: Locator,
    expectedLabel: string,
    input: Locator,
    requiredError?: Locator,
    expectedRequiredError?: string
}