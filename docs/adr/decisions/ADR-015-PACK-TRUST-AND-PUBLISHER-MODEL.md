# ADR-015: Pack Trust & Publisher Model

**Status:** Accepted

**Date:** 2026-06-28

**Version:** 1.0

**Authors:** Novus Core Team

**Reviewer(s):** Security Lead, Runtime Lead

---

# Summary

Novus adopts a publisher-centric trust model in which every distributed pack, adapter, or feature artifact carries explicit trust metadata describing its origin, review status, permissions, compatibility, and version history.

Trust is established through transparent publication and verification rather than by assuming that all generated artifacts are equally trustworthy.

This enables users to understand who produced an artifact, how it was reviewed, and what level of confidence the platform assigns to it.

---

# Context

Novus supports multiple categories of distributable artifacts, including:

- official platform components;
- official adapters;
- community adapters;
- generated feature packs;
- local experimental packs.

Each category has different security expectations and operational guarantees.

Without an explicit trust model, users would be unable to distinguish between reviewed platform components and experimental local content.

---

# Problem Statement

The platform requires a mechanism that:

- communicates artifact trust clearly;
- distinguishes reviewed and unreviewed content;
- supports community contributions safely;
- enables secure updates;
- allows rollback;
- preserves user confidence.

Trust must become an explicit architectural property rather than an implicit assumption.

---

# Decision

Every distributable artifact shall include publisher and trust metadata.

At minimum, each published pack records:

- publisher identity;
- artifact version;
- supported platform versions;
- requested capabilities;
- review status;
- trust level;
- compatibility range;
- publication history;
- rollback information.

The Trusted Runtime uses this metadata when evaluating installation, updates, and compatibility.

---

# Architecture Overview

```text id="tvu0hf"
Publisher
      │
      ▼
Pack Publication
      │
      ▼
Trust Metadata
      │
      ├── Publisher
      ├── Version
      ├── Permissions
      ├── Review Status
      ├── Compatibility
      ├── Trust Level
      └── History
      │
      ▼
Trusted Runtime
      │
      ▼
Installation & Update Decisions
```

Trust information accompanies the artifact throughout its lifecycle.

---

# Alternatives Considered

## Option A — No Publisher Information

### Advantages

- Simpler metadata.
- Minimal publication requirements.

### Disadvantages

- Poor transparency.
- Weak accountability.
- Difficult debugging.
- Reduced user trust.

---

## Option B — Trust Every Artifact Equally

### Advantages

- Simple installation model.
- No review distinctions.

### Disadvantages

- Unsafe ecosystem.
- Difficult security auditing.
- Experimental content appears equivalent to reviewed content.
- Increased platform risk.

---

## Option C — Publisher-Based Trust Model (Selected)

### Advantages

- Transparent ecosystem.
- Clear review status.
- Better security.
- User confidence.
- Controlled community growth.
- Strong compatibility management.

### Disadvantages

- Additional publication metadata.
- Registry maintenance.
- Publisher verification process.

---

# Selected Approach

Trust is determined by the artifact's provenance rather than its functionality.

Official artifacts, reviewed community contributions, and experimental local packs remain separate trust categories.

The runtime evaluates trust metadata before installation, updates, and execution, allowing users to make informed decisions while preserving the integrity of the platform.

---

# Rationale

Generated software should not automatically inherit trust.

Instead, users should understand:

- who produced it;
- whether it has been reviewed;
- which platform versions it supports;
- what permissions it requests;
- how it has evolved over time.

This approach supports Novus' broader philosophy of transparent security and explicit user consent.

Trust therefore becomes observable, reviewable, and auditable.

---

# Trade-offs

## Benefits

- Clear artifact provenance.
- Strong user confidence.
- Transparent review process.
- Better compatibility management.
- Safer community ecosystem.
- Improved operational governance.

## Drawbacks

- Additional registry infrastructure.
- More publication metadata.
- Increased release management responsibilities.

---

# Consequences

## Positive Consequences

- Users understand the origin of every installed artifact.
- Official and experimental content remain clearly separated.
- Compatibility becomes easier to evaluate.
- Rollback history remains traceable.
- Platform governance improves as the ecosystem grows.

## Negative Consequences

- Community publication requires additional review workflows.
- Publisher metadata must be maintained throughout the artifact lifecycle.

## Risks

- Weak publisher verification could reduce confidence in the ecosystem.
- Registry maintenance becomes an ongoing operational responsibility.
- Trust communication must remain clear to avoid user confusion.

---

# Future Considerations

Future platform versions may introduce:

- verified publisher identities;
- publisher reputation systems;
- enterprise signing authorities;
- automated compatibility certification;
- richer trust visualization within the user interface.

Regardless of future improvements, the following principles remain permanent:

- trust is explicit;
- publisher identity is transparent;
- review status is visible;
- installation decisions remain informed by trust metadata rather than assumptions.

---

# References

- Master Execution Plan
- Pack Trust & Publisher Model
- Lab Distribution Policy
- Signed Community Adapter Registry
- Adapter Maintenance Model
- Artifact Distribution
- ADR-009 – Lab Distribution Policy
- ADR-010 – Bundle Delivery, Immutable Artifact & Cache Model

---

_End of ADR_
