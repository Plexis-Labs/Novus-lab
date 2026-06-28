# ADR-013: Data Minimization & Content Handling Policy

**Status:** Accepted

**Date:** 2026-06-28

**Version:** 1.0

**Authors:** Novus Core Team

**Reviewer(s):** Security Lead, Runtime Lead

---

# Summary

Novus adopts a **minimum-data architecture** where every feature receives only the smallest approved dataset required to perform its intended function.

The Trusted Runtime is responsible for enforcing data minimization through adapter-defined projections, capability validation, provenance tracking, and content handling policies.

Neither AI models nor generated micro-apps receive unrestricted access to website content, browser state, or user information.

---

# Context

Novus augments supported websites by generating contextual micro-apps.

These features require structured information about the current workspace to function correctly.

However, unrestricted website access would conflict with Novus' security, privacy, and transparency goals.

The platform therefore distinguishes between:

* raw website data;
* normalized workspace entities;
* approved projections;
* feature-specific datasets.

Every stage of the platform is designed to reduce unnecessary information exposure.

---

# Problem Statement

The platform must answer several fundamental questions:

* What information may be collected?
* Who decides which fields are available?
* What information is sent to AI services?
* What information is exposed to generated bundles?
* How are users informed about data usage?
* How are sensitive fields protected?

Without explicit data minimization policies, features could gradually accumulate unnecessary access to user data.

---

# Decision

Novus adopts a **projection-first data model**.

Adapters expose only normalized entities rather than raw website structures.

Every feature declares the information it requires through its Feature Manifest.

The Trusted Runtime grants access only to approved fields that satisfy the requested capability.

Information outside the approved projection is discarded immediately and is never exposed to generated code.

Where AI services are involved, only explicitly approved contextual information is transmitted.

---

# Architecture Overview

```text
Supported Website
        │
        ▼
Reviewed Adapter
        │
        ▼
Normalized Entity Model
        │
        ▼
Projection Engine
        │
        ├── Capability Validation
        ├── Data Projection
        ├── Provenance
        ├── Coverage
        └── Permission Preview
        │
        ▼
Generated Feature
```

Raw website structures remain inside trusted runtime components.

Generated features operate exclusively on approved projections.

---

# Alternatives Considered

## Option A — Full Website Exposure

### Advantages

* Maximum flexibility.
* Minimal runtime processing.
* Simplified feature generation.

### Disadvantages

* Excessive permissions.
* Poor privacy.
* Difficult auditing.
* Weak security.
* Reduced user trust.

---

## Option B — Runtime Filtering After Collection

### Advantages

* Easier adapter implementation.
* Flexible feature development.

### Disadvantages

* Unnecessary information is still collected.
* Larger attack surface.
* Harder to reason about privacy guarantees.

---

## Option C — Projection-First Data Architecture (Selected)

### Advantages

* Strong privacy guarantees.
* Explicit permissions.
* Smaller attack surface.
* Better explainability.
* Consistent runtime behaviour.
* Easier compliance with minimum-data principles.

### Disadvantages

* Additional adapter declarations.
* Projection maintenance.
* More runtime validation.

---

# Selected Approach

Data enters the platform only through reviewed adapters.

Adapters declare:

* approved data sources;
* supported entities;
* available fields;
* excluded fields;
* collection scope;
* provenance information.

The runtime projects only the fields required by the active feature.

Generated bundles never receive:

* raw DOM;
* arbitrary network responses;
* browser credentials;
* cookies;
* authorization headers;
* framework-private state;
* unrestricted page content.

---

# Rationale

Data minimization is a fundamental architectural principle rather than an implementation optimization.

Reducing available information:

* improves security;
* strengthens privacy;
* simplifies permissions;
* improves transparency;
* reduces accidental data exposure;
* enables deterministic capability enforcement.

The goal of Novus is not to collect the most data possible.

The goal is to provide sufficient information for a feature while exposing nothing more.

---

# Trade-offs

## Benefits

* Smaller attack surface.
* Better privacy.
* Easier auditing.
* Predictable permissions.
* Improved user trust.
* Consistent runtime enforcement.

## Drawbacks

* Richer features may require additional adapter work.
* Projection schemas require maintenance.
* Runtime validation becomes more sophisticated.

---

# Consequences

## Positive Consequences

* Generated features operate on normalized data only.
* AI services receive only explicitly approved context.
* Sensitive information remains protected by default.
* Permission previews accurately describe accessed information.
* Provenance and coverage remain reliable.

## Negative Consequences

* Some feature ideas may require additional adapter capabilities.
* Adapter developers must explicitly model available fields.

## Risks

* Incorrect projection definitions may deny legitimate feature requests.
* Poor adapter schemas may reduce feature usefulness.
* Future platform capabilities must preserve minimum-data guarantees.

---

# Future Considerations

Future platform versions may support:

* richer projection languages;
* additional official integrations;
* improved dataset composition;
* more granular field-level permissions.

Regardless of future enhancements, the following architectural principles remain permanent:

* collect only what is necessary;
* expose only approved projections;
* preserve provenance;
* maintain explicit user understanding;
* never expose unrestricted website data to generated features or AI models.

---

# References

* Master Execution Plan
* Data Source Strategy & Adapter Resilience
* Data Projection Layer
* Dataset Provenance
* Content Handling Policy
* AI Generation Pipeline
* ADR-006 – Adapter Contract & Maturity Levels
* ADR-007 – Data Collection & Consent Policy

---

*End of ADR*
