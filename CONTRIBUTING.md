# Contributing to Novus

Welcome to the Novus team! This document outlines the governance, coding standards, and workflow required to contribute to the Novus monorepo. Please read this carefully before picking up your first assignment.

## 1. Assignment Workflow
We operate on a strict Assignment-Driven Development model (e.g., `A-001`, `E-001`).
1. **Claim an Assignment:** Check the Project Board and assign yourself an open task.
2. **Branch Out:** Create a new branch using the naming convention below.
3. **Draft PR:** Open a Draft Pull Request early so the team has visibility.
4. **Implement:** Write your code, ensuring all tests and linters pass.
5. **Review:** Request a review from the designated `CODEOWNERS`.
6. **Merge:** Once approved and CI passes, Squash & Merge into `main`.

## 2. Branching Strategy
All branches must branch off `main` and include the Assignment ID. 
Format: `<type>/<assignment-id>-<short-desc>`

**Examples:**
* `feat/E-001-contributing-docs`
* `fix/C-005-error-framework-typo`
* `chore/A-002-pnpm-workspace`

## 3. Commit Style
We strictly enforce [Conventional Commits](https://www.conventionalcommits.org/). Our CI pipeline and `commitlint` hooks will block non-compliant commits.

**Format:** `<type>(<optional scope>): <description>`
* `feat:` A new feature or assignment implementation
* `fix:` A bug fix
* `docs:` Documentation only changes
* `style:` Formatting, missing semi-colons, etc. (handled by Prettier)
* `refactor:` Code change that neither fixes a bug nor adds a feature
* `test:` Adding missing tests or correcting existing tests
* `chore:` Changes to the build process or auxiliary tools

## 4. Local Setup
Our monorepo is managed via `pnpm`.
```bash
# 1. Clone the repository
git clone [https://github.com/your-org/novus.git](https://github.com/your-org/novus.git)
cd novus

# 2. Install dependencies (DO NOT use npm or yarn)
pnpm install

# 3. Copy the environment variables
cp .env.example .env

# 4. Run the local development server
pnpm dev
```

## 5. Coding Style

* **TypeScript:** We use strict TypeScript across all packages. No `any` types are allowed unless explicitly justified.
* **Linting & Formatting:** ESLint and Prettier are configured globally. Run `pnpm lint` and `pnpm format` before committing.
* **Error Handling:** Raw exceptions are forbidden. Use the typed errors defined in our Error Framework (e.g., `DeveloperError`, `RuntimeError`).

## 6. Testing

All new contracts, features, and adapters require test coverage.

* **Unit & Contract Tests:** Run `pnpm test` to execute the suite.
* **E2E Tests:** Playwright is used for browser automation. Run `pnpm e2e`.

> **Note:** Do not request a review if tests are failing locally.

## 7. Review Process

* Ensure your PR description uses the official Pull Request Template.
* CI/CD must pass (Build, Lint, Test, Format).
* At least one approval from a designated **Code Owner** is required.
* Resolve all reviewer comments before merging.