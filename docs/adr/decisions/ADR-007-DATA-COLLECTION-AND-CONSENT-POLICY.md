# ADR-007: Data Collection & Consent Policy

**Status:** Accepted

**Date:** 2026-06-28

**Version:** 1.0

**Authors:** Novus Core Team

**Reviewer(s):** Runtime Lead, Security Lead

---

# Summary

Novus adopts a **minimum-data, explicit-consent** collection model.

The platform collects only the data required for an approved feature, only from approved adapters, only after user approval where required, and only within declared capability boundaries.

Generated micro-apps never receive unrestricted access to websites, browser state, network traffic, or user accounts. Instead, they receive only normalized datasets approved by the Trusted Runtime.

---

# Context

Novus augments supported website workspaces by generating persistent AI-powered micro-applications.

These applications require contextual information to provide meaningful functionality. However, unrestricted website access would violate Novus' core principles of privacy, transparency, and least privilege.

Additionally, different websites expose information through different mechanisms, including semantic HTML, structured APIs, approved network projections, and manual input.

The platform therefore requires a unified policy governing how information is collected, normalized, approved, and exposed.

---

# Problem Statement

The platform must answer several critical questions:

* What information may be collected?
* Who decides what can be collected?
* How is user consent obtained?
* How are sensitive routes protected?
* How are datasets explained to users?
* How does the runtime guarantee data minimization?

Without a formal policy, collection behaviour would become inconsistent across adapters and generated features.

---

# Decision

Novus adopts a **capability-driven collection policy** based on four principles:

1. Minimum Necessary Data
2. Explicit User Consent
3. Approved Adapter Collection
4. Transparent Provenance

Data collection is permitted only when all required runtime conditions are satisfied.

Every collected dataset must include provenance describing:

* adapter
* adapter version
* collection source
* collection time
* completeness
* warnings

No generated bundle may initiate arbitrary website collection.

---

# Architecture Overview

```text
Supported Website
        │
        ▼
Reviewed Adapter
        │
        ▼
Collection Policy
        │
 ├── Permission Check
 ├── Sensitive Route Check
 ├── Capability Validation
 ├── Data Projection
 ├── Provenance Recording
 └── Coverage Evaluation
        │
        ▼
Workspace Dataset
        │
        ▼
Generated Feature
```

Collection decisions are always enforced by trusted runtime components.

Generated applications never bypass this workflow.

---

# Alternatives Considered

## Option A — Unrestricted Website Access

### Advantages

* Maximum flexibility.
* Minimal runtime logic.
* Easier implementation.

### Disadvantages

* Excessive permissions.
* Privacy concerns.
* Difficult auditing.
* Poor user trust.
* Incompatible with Novus' security model.

---

## Option B — Adapter Collection Without User Approval

### Advantages

* Simpler user experience.
* Less interaction.

### Disadvantages

* Reduced transparency.
* Weak consent model.
* Difficult compliance.
* Poor user confidence.

---

## Option C — Capability-Based Collection With Explicit Consent (Selected)

### Advantages

* Transparent permissions.
* Strong privacy guarantees.
* Predictable behaviour.
* Consistent enforcement.
* Better auditing.

### Disadvantages

* Additional permission workflow.
* More runtime validation.
* Slightly more complex implementation.

---

# Selected Approach

Every collection request must satisfy all runtime policies before data is accessed.

Collection decisions consider:

* active adapter;
* supported route;
* user permissions;
* requested capability;
* sensitive-context status;
* approved collection mode;
* declared projection;
* runtime policy.

Only normalized datasets are exposed to generated features.

Raw website data is never provided.

---

# Rationale

The value of Novus comes from helping users build better workflows—not from collecting as much website data as possible.

By enforcing minimum-data collection, the platform:

* reduces privacy risks;
* improves explainability;
* simplifies permission previews;
* supports deterministic runtime validation;
* enables stronger security guarantees;
* improves long-term user trust.

This philosophy is reflected throughout the runtime architecture.

---

# Trade-offs

## Benefits

* Explicit consent model.
* Strong privacy guarantees.
* Transparent data access.
* Easier auditing.
* Consistent adapter behaviour.
* Better user trust.

## Drawbacks

* Additional permission dialogs.
* More validation logic.
* Reduced flexibility compared to unrestricted browser extensions.

---

# Consequences

## Positive Consequences

* Users understand exactly what data is accessed.
* Features receive only approved datasets.
* Sensitive information remains protected.
* Adapters become easier to review and maintain.
* Provenance and coverage become reliable platform features.

## Negative Consequences

* Some advanced workflows require additional user approval.
* Adapter development requires explicit data declarations.

## Risks

* Incorrect adapter declarations could expose incomplete datasets.
* Poor permission wording could confuse users.
* Runtime policy bugs could incorrectly deny legitimate requests.

---

# Future Considerations

Future releases may introduce additional collection mechanisms, including official APIs, richer adapter projections, and cloud-backed integrations.

Regardless of future capabilities, every collection mechanism must preserve the principles established by this ADR:

* minimum necessary data;
* explicit user understanding;
* reviewed adapter ownership;
* transparent provenance;
* capability-based access.

These principles remain fundamental to Novus' privacy and security model.

---

# References

* Master Execution Plan
* Data Source Strategy & Adapter Resilience
* Dataset Provenance
* Data Projection Layer
* Sensitive Context Firewall
* AI Generation Pipeline
* ADR-006 – Adapter Contract & Maturity Levels

---

*End of ADR*
