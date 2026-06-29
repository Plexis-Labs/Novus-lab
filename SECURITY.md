# Security Policy

The Novus team takes the security of our platform, our AI generation pipeline, and our users' browser environments seriously. This document outlines our disclosure policies and architectural security guarantees.

## 1. Reporting a Vulnerability

**Do not report public security vulnerabilities via GitHub Issues.**

If you discover a security vulnerability within the Novus monorepo, our browser extension, or our AI generation pipeline, please email our Security Team directly at **[Mayurnanda9857@gmail.com](mailto:Mayurnanda9857@gmail.com)**!

- **Response Time:** You will receive an initial acknowledgment within **48 hours**.
- **Triage:** Our team will triage the issue and determine mitigation steps within **5 business days**.
- **Disclosure:** We ask that you maintain strict confidentiality and follow Responsible Disclosure until we have shipped a patch and published a public advisory.

## 2. Threat Model & Trust Boundaries

Novus operates under a strict Sandbox Isolation architecture validated during our Phase -1 Spike.

- **Untrusted Context:** The Host Website (e.g., GitHub, LeetCode) and the Sandboxed React Application (`iframe`).
- **Trusted Context:** The Chrome Extension Content Script, Service Worker (`Trusted Runtime`), and Extension Storage.

**Core Guarantees:**

1. **Zero DOM Leakage:** Sandboxed applications execute inside a Closed Shadow DOM and are forbidden from accessing `window.top` or page cookies.
2. **Perimeter Firewall:** The Content Script silently drops any `postMessage` initiated by the host webpage (`isAuthorizedSource`).
3. **Route Epochs:** Single Page Application (SPA) navigations invalidate existing runtime state and physically destroy background sandbox iframes to prevent zombie context exploitation.

## 3. Sensitive Data & Storage Boundary

- **Capability Tokens:** Tokens granted to sandboxed micro-apps are strictly short-lived, bound to a specific tab, and bound to the active Route Epoch.
- **Storage Access:** Micro-apps cannot read raw extension storage. All state persistence requests must pass through typed bridge envelopes validated by Zod schemas.
- **Client Input:** The Trusted Runtime never trusts client input. All payloads are cryptographically verified and checked against a Nonce cache to prevent replay attacks.

## 4. AI Safety & Generation Pipeline

Novus utilizes AI to dynamically generate and project user interfaces (`MicroAppSpec`).

- **Offline Fallback:** The runtime supports `NOVUS_AI_PROVIDER=mock`, allowing full platform execution without external network calls.
- **Prompt Injection Defense:** Generated bundles (`BundleArtifact`) must be validated against strict JSON schemas before mounting. Untrusted string evaluation (`eval()`, `new Function()`) is blocked via Content Security Policies.
- **Traceability:** Every AI generation produces an immutable `GenerationTrace` recording the prompt version, model latency, bundle hash, and manifest version.

## 5. Extension Permissions

We adhere to the Principle of Least Privilege. Novus requests only the minimal permissions required for Manifest V3 compliance:

- `storage`: For persisting workspace data and authorization grants.
- `webNavigation`: Exclusively used by the Service Worker to broadcast Route Epoch timestamps upon native browser URL transitions.
