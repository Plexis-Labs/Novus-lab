# ADR-006: Adapter Contract & Maturity Levels

**Status:** Accepted

**Date:** 2026-06-28

**Version:** 1.0

**Authors:** Novus Core Team

**Reviewer(s):** Runtime Lead, Adapter Lead

---

# Summary

Novus adopts a contract-based adapter architecture where every supported website is represented by a reviewed adapter with explicitly declared capabilities, supported routes, entity schemas, data sources, and maturity levels.

Adapters are the only trusted components permitted to understand website structure and transform website data into normalized workspace entities. AI-generated micro-apps never access websites directly; they operate exclusively on adapter-approved data exposed through the runtime.

---

# Context

Modern websites evolve continuously. HTML structures change, CSS class names are regenerated, APIs evolve, and accessibility metadata may vary between releases.

Building generated applications directly against live website structures would tightly couple AI-generated code to unstable implementation details and create unacceptable security and maintenance risks.

Novus instead introduces a stable abstraction layer—the **Site Adapter**.

An adapter understands a supported website, extracts only approved information, normalizes it into workspace entities, and exposes only those entities through the trusted runtime.

This creates a clear separation between:

* Website-specific implementation.
* Trusted runtime services.
* AI-generated application logic.

---

# Problem Statement

The platform requires a mechanism that:

* Supports multiple websites with different structures.
* Shields generated applications from website implementation changes.
* Enforces minimum-data principles.
* Defines supported capabilities explicitly.
* Allows controlled evolution of website integrations.
* Supports diagnostics, testing, and long-term maintenance.

Without a formal adapter contract, every generated feature would become coupled to fragile website structures.

---

# Decision

Every supported website integration shall be implemented as a versioned **Site Adapter**.

Each adapter must explicitly define:

* Supported routes.
* Entity schemas.
* Available capabilities.
* Approved data sources.
* Collection policies.
* Health status.
* Version information.
* Diagnostics.
* Fixture coverage.
* Maturity level.

Generated micro-apps communicate only with normalized adapter entities exposed by the trusted runtime.

Adapters become the single source of truth for website understanding.

---

# Architecture Overview

```text
Supported Website
        │
        ▼
Site Adapter
        │
 ├── Route Detection
 ├── Entity Extraction
 ├── Data Normalization
 ├── Capability Declaration
 ├── Provenance Recording
 └── Health Monitoring
        │
        ▼
Workspace Dataset
        │
        ▼
Trusted Runtime
        │
        ▼
Generated Micro-App
```

Website knowledge exists only inside the adapter.

Generated applications never parse HTML, inspect network traffic, or understand page structure directly.

---

# Alternatives Considered

## Option A — Generated Code Reads Website Directly

### Advantages

* Simple architecture.
* No adapter layer.
* Maximum flexibility.

### Disadvantages

* Fragile against website updates.
* Impossible to enforce data boundaries.
* Security concerns.
* Difficult testing.
* Poor maintainability.

---

## Option B — Generic DOM Extraction Engine

### Advantages

* Less adapter code.
* Easier initial implementation.

### Disadvantages

* Poor reliability.
* No semantic understanding.
* Difficult permission model.
* Weak diagnostics.
* Site-specific behaviour still required.

---

## Option C — Contract-Based Site Adapters (Selected)

### Advantages

* Stable abstraction.
* Strong security boundary.
* Explicit contracts.
* Better testing.
* Versioned evolution.
* Clear ownership.

### Disadvantages

* Initial implementation effort.
* Adapter maintenance.
* Additional review process.

---

# Selected Approach

Each supported website is represented by a reviewed adapter that owns website-specific knowledge.

Adapters declare:

* supported entities;
* extraction methods;
* approved data sources;
* route compatibility;
* diagnostics;
* health state;
* collection capabilities.

The runtime interacts only with adapter contracts, allowing generated applications to remain independent of website implementation details.

---

# Rationale

Adapters provide the foundation for Novus' minimum-data philosophy.

Rather than exposing raw website structures, adapters transform website-specific information into normalized entities with known semantics.

This enables:

* stable SDK APIs;
* deterministic permissions;
* capability validation;
* provenance tracking;
* automated testing;
* adapter repair workflows;
* independent website evolution.

The adapter becomes the boundary between the external web and the internal Novus platform.

---

# Trade-offs

## Benefits

* Stable website abstraction.
* Improved resilience.
* Better diagnostics.
* Explicit capability boundaries.
* Independent adapter evolution.
* Strong testing model.

## Drawbacks

* Ongoing adapter maintenance.
* Initial implementation cost.
* Additional version management.

---

# Consequences

## Positive Consequences

* Website changes are localized to adapters.
* Generated features remain portable.
* Runtime policies become deterministic.
* Diagnostics and health monitoring become possible.

## Negative Consequences

* Every supported website requires adapter development.
* Adapter quality directly affects feature reliability.

## Risks

* Poorly maintained adapters may degrade user experience.
* Adapter version drift requires compatibility management.
* New websites require explicit onboarding and review.

---

# Future Considerations

Future platform versions may expand adapter capabilities through additional maturity levels, richer diagnostics, improved repair automation, and broader data-source support.

Regardless of future enhancements, adapters will remain the only trusted components responsible for interpreting website structure and exposing normalized entities to generated applications.

---

# References

* Master Execution Plan
* Data Source Strategy & Adapter Resilience
* Adapter Maintenance Model
* Dataset Provenance
* Workspace Engine
* AI Context Builder
* ADR-005 – Generated Bundle Policy

---

*End of ADR*
