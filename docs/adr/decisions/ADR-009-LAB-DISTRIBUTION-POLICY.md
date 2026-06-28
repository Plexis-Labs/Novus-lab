# ADR-009: Lab Distribution Policy

**Status:** Accepted

**Date:** 2026-06-28

**Version:** 1.0

**Authors:** Novus Core Team

**Reviewer(s):** Product Lead, Security Lead

---

# Summary

Novus adopts a staged distribution model that prioritizes security, transparency, and controlled platform evolution over unrestricted feature distribution.

Platform releases, generated feature packs, and adapters follow different trust models. Every distributable artifact has a clearly defined origin, review process, trust level, and update policy.

The platform intentionally favors trusted distribution over unrestricted extensibility.

---

# Context

Novus is not a traditional browser extension with static functionality.

Instead, it supports multiple categories of distributable artifacts:

* Platform releases
* Generated feature bundles
* Official adapters
* Community adapters
* Experimental local packs

Each category carries different security implications and therefore requires different installation and update policies.

Without clear distribution rules, users would be unable to determine which artifacts are trusted, reviewed, or experimental.

---

# Problem Statement

The platform requires a distribution strategy that:

* distinguishes trusted and untrusted artifacts;
* allows experimentation without compromising security;
* supports community contributions;
* provides clear upgrade paths;
* preserves user trust;
* enables future ecosystem growth.

Distribution policies must balance openness with platform integrity.

---

# Decision

Novus adopts a **layered trust distribution model**.

Artifacts are classified according to their origin and review status.

The primary distribution categories are:

* Official Platform Releases
* Official Adapters
* Community Adapters
* Local Experimental Packs

Each category follows independent review, signing, installation, and update policies.

Users are always informed of an artifact's trust level before installation.

---

# Architecture Overview

```text
Novus Platform
      │
      ├───────────────┐
      │               │
      ▼               ▼
Official         Community
Artifacts        Artifacts
      │               │
 Signed        Reviewed Registry
      │               │
      └───────┬───────┘
              │
              ▼
      Local Installation
              │
              ▼
        Trusted Runtime
```

Every installed artifact retains metadata describing:

* publisher;
* version;
* review status;
* compatibility;
* permissions;
* trust level.

---

# Alternatives Considered

## Option A — Completely Open Distribution

### Advantages

* Maximum flexibility.
* Minimal infrastructure.
* Easy community experimentation.

### Disadvantages

* Weak trust model.
* Difficult security review.
* Increased risk of unsafe artifacts.
* Poor user confidence.

---

## Option B — Official Distribution Only

### Advantages

* Maximum security.
* Centralized quality control.
* Predictable platform behaviour.

### Disadvantages

* Limited ecosystem growth.
* Reduced community participation.
* Slower innovation.

---

## Option C — Layered Trust Distribution (Selected)

### Advantages

* Strong security.
* Community extensibility.
* Transparent trust model.
* Clear review process.
* Controlled experimentation.

### Disadvantages

* More complex release process.
* Registry maintenance.
* Additional metadata requirements.

---

# Selected Approach

The Novus ecosystem distinguishes artifacts by trust rather than functionality.

Official platform components are developed, reviewed, signed, and distributed by the core team.

Community contributions require review before becoming trusted artifacts.

Experimental packs remain local by default and operate under additional runtime restrictions.

This separation allows innovation without weakening platform security.

---

# Rationale

Trust should be explicit.

Users should always know:

* who created an artifact;
* whether it has been reviewed;
* what permissions it requires;
* which platform version it targets;
* whether updates are verified.

Separating distribution policy from execution policy also allows the runtime to apply different restrictions based on artifact trust level.

---

# Trade-offs

## Benefits

* Transparent ecosystem.
* Better user trust.
* Safer community contributions.
* Clear upgrade path.
* Controlled experimentation.
* Strong release governance.

## Drawbacks

* Registry maintenance.
* Additional review effort.
* More release metadata.

---

# Consequences

## Positive Consequences

* Artifact origin becomes auditable.
* Community ecosystem can evolve safely.
* Platform releases remain predictable.
* Trust becomes visible rather than implied.

## Negative Consequences

* Community publishing requires additional review.
* Experimental artifacts have limited capabilities.

## Risks

* Registry maintenance becomes an ongoing responsibility.
* Poor trust communication could confuse users.
* Publisher verification processes may evolve over time.

---

# Future Considerations

Future platform versions may introduce:

* signed community registries;
* publisher reputation systems;
* automated compatibility verification;
* richer artifact metadata;
* enterprise distribution channels.

Regardless of future distribution mechanisms, the platform will preserve the principle that **artifact trust is determined by origin, review, and verification—not by functionality alone.**

---

# References

* Master Execution Plan
* Release Strategy
* Pack Registry
* Adapter Maintenance Model
* Community Adapter Registry
* Local Experimental Adapters
* ADR-005 – Generated Bundle Policy
* ADR-008 – Adapter Repair Policy

---

*End of ADR*
