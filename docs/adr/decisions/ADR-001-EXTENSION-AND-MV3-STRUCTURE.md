# ADR-001: Extension & Manifest V3 Architecture

**Status:** Accepted

**Date:** 2026-06-28

**Version:** 1.0

**Authors:** Novus Core Team

**Reviewer(s):** Runtime Lead

---

# Summary

Novus is implemented as a Chrome Manifest V3 (MV3) browser extension. The extension serves as the trusted runtime responsible for browser interaction, permission enforcement, lifecycle management, data collection, storage, and execution of AI-generated micro-apps.

All privileged browser capabilities remain inside trusted extension code. AI-generated code never executes with browser privileges and communicates only through a restricted, typed runtime interface.

---

# Context

Novus generates persistent micro-apps that augment supported website workspaces such as GitHub pull requests, LeetCode problems, YouTube videos, and controlled enterprise demos.

These generated tools require capabilities unavailable to ordinary web applications, including:

* Detecting supported routes.
* Persisting local workspace state.
* Managing browser storage.
* Mounting side-panel interfaces.
* Interacting with trusted site adapters.
* Enforcing capability permissions.
* Managing lifecycle events.
* Operating independently of individual websites.

The platform therefore requires a trusted execution environment capable of interacting with the browser while maintaining strict separation between privileged runtime code and AI-generated code.

---

# Problem Statement

Novus needs a runtime capable of:

* Integrating directly with supported websites.
* Managing browser-level capabilities.
* Persisting state across browsing sessions.
* Enforcing strict security boundaries.
* Supporting AI-generated micro-apps safely.
* Remaining maintainable as additional sites and capabilities are introduced.

The chosen architecture must balance flexibility, security, portability, and long-term maintainability.

---

# Decision

Novus adopts Chrome Manifest V3 as its primary runtime platform.

The extension owns all privileged browser functionality, including:

* Route detection.
* Browser messaging.
* Storage access.
* Adapter execution.
* Capability validation.
* Permission management.
* Lifecycle orchestration.
* Bundle verification.
* Secure communication with generated micro-apps.

AI-generated applications never receive direct browser APIs or extension privileges.

Instead, all interactions occur through a restricted runtime interface implemented by trusted extension components.

---

# Architecture Overview

```text
Supported Website
        │
        ▼
Trusted Content Script
        │
        ▼
Manifest V3 Extension Runtime
        │
        ├── Capability Runtime
        ├── Storage Engine
        ├── Adapter Engine
        ├── Lifecycle Manager
        ├── Permission Manager
        └── Bundle Validator
                │
                ▼
Sandboxed Generated Micro-App
```

The extension forms the trusted boundary between browser capabilities and generated application code.

---

# Alternatives Considered

## Option A — Standalone Web Application

### Advantages

* Cross-platform deployment.
* Simpler hosting model.
* Familiar web development workflow.

### Disadvantages

* Cannot interact directly with website workspaces.
* No browser extension APIs.
* Cannot provide contextual augmentation beside existing websites.
* Cannot manage browser-side persistence or permissions.

---

## Option B — Userscript Platform

### Advantages

* Lightweight.
* Easy distribution.
* Direct page access.

### Disadvantages

* Weak isolation.
* Difficult permission model.
* Limited lifecycle management.
* Poor long-term maintainability.
* Generated code would execute with excessive trust.

---

## Option C — Desktop Application

### Advantages

* Complete runtime control.
* Rich local capabilities.

### Disadvantages

* Poor integration with existing browsing workflows.
* Increased installation complexity.
* Higher maintenance cost.
* Does not naturally augment websites already open in the user's browser.

---

## Selected Approach

Chrome Manifest V3 provides the best balance of browser integration, security, lifecycle management, and long-term maintainability while allowing the runtime to enforce strict privilege separation.

---

# Rationale

Choosing Manifest V3 aligns with Novus' core architectural principles:

* Browser capabilities remain inside trusted runtime code.
* Generated applications operate with minimal privileges.
* Security boundaries are explicit and enforceable.
* Browser lifecycle events are managed consistently.
* Storage, adapters, and permissions remain centrally controlled.
* Future platform capabilities can be introduced without expanding generated code privileges.

This separation is fundamental to Novus' security model and enables AI-generated features without compromising browser integrity.

---

# Trade-offs

## Benefits

* Strong browser security model.
* Clear trust boundaries.
* Native browser integration.
* Persistent local storage.
* Consistent lifecycle management.
* Scalable architecture for additional supported websites.

## Drawbacks

* Chrome-specific implementation for v1.
* Manifest V3 service worker lifecycle introduces additional complexity.
* Extension packaging and review requirements.
* Additional runtime abstraction compared to ordinary web applications.

---

# Consequences

## Positive Consequences

* Trusted runtime owns all privileged operations.
* Generated code remains isolated.
* Security policies can be centrally enforced.
* New features integrate through stable runtime interfaces.

## Negative Consequences

* Browser APIs become implementation dependencies.
* Additional extension infrastructure must be maintained.
* Browser compatibility requires explicit planning.

## Risks

* Future Manifest V3 platform changes may require architectural updates.
* Browser vendor policy changes could affect extension capabilities.

---

# Future Considerations

Future versions may support additional Chromium-based browsers and evaluate support for other extension ecosystems. These expansions should preserve the same trust model and capability boundaries established by this decision rather than introducing platform-specific privilege differences.

---

# References

* Master Execution Plan
* Phase 1 – Extension Platform
* Runtime Architecture
* Security Architecture
* ADR-002 – Sandbox, CSP, Origin & Bridge Model

---

*End of ADR*
