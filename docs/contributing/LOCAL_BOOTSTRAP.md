# Local Bootstrap Guide

This guide covers the minimum steps required to clone, install, configure, and run Novus locally for development.

## Prerequisites

- Node.js 20+
- pnpm 9+
- Git
- A modern Chromium-based browser for extension testing

## 1. Clone and install

```bash
git clone https://github.com/Plexis-Labs/Novus-lab.git
cd novus
pnpm install
```

## 2. Environment setup

Copy the example environment file and adjust values as needed:

```bash
cp .env.example .env
```

The default configuration is suitable for local development and uses the mock AI provider by default.

## 3. Run the workspace

Useful commands:

```bash
pnpm dev
pnpm build
pnpm test
pnpm lint
pnpm typecheck
```

## 4. Extension development

For the browser extension workflow:

```bash
pnpm dev:extension
```

Then load the unpacked extension from the appropriate app directory in Chrome with Developer Mode enabled.

## 5. Troubleshooting

- If install fails, ensure pnpm is upgraded: `corepack enable` and `pnpm --version`
- If the extension does not load, confirm the workspace build completed successfully
- If tests fail, verify that the environment file exists and the mock providers are enabled

## 6. Expected outcome

A fresh contributor should be able to:

- install dependencies,
- run the workspace build,
- run the test suite,
- and start the extension locally.
