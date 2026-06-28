# ADR-011: Identity, Device & Cloud Boundary

**Status:** Accepted

**Date:** 2026-06-28

**Version:** 1.0

**Authors:** Novus Core Team

**Reviewer(s):** Runtime Lead, Security Lead

---

# Summary

Novus adopts a **local-first identity model** that separates platform identity, browser identity, and website identity.

The platform does not require users to create a Novus account in order to use core functionality. Instead, each browser profile generates a random local installation identifier that remains independent of website accounts, browser credentials, or personally identifiable information.

Cloud services are used only where necessary, such as AI generation, and never become the authoritative source of a user's local workspaces or feature state.

---

# Context

Novus is fundamentally a browser-side productivity platform.

Most platform functionality—including generated features, workspaces, notes, adapters, and datasets—operates locally inside the browser.

Unlike cloud-first SaaS applications, Novus does not require centralized user accounts to perform its primary responsibilities.

At the same time, some platform capabilities, such as AI-powered feature generation, require communication with trusted cloud services.

The platform therefore requires a clear separation between local identity and cloud identity.

---

# Problem Statement

The platform must answer several architectural questions:

- How does the runtime uniquely identify an installation?
- Should users be required to create an account?
- How are website identities separated from Novus?
- Which information is stored locally?
- What information may be transmitted to cloud services?
- How is user privacy preserved while still enabling AI generation?

Without clear identity boundaries, the platform risks coupling local productivity data to unnecessary online identities.

---

# Decision

Novus adopts three independent identity domains.

## Local Platform Identity

Each browser profile generates a random installation identifier during initial setup.

This identifier:

- is randomly generated;
- remains local to the browser profile;
- identifies the installation rather than the person;
- is never derived from user information.

---

## Website Identity

Website accounts remain completely independent.

Examples include:

- GitHub accounts;
- YouTube accounts;
- LeetCode accounts;
- enterprise workspaces.

Novus never treats website identities as platform identities.

---

## Cloud Identity

Cloud services issue temporary session credentials only when required.

These credentials exist solely to authorize cloud operations such as AI generation and do not become permanent platform identities.

---

# Architecture Overview

```text
Browser Profile
       │
       ▼
Local Installation UUID
       │
       ├─────────────┐
       │             │
       ▼             ▼
Local Runtime    AI Gateway
       │             │
       ▼             ▼
Website      Temporary Session
Accounts        Authorization
```

The browser profile remains the primary owner of local state.

Cloud services provide functionality, not identity ownership.

---

# Alternatives Considered

## Option A — Mandatory Cloud Account

### Advantages

- Simplified synchronization.
- Centralized identity.
- Easier subscription management.

### Disadvantages

- Reduced privacy.
- Additional onboarding friction.
- Platform becomes cloud-dependent.
- Local-first philosophy weakened.

---

## Option B — Website Identity as Platform Identity

### Advantages

- Existing authentication.
- Simpler implementation.

### Disadvantages

- Couples platform to third-party providers.
- Limits supported websites.
- Reduces portability.
- Weak separation of concerns.

---

## Option C — Local-First Identity with Optional Cloud Services (Selected)

### Advantages

- Privacy-first.
- Offline capable.
- Independent of third-party accounts.
- Supports anonymous usage.
- Strong architectural separation.

### Disadvantages

- Cloud synchronization requires additional infrastructure.
- Multi-device experiences require future design.

---

# Selected Approach

Novus establishes the browser profile as the authoritative owner of local platform state.

Cloud services provide optional capabilities but never become the canonical owner of user workspaces, generated features, notes, or datasets.

Website identities remain external systems that adapters interact with only when necessary.

---

# Rationale

The platform exists to augment the user's browser experience—not replace it with another cloud application.

Separating identities provides several benefits:

- protects user privacy;
- reduces onboarding friction;
- enables offline operation;
- prevents unnecessary data collection;
- avoids coupling to third-party authentication providers;
- preserves architectural flexibility.

This separation also simplifies future platform evolution because authentication, synchronization, and AI generation remain independent concerns.

---

# Trade-offs

## Benefits

- Local-first experience.
- Improved privacy.
- Reduced dependency on cloud infrastructure.
- Offline compatibility.
- Clear ownership boundaries.
- Lower operational complexity.

## Drawbacks

- Cloud synchronization requires future work.
- Multi-device continuity is not automatic.
- Recovery of local-only data depends on browser storage.

---

# Consequences

## Positive Consequences

- Users can begin using Novus without creating an account.
- Local workspaces remain private by default.
- Website identities remain isolated.
- Cloud outages do not invalidate local installations.

## Negative Consequences

- Cross-device synchronization is deferred.
- Installation identity cannot be reconstructed if local data is permanently lost.

## Risks

- Future cloud features must preserve local-first principles.
- Synchronization mechanisms must avoid introducing hidden identity coupling.
- Gateway authentication policies require careful maintenance.

---

# Future Considerations

Future platform versions may introduce:

- optional authenticated synchronization;
- enterprise identity providers;
- encrypted cloud backup;
- team workspaces.

Any future identity system must preserve the architectural principle established by this ADR:

> **Novus identity, website identity, and cloud identity are separate concerns with independent responsibilities.**

Cloud services may extend the platform but must not replace local ownership of user workspaces by default.

---

# References

- Master Execution Plan
- Identity Model
- AI Gateway
- Local Profile Scope
- Offline Policy
- ADR-003 – Storage Boundary
- ADR-010 – Bundle Delivery, Immutable Artifact & Cache Model

---

_End of ADR_
