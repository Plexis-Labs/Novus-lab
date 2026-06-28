# ADR-021: AI Provider Abstraction & Evaluation Policy

**Status:** Accepted

**Date:** 2026-06-28

**Version:** 1.0

**Authors:** Novus Core Team

**Reviewer(s):** AI Platform Lead, Runtime Lead

---

# Summary

Novus adopts a provider-independent AI architecture in which all AI interactions pass through a unified generation pipeline rather than integrating directly with individual model providers.

Prompt construction, planning, context preparation, provider selection, validation, evaluation, repair, and artifact generation remain responsibilities of the Novus platform. AI providers function only as interchangeable execution engines within this controlled pipeline.

This separation allows the platform to evolve independently of any specific language model while preserving consistent quality, security, and runtime behaviour.

---

# Context

AI generation is one of Novus' defining capabilities.

The platform uses AI to:

* generate new Labs;
* repair generated code;
* analyze validation failures;
* improve developer workflows;
* assist future platform capabilities.

The language model itself, however, is only one stage of a much larger generation system.

Reliable Lab generation requires:

* structured planning;
* controlled context assembly;
* provider routing;
* deterministic validation;
* artifact verification;
* automated evaluation;
* repair workflows.

The platform therefore requires an architecture that treats AI providers as replaceable infrastructure rather than core platform logic.

---

# Problem Statement

The generation system must ensure that:

* providers can be replaced without redesigning the platform;
* prompt construction remains deterministic;
* quality remains measurable;
* generation failures can be repaired;
* security policies remain provider-independent;
* costs remain controllable;
* runtime artifacts satisfy platform requirements regardless of the underlying model.

Without abstraction, platform behaviour would become tightly coupled to individual AI providers and model capabilities.

---

# Decision

Novus introduces a provider-independent AI generation pipeline.

Every generation request follows the same lifecycle:

1. Feature planning.
2. Context preparation.
3. Sensitive Context Firewall validation.
4. Prompt construction.
5. Provider selection.
6. Model execution.
7. Bundle validation.
8. Evaluation.
9. Repair (if required).
10. Immutable artifact generation.

The Trusted Runtime and AI Platform own this workflow.

AI providers execute only the inference stage.

---

# Architecture Overview

```text
User Request
      │
      ▼
Feature Planner
      │
      ▼
Context Builder
      │
      ▼
Sensitive Context Firewall
      │
      ▼
Prompt Builder
      │
      ▼
Provider Router
      │
      ▼
AI Provider
      │
      ▼
Generated Source
      │
      ▼
Validation Pipeline
      │
      ▼
Evaluation Harness
      │
      ▼
Repair Pipeline
      │
      ▼
Verified Artifact
```

The provider is one component within the pipeline rather than the pipeline itself.

---

# Alternatives Considered

## Option A — Direct Provider Integration

### Advantages

* Simple implementation.
* Minimal abstraction.
* Faster initial development.

### Disadvantages

* Strong vendor lock-in.
* Difficult provider migration.
* Inconsistent quality controls.
* Platform logic becomes provider-specific.

---

## Option B — Provider-Specific Generation Pipelines

### Advantages

* Model-specific optimization.
* Flexible prompts.

### Disadvantages

* Duplicate infrastructure.
* Difficult maintenance.
* Inconsistent behaviour.
* Increased operational complexity.

---

## Option C — Unified Provider Abstraction (Selected)

### Advantages

* Provider independence.
* Consistent generation lifecycle.
* Unified validation.
* Centralized evaluation.
* Easier experimentation.
* Better long-term maintainability.

### Disadvantages

* Additional orchestration.
* More platform infrastructure.
* Provider adapters require maintenance.

---

# Selected Approach

Novus separates **generation orchestration** from **model execution**.

The platform owns:

* planning;
* prompt construction;
* context preparation;
* validation;
* evaluation;
* repair;
* artifact production.

AI providers are responsible only for producing candidate outputs.

Every provider is evaluated using the same validation and quality standards before artifacts are accepted.

---

# Rationale

Language models evolve rapidly.

Coupling the architecture to one provider would make future improvements unnecessarily expensive and reduce platform flexibility.

Provider abstraction enables Novus to:

* compare providers objectively;
* route requests according to capability or cost;
* introduce new models incrementally;
* preserve consistent runtime behaviour;
* improve generation quality independently of model vendors.

This architecture also ensures that platform security policies remain under Novus' control rather than becoming dependent on provider-specific features.

---

# Trade-offs

## Benefits

* Provider independence.
* Consistent validation.
* Objective evaluation.
* Easier experimentation.
* Better cost management.
* Improved long-term maintainability.

## Drawbacks

* Additional orchestration layer.
* More infrastructure to maintain.
* Provider adapters require ongoing updates.

---

# Consequences

## Positive Consequences

* AI providers become replaceable components.
* Platform quality remains measurable.
* Validation remains consistent across providers.
* Repair workflows become standardized.
* Cost and performance can be optimized independently of runtime architecture.

## Negative Consequences

* Generation pipeline becomes more sophisticated.
* Provider integration requires adapter development.
* Evaluation infrastructure becomes a critical platform dependency.

## Risks

* Evaluation metrics must evolve with platform capabilities.
* Provider API changes require maintenance.
* Poor routing policies could affect generation quality or operational costs.

---

# Future Considerations

Future platform versions may introduce:

* additional commercial and open-weight providers;
* local inference backends;
* capability-based model routing;
* automated provider benchmarking;
* continuous evaluation datasets;
* adaptive cost-aware routing.

Regardless of future enhancements, the following architectural principles remain permanent:

* providers remain interchangeable;
* prompt construction remains platform-owned;
* validation is mandatory;
* evaluation precedes acceptance;
* only verified artifacts become executable Labs.

---

# References

* AI Architecture Appendix
* AI Provider Abstraction
* Generation Pipeline
* Planner Pipeline
* Context Builder
* Evaluation Harness
* Repair Pipeline
* Cost Control Strategy
* Bundle Validation Pipeline
* Master Execution Plan
* ADR-005 – Generated Bundle Policy
* ADR-019 – Sensitive Context Firewall
* ADR-020 – Action Capability Model

---

*End of ADR*
