# Contributing to Novus

Welcome to the Novus team! This document outlines the governance, coding standards, and workflow required to contribute to the Novus monorepo. Please read this carefully before picking up your first assignment.

---

## 1. Assignment Workflow

We operate on a strict **Assignment-Driven Development** model (e.g., `A-001`, `E-001`).

1. **Claim an Assignment:** Check the Project Board and assign yourself an open task.
2. **Branch Out:** Create a new branch using the naming convention below.
3. **Draft PR:** Open a Draft Pull Request early so the team has visibility.
4. **Implement:** Write your code, ensuring all tests, linting, formatting, and type checks pass.
5. **Review:** Request a review from the designated `CODEOWNERS`.
6. **Merge:** Once approved and CI passes, **Squash & Merge** into `main`.

---

## 2. Branching Strategy

All branches must branch off `main` and include the Assignment ID.

### Branch Format

```text
<type>/<assignment-id>-<short-desc>
```

### Examples

```text
feat/E-001-contributing-docs
fix/C-005-error-framework-typo
chore/A-002-pnpm-workspace
```

### Branch Types

| Prefix     | Purpose                                |
| ---------- | -------------------------------------- |
| `feat`     | New feature                            |
| `fix`      | Bug fix                                |
| `docs`     | Documentation                          |
| `refactor` | Internal improvements                  |
| `test`     | Tests                                  |
| `style`    | Formatting only                        |
| `chore`    | Build tools, dependencies, maintenance |

---

## 3. Commit Style

We strictly enforce **Conventional Commits**.

Our CI pipeline and `commitlint` hooks will block non-compliant commits.

Learn more: <https://www.conventionalcommits.org/>

### Format

```text
<type>(<optional scope>): <description>
```

### Supported Types

- `feat:` A new feature or assignment implementation
- `fix:` A bug fix
- `docs:` Documentation only changes
- `style:` Formatting, missing semi-colons, etc. (handled by Prettier)
- `refactor:` Code change that neither fixes a bug nor adds a feature
- `test:` Adding missing tests or correcting existing tests
- `chore:` Changes to the build process or auxiliary tools

### Commit Examples

```text
feat(api): implement offline gateway
fix(shared): resolve adapter timeout
docs: update contributing guide
test(contracts): add schema validation tests
chore: update pnpm workspace
```

---

## 4. Local Setup

Our monorepo is managed via `pnpm`.

### 1. Clone the repository

```bash
git clone https://github.com/Plexis-Labs/Novus-lab.git
cd Novus-lab
```

### 2. Install dependencies

> **Important**
>
> Do **NOT** use npm or yarn.

```bash
pnpm install
```

### 3. Copy the environment variables

```bash
cp .env.example .env
```

By default:

```env
NOVUS_AI_PROVIDER=mock
NOVUS_STORAGE_ADAPTER=mock
```

These defaults allow the platform to run **completely offline** without requiring real API keys.

### 4. Run the project

#### Quick Development

```bash
pnpm dev
```

#### VS Code (Recommended)

Open the **Run and Debug** panel (`Ctrl + Shift + D`), then select:

- **`Debug: AI Gateway`** to run just the backend server.
- **`Debug: Full Stack (Extension + Gateway)`** to run both the extension and backend simultaneously.

This automatically:

- Builds the extension
- Starts the local AI Gateway
- Launches a dedicated Chrome instance
- Attaches the debugger

---

## 5. Workspace Structure

Novus is organized as a **pnpm monorepo**.

```text
apps/
├── extension/      Chrome MV3 Extension
├── demo/           Local Vite + React demo
└── ai-platform/    Backend / AI Gateway Node Server

packages/
├── contracts/      Shared Zod schemas and types
└── shared/         Utilities, Error Framework, Mock Adapters
```

### Package Overview

| Directory            | Purpose                                                 |
| -------------------- | ------------------------------------------------------- |
| `apps/extension`     | Core Chrome extension                                   |
| `apps/demo`          | Local development demo                                  |
| `apps/ai-platform`   | Backend / AI Gateway                                    |
| `packages/contracts` | Shared schemas and contracts                            |
| `packages/shared`    | Utilities, logging, envLoader, errors, offline adapters |

---

## 6. CLI Commands

Run these commands from the repository root.

| Command          | Description                 |
| ---------------- | --------------------------- |
| `pnpm build:all` | Build all packages          |
| `pnpm dev`       | Start local development     |
| `pnpm dev:demo`  | Start the demo application  |
| `pnpm test`      | Run unit and contract tests |
| `pnpm test:all`  | Run all workspace tests     |
| `pnpm e2e`       | Run Playwright tests        |
| `pnpm lint`      | Run ESLint                  |
| `pnpm format`    | Run Prettier                |
| `pnpm typecheck` | Run TypeScript compiler     |
| `pnpm clean`     | Remove build artifacts      |

---

## 7. Coding Style

### TypeScript

We use **strict TypeScript** across all packages.

- Avoid using `any`.
- If `any` is absolutely necessary, document why.

### Linting & Formatting

ESLint and Prettier are configured globally.

Before committing, always run:

```bash
pnpm lint
pnpm format
```

### Error Handling

Raw exceptions are forbidden.

Always use the typed errors provided by the shared Error Framework, for example:

- `NovusError` (Base class)
- `ValidationError` (For Zod schema & env failures)
- `AdapterError` (For AI/Storage mocking failures)

---

## 8. Testing

All new contracts, features, and adapters require test coverage.

### Unit & Contract Tests

Run:

```bash
pnpm test
```

or

```bash
pnpm test:all
```

### End-to-End Tests

Playwright is used for browser automation.

Run:

```bash
pnpm e2e
```

> **Note**
>
> Do not request a review if tests are failing locally.

---

## 9. Review Process

Before requesting review, ensure:

- Your PR description follows the official Pull Request Template.
- CI/CD passes (Build, Lint, Test, Format, Typecheck).
- At least **one approval** from a designated **Code Owner** is received.
- All reviewer comments are resolved before merging.

After approval, the Pull Request should be **Squash & Merged** into `main`.

---

## Need Help?

If you have questions about:

- assignments
- project architecture
- coding standards
- repository workflow

please reach out through the project's discussion channels before starting implementation.

Happy coding! 🚀
