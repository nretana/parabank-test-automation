# 🏦 Parabank Test Automation Framework

> 🚧 **Work in Progress (WIP)**: This framework architecture is actively under development. The folder structure, components, test suites, and project elements are subject to ongoing updates and modifications to support long-term scalability and framework growth as new features are built out.

An end-to-end (E2E) automated testing framework built for the [Parabank Online Banking Application](https://parabank.parasoft.com/). Designed using **Playwright**, **TypeScript**, and the **Page Object Model (POM)** pattern, this project demonstrates modern test automation architecture, scalable test design, and CI/CD readiness.

---

## 🛠️ Tech Stack & Key Tools

* **Language:** TypeScript
* **Test Runner:** [Playwright Test](https://playwright.dev/)
* **Design Pattern:** Page Object Model (POM) and Fixtures
* **Authentication Strategy:** Storage State (Session Reuse)
* **Reporting:** Playwright HTML Reporter & Trace Viewer
<!-- * **CI/CD:** GitHub Actions -->

---

## 🏗️ Framework Architecture

```text
├── .github/
│   └── workflows/
│       └── playwright.yml         # CI/CD Pipeline
├── src/
│   ├── components/                # Modular UI Components (Header, Sidebar, Navigation)
│   │   ├── header.component.ts
│   │   └── footer.component.ts
│   ├── pages/                     # Full Page Objects (Transfer, Accounts Overview)
│   │   ├── account-overview.page.ts
│   │   └── default.page.ts
│   ├── fixtures/                  # Custom Playwright Fixtures
│   │   └── auth.fixture.ts
│   ├── utils/                     # Test Helpers & Data Generators
│   │   └── data-helpers.ts
│   └── test-data/                 # Mock & Test Datasets
├── tests/                         # E2E Test Suites
│   ├── auth/                      # Login & Registration Tests
│   ├── transfers/                 # Transfers, Bill Pay & Account Management
│   └── layout/                    # Global Component Tests (Header, Footer, Sidebar)
├── playwright.config.ts           # Global Playwright Configuration
└── package.json
```

---

## 🔑 Key Architecture Highlights

* **Component Object Model:** Separates global persistent UI elements (Header, LoggedIn Sidebar, Login Sidebar) from page-specific views to eliminate code duplication.
* **Session Storage Authentication:** Reuses authenticated state (`storageState`) across tests to bypass UI login steps for faster execution.
* **Custom Fixtures:** Injects pre-instantiated page and component objects into tests dynamically, keeping spec files clean and focused on test logic.
* **Strict Locators:** Uses user-centric accessibility locators (`getByRole`, `getByLabel`, `getByTestId`) for resilient, auto-waiting test scripts.

---

## 🚀 Getting Started

### Prerequisites
* **Node.js**: v18+ 
* **npm**: v9+

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nretana/parabank-playwright-automation.git
   cd parabank-playwright-automation
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright Browsers:**
   ```bash
   npx playwright install --with-deps
   ```

---

## 🧪 Running Tests

| Command | Description |
| :--- | :--- |
| `npm test` | Run all E2E tests in headless mode |
| `npm run test:ui` | Open interactive Playwright UI Mode |
| `npm run test:browser` | Run tests in visible browser mode |
| `npm run test:[@smoke\|@regression]` | Run a specific test type |
| `npm run test:report` | Open the HTML test execution report |

---

## 📊 Test Coverage & Roadmap

### 🟡 In Progress / Active Development
- [x] Framework architecture & Playwright configuration
- [x] Component Object Model setup (`Header`, `Footer`, `LoginSidebar`, `LoggedInSidebar`)
- [x] Custom fixtures implementation (`test.fixture.ts`)
- [ ] User authentication & registration flows
- [ ] Account management tests (Open Account, Balances)

### 🔮 Planned Features
- [ ] Financial transactions (Fund Transfer, Bill Pay)
- [ ] GitHub Actions CI/CD pipeline integration
- [ ] Cross-browser test suite validation (Chromium, Firefox, WebKit)

---

<!--
## 📈 CI/CD Pipeline

This repository includes a **GitHub Actions** workflow (`.github/workflows/playwright.yml`) that triggers on every `push` and `pull_request` to `main`. It automatically executes the test suite across multiple browser engines and uploads Playwright HTML reports as pipeline artifacts.
-->
