# ADR-004: Manifest Compatibility & Versioning

**Status:** Accepted

**Date:** 2026-06-28

**Version:** 1.0

**Authors:** Novus Core Team

**Reviewer(s):** Runtime Lead

---

# Summary

Every generated feature in Novus is defined by a versioned **Feature Manifest** that serves as the contract between AI generation, validation, and the trusted runtime.

The runtime never executes AI-generated bundles directly. Instead, it validates the accompanying manifest, verifies compatibility with the current platform, checks requested capabilities, and only then permits bundle execution.

This contract-first architecture separates **what a feature declares** from **how it is implemented**, enabling safe validation, long-term compatibility, and platform evolution.

---

# Context

Novus allows users to generate custom micro-apps using AI.

Generated code is inherently dynamic and may evolve as:

- prompts improve;
- AI providers change;
- SDKs expand;
- runtime capabilities grow;
- adapters evolve;
- security policies become stricter.

Without a stable contract, every generated bundle would become tightly coupled to a particular runtime implementation, making upgrades difficult and increasing the risk of incompatible or unsafe features.

---

# Problem Statement

The platform requires a mechanism that:

- describes feature capabilities before execution;
- validates generated output independently of implementation;
- survives SDK evolution;
- enables compatibility checks across platform versions;
- supports migrations without regenerating every feature;
- prevents generated code from requesting undeclared capabilities.

The runtime must understand a feature before trusting it.

---

# Decision

Every generated feature must include a versioned **Feature Manifest**.

The manifest acts as the authoritative contract describing:

- feature identity;
- schema version;
- supported adapters;
- compatible routes;
- requested capabilities;
- storage scope;
- UI surface;
- lifecycle triggers;
- data policy;
- generation mode.

Bundles are never trusted independently.

The runtime validates the manifest before allowing any feature to mount.

If validation fails, bundle execution is rejected.

---

# Architecture Overview

```text
User Prompt
      │
      ▼
Feature Planner
      │
      ▼
Feature Manifest
      │
      ▼
Manifest Validator
      │
      ▼
Compatibility Checks
      │
      ▼
Bundle Validation
      │
      ▼
Trusted Runtime
      │
      ▼
Sandbox Mount
```

The manifest becomes the shared language spoken by every major subsystem.

---

# Alternatives Considered

## Option A — Execute Generated Bundles Directly

### Advantages

- Simpler implementation.
- Fewer generated artifacts.
- Faster generation pipeline.

### Disadvantages

- Runtime cannot understand feature intent.
- Difficult capability validation.
- Weak security guarantees.
- No compatibility layer.
- Unsafe long-term evolution.

---

## Option B — Infer Feature Metadata from Bundle

### Advantages

- Single generated artifact.
- Reduced generation output.

### Disadvantages

- Requires complex static analysis.
- Metadata may be incomplete.
- Runtime decisions become less deterministic.
- Difficult to version consistently.

---

## Option C — Versioned Feature Manifest (Selected)

### Advantages

- Explicit contract.
- Stable validation layer.
- Version-aware runtime.
- Clear capability declaration.
- Easier migrations.
- Better debugging and diagnostics.

### Disadvantages

- Additional generated artifact.
- Slightly longer generation pipeline.
- Manifest schema must be maintained.

---

# Selected Approach

Novus adopts a contract-first architecture.

The Feature Manifest is treated as the canonical description of a feature.

Generated bundles become implementations of that contract rather than the contract itself.

This separation allows the runtime to reason about features without executing them.

---

# Rationale

Separating declarations from implementation provides several advantages.

The runtime can:

- validate capabilities;
- verify adapter compatibility;
- enforce permission boundaries;
- reject unsupported features;
- migrate schemas independently;
- explain failures before execution.

Because manifests are versioned, older features can continue functioning while newer runtime versions introduce additional capabilities.

This greatly reduces coupling between AI generation and runtime evolution.

---

# Trade-offs

## Benefits

- Strong contract between AI and runtime.
- Independent validation.
- Platform evolution without breaking existing features.
- Easier migrations.
- Better diagnostics.
- Safer execution.

## Drawbacks

- Additional schema maintenance.
- Manifest version management.
- Slightly more complex generation pipeline.

---

# Consequences

## Positive Consequences

- Every feature becomes self-describing.
- Runtime decisions become deterministic.
- Capability enforcement improves.
- Validation occurs before execution.
- Feature compatibility becomes measurable.

## Negative Consequences

- Every platform change must consider manifest compatibility.
- Migration infrastructure becomes necessary.

## Risks

- Poor schema design could limit future extensibility.
- Breaking schema changes require careful migration planning.
- Manifest validator becomes a critical runtime component.

---

# Future Considerations

Future platform versions may introduce additional manifest fields, richer SDK declarations, new capability categories, or improved compatibility rules.

All future evolution should preserve backward compatibility whenever practical through schema versioning and migration rather than invalidating existing features.

The Feature Manifest should remain the single source of truth describing every generated feature.

---

# References

- Master Execution Plan
- AI Generation Pipeline
- Feature Manifest Specification
- Bundle Validation Pipeline
- Platform Contracts
- ADR-002 – Sandboxed Runtime, CSP, Origin Isolation & Typed Bridge
- ADR-003 – Storage Boundary (chrome.storage vs IndexedDB)

---

_End of ADR_
