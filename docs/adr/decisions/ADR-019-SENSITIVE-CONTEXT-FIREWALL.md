# ADR-019: Sensitive Context Firewall

**Status:** Accepted

**Date:** 2026-06-28

**Version:** 1.0

**Authors:** Novus Core Team

**Reviewer(s):** Security Lead, AI Platform Lead

---

# Summary

Novus establishes a **Sensitive Context Firewall** as the sole authority responsible for determining what information may be transmitted to AI services.

Neither generated Labs, adapters, nor runtime SDKs communicate directly with AI providers. Instead, all AI-bound context is assembled, filtered, projected, and validated by the Trusted Runtime before leaving the user's device.

This architecture ensures that AI services receive only explicitly approved, minimum-necessary context while preserving privacy, transparency, and user trust.

---

# Context

Many Novus capabilities rely on AI models to generate Labs, explain content, summarize information, or assist users.

These operations require contextual information from supported websites.

However, unrestricted context transmission would violate several core architectural principles:

- minimum-data collection;
- capability-based permissions;
- transparent user consent;
- adapter ownership;
- provenance tracking.

The platform therefore requires a centralized policy governing every piece of information transmitted to external AI providers.

---

# Problem Statement

The runtime must guarantee that:

- AI providers receive only approved information;
- generated Labs cannot bypass runtime policies;
- sensitive website content remains protected;
- prompt construction remains deterministic;
- user consent is respected;
- transmitted context is explainable and auditable.

Without a centralized firewall, context handling would become inconsistent and difficult to secure.

---

# Decision

Novus introduces a **Sensitive Context Firewall** positioned between the Trusted Runtime and every external AI provider.

The firewall is responsible for:

- validating requested capabilities;
- evaluating user permissions;
- selecting approved datasets;
- applying projection rules;
- removing restricted fields;
- enforcing size limits;
- preserving provenance;
- constructing the final AI context package.

No runtime component may communicate directly with an AI provider without passing through this firewall.

---

# Architecture Overview

```text
Generated Lab
        │
        ▼
Trusted Runtime
        │
        ▼
Sensitive Context Firewall
        │
 ├── Capability Validation
 ├── Permission Evaluation
 ├── Dataset Projection
 ├── Sensitive Field Removal
 ├── Provenance Recording
 ├── Context Size Validation
 └── Prompt Context Builder
        │
        ▼
Approved AI Request
        │
        ▼
AI Provider
```

The firewall becomes the single gateway between local browser data and external AI systems.

---

# Alternatives Considered

## Option A — Direct AI Provider Access

### Advantages

- Simple implementation.
- Minimal runtime processing.
- Flexible prompt construction.

### Disadvantages

- No centralized security policy.
- Difficult auditing.
- High privacy risk.
- Weak permission enforcement.
- Inconsistent context handling.

---

## Option B — Adapter-Controlled Prompt Construction

### Advantages

- Less runtime logic.
- Adapter-specific optimization.

### Disadvantages

- Inconsistent behaviour.
- Duplicated security policies.
- Difficult maintenance.
- Weak platform governance.

---

## Option C — Central Sensitive Context Firewall (Selected)

### Advantages

- Consistent security policy.
- Deterministic prompt construction.
- Strong privacy guarantees.
- Better auditing.
- Centralized enforcement.
- Easier future evolution.

### Disadvantages

- Additional runtime processing.
- More sophisticated context pipeline.
- Increased implementation complexity.

---

# Selected Approach

Every AI request follows a controlled context pipeline.

The Trusted Runtime gathers normalized entities from reviewed adapters.

The Sensitive Context Firewall then:

1. validates requested capabilities;
2. verifies user permissions;
3. applies approved projections;
4. removes restricted information;
5. records provenance;
6. enforces context limits;
7. produces the final context package.

Only this approved package may be transmitted to an external AI provider.

---

# Rationale

Prompt construction is a security-sensitive operation.

Allowing arbitrary runtime components to construct AI requests would undermine:

- minimum-data guarantees;
- permission transparency;
- capability validation;
- provenance tracking.

By centralizing context preparation inside the Trusted Runtime, Novus establishes a single, auditable enforcement point that remains independent of adapters, generated Labs, and AI providers.

This architecture also allows future AI providers to be introduced without changing platform security policies.

---

# Trade-offs

## Benefits

- Strong privacy guarantees.
- Deterministic context generation.
- Easier auditing.
- Consistent AI behaviour.
- Better permission enforcement.
- Provider-independent security policy.

## Drawbacks

- Additional processing before AI requests.
- More complex runtime pipeline.
- Central firewall becomes a critical platform component.

---

# Consequences

## Positive Consequences

- AI providers receive only approved context.
- Prompt construction becomes reproducible.
- Generated Labs cannot leak additional information.
- Runtime policies remain centralized.
- Security reviews become significantly simpler.

## Negative Consequences

- AI requests require additional validation.
- Context construction becomes a shared runtime responsibility.
- Runtime evolution must preserve firewall compatibility.

## Risks

- Incorrect projection rules could omit useful context.
- Firewall policy bugs could reject legitimate requests.
- Future AI capabilities must remain compatible with existing context policies.

---

# Future Considerations

Future platform versions may introduce:

- multiple AI providers;
- enterprise policy enforcement;
- customer-managed prompt policies;
- richer context projections;
- local model execution.

Regardless of future expansion, the following architectural principles remain permanent:

- all AI-bound context passes through the Sensitive Context Firewall;
- adapters never communicate directly with AI providers;
- generated Labs never construct unrestricted AI requests;
- minimum-data principles always apply.

---

# References

- Master Execution Plan
- AI Generation Pipeline
- Sensitive Context Firewall
- Context Builder
- Prompt Construction Pipeline
- Data Projection Layer
- Data Source Strategy & Adapter Resilience
- ADR-007 – Data Collection & Consent Policy
- ADR-013 – Data Minimization & Content Handling Policy

---

_End of ADR_
