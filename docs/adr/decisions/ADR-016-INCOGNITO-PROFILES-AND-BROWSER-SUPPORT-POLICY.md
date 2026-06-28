# ADR-016: Incognito, Profiles & Browser Support Policy

**Status:** Accepted

**Date:** 2026-06-28

**Version:** 1.0

**Authors:** Novus Core Team

**Reviewer(s):** Runtime Lead, Security Lead

---

# Summary

Novus adopts a **profile-isolated, privacy-first browser support model**.

Each Chrome profile represents an independent Novus installation with its own local identity, storage, workspaces, generated features, and datasets.

Incognito mode is disabled by default and does not participate in workspace storage, AI generation, or feature execution.

This policy preserves privacy, prevents accidental data leakage, and maintains predictable platform behavior across browser environments.

---

# Context

Novus is designed as a persistent productivity platform.

Its primary responsibilities include:

- storing workspaces;
- maintaining generated features;
- preserving notes;
- caching verified artifacts;
- tracking datasets;
- maintaining feature state.

These responsibilities assume durable browser storage and long-lived runtime state.

Incognito browsing intentionally provides temporary execution environments that discard state after the browsing session ends.

Similarly, Chrome profiles represent intentionally isolated browser environments.

The platform therefore requires clear rules governing how browser contexts interact with persistent Novus data.

---

# Problem Statement

The platform must determine:

- whether generated features should execute in Incognito;
- how persistent workspaces behave across browser profiles;
- how browser identities relate to local platform identities;
- whether browser profiles may share state;
- how future browser support should preserve these guarantees.

Without explicit policies, browser behavior could become inconsistent and compromise user expectations regarding privacy and persistence.

---

# Decision

Novus establishes three permanent browser policies.

## Incognito

Incognito mode is disabled by default.

When running in Incognito:

- no feature mounting occurs;
- no workspace data is loaded;
- no persistent storage is written;
- no AI generation requests are initiated;
- no datasets are collected.

---

## Browser Profiles

Each browser profile owns an independent `localProfileScope`.

This identifier:

- is randomly generated;
- remains local to the profile;
- identifies the installation;
- is never shared across profiles.

Profiles never share:

- workspaces;
- feature state;
- datasets;
- notes;
- cached bundles;
- permissions.

---

## Browser Support

Chrome Stable serves as the reference implementation for Novus v1.

Additional browser support may be introduced only if equivalent security guarantees, runtime behavior, and storage isolation can be maintained.

---

# Architecture Overview

```text id="9b6gpf"
Chrome Installation
        │
        ├───────────────┐
        │               │
        ▼               ▼
Profile A         Profile B
        │               │
localProfileScope  localProfileScope
(UUID A)           (UUID B)
        │               │
        ▼               ▼
Independent      Independent
Workspaces       Workspaces

Incognito
     │
     ▼
No Mount
No Storage
No AI Generation
```

Every browser profile represents a separate Novus environment.

---

# Alternatives Considered

## Option A — Shared State Across Profiles

### Advantages

- Easier multi-profile experience.
- Less duplicated data.

### Disadvantages

- Weak isolation.
- Privacy concerns.
- Difficult lifecycle management.
- Unclear ownership of local data.

---

## Option B — Enable Full Incognito Support

### Advantages

- Consistent feature availability.
- Larger execution surface.

### Disadvantages

- Conflicts with Incognito privacy expectations.
- Temporary storage complicates persistence.
- Increased security considerations.
- Reduced predictability.

---

## Option C — Profile Isolation with Restricted Incognito (Selected)

### Advantages

- Strong privacy.
- Predictable persistence.
- Independent browser environments.
- Simpler runtime guarantees.
- Clear ownership boundaries.

### Disadvantages

- No persistent Incognito workflows.
- Duplicate setup across browser profiles.
- Future synchronization requires explicit design.

---

# Selected Approach

The browser profile becomes the authoritative execution boundary for Novus.

Each profile owns:

- installation identity;
- persistent storage;
- generated features;
- cached artifacts;
- workspace datasets.

Incognito remains intentionally excluded from persistent platform behavior to preserve browser privacy guarantees.

---

# Rationale

Novus is fundamentally a persistent workspace platform.

Supporting persistence inside temporary browsing environments would weaken both user expectations and architectural consistency.

Similarly, treating browser profiles as independent environments aligns with Chrome's existing security model and simplifies storage ownership.

This approach also avoids hidden coupling between multiple browser identities while preserving the platform's local-first philosophy.

---

# Trade-offs

## Benefits

- Strong profile isolation.
- Predictable storage ownership.
- Better privacy.
- Simpler runtime model.
- Consistent browser behavior.
- Reduced accidental data leakage.

## Drawbacks

- No Incognito productivity workflows.
- Manual setup required per profile.
- Cross-profile synchronization is deferred.

---

# Consequences

## Positive Consequences

- Browser profiles remain completely independent.
- Workspace ownership is deterministic.
- Local identity remains private.
- Runtime behavior is consistent across installations.
- Browser privacy guarantees remain respected.

## Negative Consequences

- Users cannot continue persistent work inside Incognito sessions.
- Multi-profile users manage separate Novus environments.

## Risks

- Future browser support must preserve equivalent isolation guarantees.
- Synchronization features must avoid weakening profile boundaries.
- Browser API changes may require implementation updates.

---

# Future Considerations

Future releases may support:

- additional Chromium-based browsers;
- optional profile synchronization;
- enterprise-managed browser deployments;
- encrypted cloud synchronization.

Regardless of future expansion, the following architectural principles remain unchanged:

- browser profiles are independent execution environments;
- local platform identity is profile-scoped;
- Incognito does not participate in persistent platform functionality by default.

---

# References

- Master Execution Plan
- Local Profile Scope
- Identity Model
- Storage Architecture
- Incognito & Profile Policy
- ADR-003 – Storage Boundary
- ADR-011 – Identity, Device & Cloud Boundary

---

_End of ADR_
