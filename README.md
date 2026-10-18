# 🏦 Parabank Test Automation Framework

> 🚧 **Work in Progress (WIP)**: This framework architecture is actively under development. The folder structure, components, test suites, and project elements are subject to ongoing updates and modifications to support long-term scalability and framework growth as new features are built out.

An end-to-end (E2E) automated testing framework built for the [Parabank Online Banking Application](https://parabank.parasoft.com/). Designed using **Playwright**, **TypeScript**, and the **Page Object Model (POM)** pattern, this project demonstrates modern test automation architecture, scalable test design, and CI/CD readiness.

---

## 🛠️ Tech Stack & Key Tools

* **Language:** TypeScript
* **Test Runner:** [Playwright Test](https://playwright.dev/)
* **Design Pattern:** Page Object Model (POM) and Fixtures
* **Reporting:** Playwright HTML Reporter & Trace Viewer
* **CI/CD:** GitHub Actions

<!-- * **Authentication Strategy:** Storage State (Session Reuse) -->

---

## 🏗️ Framework Architecture

```text
├── .github/
│   └── workflows/
│       └── playwright.yml         # CI/CD Pipeline
├── src/
│   ├── @types/
│   ├── constants/
│   ├── pages/                     # Full Page Objects (Transfer, Accounts Overview)
│   │   ├── accounts/
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   ├── customer-lookup.page.ts
│   │   │   └── signup.page.ts
│   │   ├── billpay/
│   │   ├── transfers/
│   │   ├── layout/
│   │   │   └── components/        # Modular UI Components (Header, Footer)
│   │   │       ├── header.component.ts
│   │   │       └── footer.component.ts
│   │   └── home.page.ts
│   ├── fixtures/                  # Custom Playwright Fixtures
│   │   └── auth.fixture.ts
│   ├── utils/                     # Test Helpers & Data Generators
│   │   └── data-helpers.ts
│   ├── test-data/                 # Mock & Test Datasets
│   └── tests/                     # E2E Test Suites
│       ├── accounts/              # Account Management Tests
│       ├── auth/                  # Login & Registration Tests
│       ├── billpay/               # Bill Pay
│       ├── transfers/             # Transfers
│       └── layout/                # Global Component Tests (Header, Footer, Sidebar)
├── playwright.config.ts           # Global Playwright Configuration
└── package.json
```

---

## 🔑 Key Architecture Highlights

* **Component Object Model:** Separates global persistent UI elements (Header, LoggedIn Sidebar, Login Sidebar) from page-specific views to eliminate code duplication.
* **Custom Fixtures:** Injects pre-instantiated page and component objects into tests dynamically, keeping spec files clean and focused on test logic.
* **Resilient Locators:** Prioritizes user-centric accessibility locators (getByRole, getByLabel, getByTestId) where available, while pragmatically combining them with robust CSS selectors and custom attributes to handle legacy DOM structures smoothly.

<!-- * **Session Storage Authentication:** Reuses authenticated state (`storageState`) across tests to bypass UI login steps for faster execution.-->

---

## 🚀 Getting Started

### Prerequisites
* **Node.js**: v22+ 
* **npm**: v11+

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nretana/parabank-test-automation.git
   cd parabank-test-automation
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
| `npm run report:[@smoke\|@regression]` | Open the HTML test execution report |

---

## 📊 Test Coverage & Roadmap

### 🟡 In Progress / Active Development
- [x] Framework architecture & Playwright configuration
- [x] Component Object Model setup (`Header`, `Footer`, `SignInSidebar`, `SignedInSidebar`)
- [x] Custom fixtures implementation (`auth.fixture.ts`)
- [x] User authentication & registration flows
- [ ] Account management tests (Open Account, Balances)
- [ ] Financial transactions (Fund Transfer, Bill Pay)
- [x] Cross-browser test suite validation (Chromium, Firefox, WebKit)
- [x] GitHub Actions CI/CD pipeline integration

<!-- ### 🔮 Planned Features -->


---

<!-- ## 📈 CI/CD Pipeline

This repository includes **GitHub Actions** workflows (`.github/workflows/regression.yml, .github/workflows/smoke.yml`) that triggers on every `push` and `pull_request` to `main`. It automatically executes the test suite across multiple browser engines and uploads Playwright HTML reports as pipeline artifacts. -->

## 🐛 Bug Tracking & Quality Insights

Real defects uncovered during test suite runs are logged and managed directly in this repository's issue tracker.
You can explore detailed bug reports with reproduction steps, expected vs. actual behaviors, via the link below:

* **[View Active Bug Reports](https://github.com/nretana/parabank-test-automation/issues)**
<!-- * **[View Resolved Issues](https://github.com/nretana/parabank-test-automation/issues?q=is%3Aissue+is%3Aclosed+label%3Abug)** -->