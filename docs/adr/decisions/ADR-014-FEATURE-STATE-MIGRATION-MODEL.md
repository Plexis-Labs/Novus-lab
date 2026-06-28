# ADR-014: Feature State Migration Model

**Status:** Accepted

**Date:** 2026-06-28

**Version:** 1.0

**Authors:** Novus Core Team

**Reviewer(s):** Runtime Lead, Storage Lead

---

# Summary

Novus adopts a versioned feature state migration model that preserves user data across feature updates while maintaining compatibility between generated bundles, manifests, and persistent storage.

Feature state is treated as long-lived user data rather than temporary runtime information. When a feature evolves, the runtime is responsible for validating compatibility and applying controlled migrations before the updated feature is mounted.

This approach ensures that user-created workspaces, notes, and feature state remain durable across platform evolution.

---

# Context

Generated features evolve over time.

Updates may introduce:

* new UI components;
* additional capabilities;
* modified storage schemas;
* improved workflows;
* bug fixes;
* manifest changes.

At the same time, users accumulate persistent information such as:

* notes;
* annotations;
* workspace state;
* preferences;
* feature-derived datasets;
* cached metadata.

Discarding this information during updates would undermine one of Novus' core promises: **persistent micro-apps that survive browser sessions and platform evolution.**

---

# Problem Statement

The platform requires a strategy that:

* preserves user data during updates;
* validates compatibility before execution;
* supports rollback;
* allows feature evolution without data loss;
* maintains consistency between feature code and stored state.

Without an explicit migration model, feature updates could corrupt persistent data or force users to recreate their work.

---

# Decision

Novus adopts a **version-aware feature migration model**.

Every feature consists of independent but related versioned artifacts:

* Feature Manifest
* Generated Bundle
* Persistent Feature State

Before mounting an updated feature, the Trusted Runtime validates compatibility between these components.

If migration is required, it is completed before execution begins.

If migration cannot be completed safely, the runtime preserves the previous feature version and prevents automatic execution of incompatible state.

---

# Architecture Overview

```text id="x94vnt"
Existing Feature State
         │
         ▼
Version Compatibility Check
         │
         ▼
Migration Required?
      │         │
     No        Yes
      │         │
      ▼         ▼
 Mount      Migration Engine
                 │
                 ▼
        Validation & Integrity Check
                 │
                 ▼
         Updated Feature State
                 │
                 ▼
          Runtime Mount
```

Feature state is never modified without validation.

---

# Alternatives Considered

## Option A — Reset State on Every Update

### Advantages

* Simple implementation.
* No migration logic.
* Predictable runtime behaviour.

### Disadvantages

* Loss of user data.
* Poor user experience.
* Breaks persistence guarantees.
* Reduces confidence in generated features.

---

## Option B — Ignore Version Compatibility

### Advantages

* Minimal runtime work.
* Faster updates.

### Disadvantages

* Undefined behaviour.
* Data corruption.
* Runtime failures.
* Difficult debugging.

---

## Option C — Controlled Versioned Migration (Selected)

### Advantages

* Preserves user work.
* Supports feature evolution.
* Enables rollback.
* Predictable runtime behaviour.
* Strong compatibility guarantees.

### Disadvantages

* Additional migration infrastructure.
* Version management complexity.
* More runtime validation.

---

# Selected Approach

Feature updates become controlled transitions rather than replacements.

The runtime evaluates:

* manifest version;
* bundle version;
* stored feature version;
* runtime compatibility.

Only after successful validation and migration is the updated feature allowed to mount.

Rollback remains available if migration fails or compatibility cannot be established.

---

# Rationale

Persistence is one of Novus' defining capabilities.

Generated features are intended to become long-lived productivity tools rather than disposable AI outputs.

Treating feature state as durable user data allows the platform to:

* evolve safely;
* protect user work;
* improve reliability;
* support continuous platform development.

Migration becomes an architectural responsibility of the Trusted Runtime rather than individual generated features.

---

# Trade-offs

## Benefits

* Durable user data.
* Safe platform evolution.
* Predictable upgrades.
* Rollback support.
* Better long-term maintainability.
* Strong compatibility guarantees.

## Drawbacks

* Increased runtime complexity.
* Migration infrastructure.
* Version coordination between platform components.

---

# Consequences

## Positive Consequences

* User-created information survives updates.
* Platform evolution becomes predictable.
* Feature upgrades remain controlled.
* Rollback protects against incompatible releases.
* Runtime maintains storage consistency.

## Negative Consequences

* Feature lifecycle becomes more sophisticated.
* Migration testing becomes a release requirement.

## Risks

* Incorrect migration logic could affect feature state.
* Complex version dependencies require careful validation.
* Long-term schema evolution requires disciplined version management.

---

# Future Considerations

Future platform versions may introduce:

* automated migration tooling;
* migration previews;
* schema compatibility reports;
* multi-version migration chains;
* richer state validation.

Regardless of future improvements, the following principles remain permanent:

* user data is durable;
* feature evolution must preserve compatibility;
* migrations occur before execution;
* rollback remains available when migration cannot be completed safely.

---

# References

* Master Execution Plan
* Feature State Migration Model
* Manifest Compatibility
* Bundle Artifact Model
* Storage Architecture
* Rollback Policy
* ADR-003 – Storage Boundary
* ADR-004 – Manifest Compatibility & Versioning
* ADR-010 – Bundle Delivery, Immutable Artifact & Cache Model

---

*End of ADR*
