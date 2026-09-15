import { mergeTests } from '@playwright/test'
import { authTest } from './auth.fixture'
import { headerTest } from './header.fixture'
import { sessionTest } from './session.fixture';
import { footerTest } from './footer.fixture';

export const test = mergeTests(sessionTest, headerTest, footerTest, authTest);