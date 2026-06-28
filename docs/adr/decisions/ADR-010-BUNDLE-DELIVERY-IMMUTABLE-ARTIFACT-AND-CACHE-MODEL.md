# ADR-010: Bundle Delivery, Immutable Artifact & Cache Model

**Status:** Accepted

**Date:** 2026-06-28

**Version:** 1.0

**Authors:** Novus Core Team

**Reviewer(s):** Runtime Lead, AI Platform Lead

---

# Summary

Novus distributes AI-generated features as **immutable, content-addressed bundle artifacts** rather than executable source code.

Every bundle is validated, compiled, hashed, signed, cached locally, and verified before execution. Once published, an artifact is never modified. Any change produces a completely new version with a new identity.

This immutable delivery model enables deterministic execution, secure updates, rollback support, and strong integrity guarantees.

---

# Context

AI-generated applications evolve over time as prompts improve, bugs are fixed, capabilities expand, and runtime policies change.

If bundles were mutable, the runtime could no longer guarantee:

- what code is executing;
- whether an update is trusted;
- whether a cached artifact has changed;
- whether rollback is possible.

A deterministic delivery model is therefore required.

---

# Problem Statement

The platform requires a delivery mechanism that:

- guarantees artifact integrity;
- supports secure caching;
- enables rollback;
- prevents silent modification;
- separates source generation from runtime execution;
- allows reproducible validation.

Without immutable artifacts, the runtime cannot establish long-term execution trust.

---

# Decision

Every generated feature is transformed into an immutable bundle artifact.

Each artifact contains:

- compiled bundle;
- manifest;
- source hash;
- compiled hash;
- manifest hash;
- compiler version;
- validator version;
- dependency lock hash;
- creation metadata;
- optional expiration metadata;
- signing information.

Artifacts are stored using content-addressed identities.

Published artifacts are never modified.

Any change requires generation of a completely new artifact.

---

# Architecture Overview

```text
AI Generation
      │
      ▼
Validation Pipeline
      │
      ▼
Compilation
      │
      ▼
Hash Generation
      │
      ▼
Artifact Signing
      │
      ▼
Immutable Artifact
      │
      ▼
Verified Local Cache
      │
      ▼
Runtime Verification
      │
      ▼
Sandbox Mount
```

The runtime never executes an artifact that has not passed verification.

---

# Alternatives Considered

## Option A — Mutable Bundle Updates

### Advantages

- Simpler update process.
- Lower storage usage.
- Easier patching.

### Disadvantages

- Weak integrity guarantees.
- Difficult auditing.
- Rollback becomes unreliable.
- Cached artifacts lose identity.

---

## Option B — Runtime Recompilation

### Advantages

- Minimal storage.
- Always up-to-date.

### Disadvantages

- Slower startup.
- Repeated compilation.
- Non-deterministic execution.
- Difficult debugging.

---

## Option C — Immutable Content-Addressed Artifacts (Selected)

### Advantages

- Strong integrity guarantees.
- Deterministic execution.
- Reliable rollback.
- Efficient caching.
- Easier auditing.
- Reproducible validation.

### Disadvantages

- Additional storage.
- Version management.
- Artifact lifecycle management.

---

# Selected Approach

Every generated feature follows a fixed artifact lifecycle.

Source generation is followed by validation, compilation, hashing, signing, and caching.

The runtime identifies artifacts by their content rather than mutable version identifiers.

Execution is permitted only after integrity verification succeeds.

---

# Rationale

Immutability provides several architectural advantages.

It allows the runtime to:

- verify artifact identity;
- detect tampering;
- guarantee reproducible execution;
- cache safely;
- support explicit updates;
- preserve previous versions.

This model also separates generation from execution, allowing validation to occur once while execution remains deterministic.

---

# Trade-offs

## Benefits

- Deterministic execution.
- Strong integrity guarantees.
- Reliable rollback.
- Efficient local caching.
- Better diagnostics.
- Clear version history.

## Drawbacks

- Larger storage footprint.
- More sophisticated release pipeline.
- Additional artifact metadata.

---

# Consequences

## Positive Consequences

- Every executed bundle has a verifiable identity.
- Runtime validation becomes deterministic.
- Cached bundles remain trustworthy.
- Users can safely rollback to previous versions.
- Artifact history becomes auditable.

## Negative Consequences

- Minor feature changes require new artifacts.
- Cache management becomes an important runtime responsibility.

## Risks

- Incorrect hash calculation would invalidate execution.
- Signing infrastructure becomes a critical security dependency.
- Artifact compatibility must be preserved across runtime updates.

---

# Future Considerations

Future releases may introduce:

- incremental artifact distribution;
- stronger cryptographic signatures;
- enterprise signing infrastructure;
- remote artifact mirrors;
- improved cache eviction policies.

Regardless of future enhancements, the platform will preserve the following principle:

> **Published bundle artifacts are immutable. Any change produces a new artifact identity rather than modifying an existing one.**

---

# References

- Master Execution Plan
- Bundle Validation Pipeline
- Immutable Artifact Model
- Runtime Verification
- Cached Bundle Policy
- ADR-004 – Manifest Compatibility & Versioning
- ADR-005 – Generated Bundle Policy

---

_End of ADR_
