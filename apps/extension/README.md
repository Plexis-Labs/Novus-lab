# @novus/extension

Chrome Extension application for Novus.

Responsible for:

- Background Service Worker
- Content Script
- Side Panel
- Browser integration

Shared logic belongs in packages/.

## Ownership

This package contains browser-specific application code only.

Reusable logic belongs in `/packages`.

Business contracts belong in `@novus/contracts`.

Do not duplicate shared utilities inside this package.
