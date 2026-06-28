# ADR-005: Generated Bundle Policy

**Status:** Accepted

**Date:** 2026-06-28

**Version:** 1.0

**Authors:** Novus Core Team

**Reviewer(s):** Runtime Lead

---

# Summary

AI-generated React applications are treated as **untrusted source code** until they successfully complete Novus' validation pipeline.

Every generated bundle must pass static analysis, compilation, manifest compatibility checks, artifact signing, and runtime verification before it is eligible for execution.

Execution trust is earned through validation—not assumed because the code was produced by an AI model.

---

# Context

One of Novus' defining capabilities is generating custom React micro-apps from natural language.

While modern language models produce increasingly reliable code, generated output remains probabilistic.

Generated code may contain:

- unexpected APIs;
- undeclared capabilities;
- unsafe browser interactions;
- compilation failures;
- incompatible dependencies;
- security violations.

The runtime therefore cannot execute model output directly.

---

# Problem Statement

The platform requires a repeatable process that guarantees:

- generated code follows platform rules;
- only approved APIs are used;
- browser security boundaries remain intact;
- capabilities match the approved manifest;
- artifacts remain immutable after validation;
- execution is deterministic.

Trust must be established before execution.

---

# Decision

Novus introduces a multi-stage bundle validation pipeline.

Every generated bundle passes through the following stages before execution:

1. AST Static Analysis
2. Compilation
3. Manifest Compatibility Verification
4. Artifact Signing
5. Runtime Mount Verification

Failure at any stage immediately rejects the bundle.

Only validated artifacts may execute.

---

# Architecture Overview

```text
AI Generated Source
        │
        ▼
AST Validation
        │
        ▼
Compilation
        │
        ▼
Manifest Compatibility
        │
        ▼
Artifact Signing
        │
        ▼
Verified Artifact Cache
        │
        ▼
Runtime Verification
        │
        ▼
Sandbox Execution
```

The runtime never executes raw model output.

It executes only verified artifacts.

---

# Alternatives Considered

## Option A — Execute AI Output Directly

### Advantages

- Very simple architecture.
- Faster generation.
- Lower infrastructure cost.

### Disadvantages

- No security guarantees.
- No capability validation.
- Impossible to establish execution trust.
- High risk of unsafe code.

---

## Option B — Compile Without Validation

### Advantages

- Faster build pipeline.
- Reduced implementation effort.

### Disadvantages

- Compilation alone does not guarantee safety.
- Unsafe APIs remain possible.
- No policy enforcement.

---

## Option C — Multi-Stage Validation Pipeline (Selected)

### Advantages

- Strong security guarantees.
- Deterministic execution.
- Clear validation failures.
- Supports immutable artifacts.
- Enables secure rollback.

### Disadvantages

- Longer generation pipeline.
- More infrastructure.
- Additional maintenance.

---

# Selected Approach

Generated bundles are considered source artifacts.

Only after completing every validation stage does a bundle become a trusted executable artifact.

Each validation stage is responsible for a distinct concern:

- AST analysis validates source.
- Compiler validates build correctness.
- Manifest validator enforces declared capabilities.
- Artifact signing guarantees integrity.
- Runtime verification confirms execution safety.

No stage replaces another.

Together they establish trust.

---

# Rationale

Separating validation into multiple independent stages improves both security and maintainability.

Each stage has one responsibility.

This allows:

- independent testing;
- clearer diagnostics;
- easier future improvements;
- defense in depth.

Rather than relying on any single validation mechanism, Novus combines multiple layers that collectively determine whether execution is permitted.

---

# Trade-offs

## Benefits

- Strong security posture.
- Deterministic execution.
- Immutable executable artifacts.
- Easier debugging.
- Better rollback support.
- Independent validation layers.

## Drawbacks

- Increased complexity.
- Longer generation time.
- Additional infrastructure requirements.
- Higher maintenance effort.

---

# Consequences

## Positive Consequences

- Unsafe bundles never execute.
- Validation failures are explainable.
- Artifact integrity becomes verifiable.
- Future validation stages can be introduced independently.

## Negative Consequences

- Bundle generation requires additional compute.
- Validation infrastructure becomes a critical platform component.

## Risks

- Validator bugs could incorrectly reject valid bundles.
- Weak validation rules could permit unsafe execution.
- Platform evolution requires validator updates.

---

# Future Considerations

Future releases may expand validation with:

- accessibility analysis;
- performance budgets;
- memory budgets;
- UI quality scoring;
- automated repair suggestions;
- model evaluation metrics.

These enhancements should extend the validation pipeline without weakening its fundamental principle:

> **No AI-generated code executes until it has been independently validated and converted into a trusted artifact.**

---

# References

- Master Execution Plan
- Bundle Validation Pipeline
- AI Generation Pipeline
- Artifact Signing
- Runtime Mount Verification
- ADR-002 – Sandboxed Runtime, CSP, Origin & Bridge Model
- ADR-004 – Manifest Compatibility & Versioning

---

_End of ADR_
