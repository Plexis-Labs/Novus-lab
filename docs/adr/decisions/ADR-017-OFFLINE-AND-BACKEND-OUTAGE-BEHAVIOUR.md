# ADR-017: Offline & Backend Outage Behaviour

**Status:** Accepted

**Date:** 2026-06-28

**Version:** 1.0

**Authors:** Novus Core Team

**Reviewer(s):** Runtime Lead, Infrastructure Lead

---

# Summary

Novus adopts a **local-first runtime architecture** that continues operating when cloud services are unavailable.

Existing Labs, adapters, workspaces, cached artifacts, and local datasets remain functional without backend connectivity. Cloud services are treated as optional capability providers rather than runtime dependencies.

Only operations that inherently require cloud infrastructure—such as AI-powered Lab generation or remote synchronization—are temporarily unavailable during outages.

---

# Context

Novus combines local browser capabilities with optional cloud services.

Cloud infrastructure is responsible for tasks such as:

- AI-powered Lab generation;
- artifact generation;
- optional future synchronization;
- platform telemetry;
- update discovery.

However, the core purpose of Novus is to provide persistent browser-side productivity tools.

Users should not lose access to existing workflows because an external service becomes unavailable.

---

# Problem Statement

The platform must define how it behaves when:

- the AI gateway is unavailable;
- backend APIs fail;
- network connectivity is lost;
- update services cannot be reached;
- remote infrastructure experiences partial outages.

Without explicit outage policies, runtime behaviour becomes inconsistent and user productivity may be unnecessarily interrupted.

---

# Decision

Novus adopts a **graceful degradation model**.

During backend outages:

### Continue Operating

- installed Labs;
- verified bundle execution;
- adapters;
- local workspaces;
- notes;
- datasets;
- cached artifacts;
- browser-side permissions;
- runtime SDK.

### Temporarily Unavailable

- AI Lab generation;
- cloud-assisted repair proposals;
- remote publishing;
- update discovery;
- optional synchronization services.

The runtime never disables existing Labs solely because backend infrastructure is unavailable.

---

# Architecture Overview

```text id="n3g6xr"
            Backend Available?
                 │
         ┌───────┴────────┐
         │                │
        Yes              No
         │                │
         ▼                ▼
 Full Platform      Local Runtime
 Functionality      Continues
         │                │
         ▼                ▼
 AI Generation      Existing Labs
 Updates            Adapters
 Sync               Workspaces
 Publishing         Cached Artifacts
```

Cloud services enhance the platform but do not own its core functionality.

---

# Alternatives Considered

## Option A — Cloud-Dependent Runtime

### Advantages

- Simpler backend coordination.
- Centralized execution.
- Easier remote management.

### Disadvantages

- Platform becomes unavailable during outages.
- Poor user experience.
- Weak offline capability.
- Contradicts local-first architecture.

---

## Option B — Disable Features During Outages

### Advantages

- Simpler consistency model.
- Reduced edge cases.

### Disadvantages

- Existing user workflows break.
- Previously generated Labs become unusable.
- Reduced confidence in platform reliability.

---

## Option C — Local-First Graceful Degradation (Selected)

### Advantages

- Existing workflows continue.
- Better reliability.
- Offline productivity.
- Predictable behaviour.
- Strong user trust.

### Disadvantages

- Runtime must distinguish local and cloud capabilities.
- More sophisticated state management.
- Retry infrastructure required.

---

# Selected Approach

The Trusted Runtime classifies every platform capability according to its dependency model.

Local capabilities continue operating independently.

Cloud capabilities fail gracefully with clear user feedback and may be retried automatically when connectivity returns.

This ensures that temporary infrastructure failures do not invalidate locally installed functionality.

---

# Rationale

The browser is Novus' primary execution environment.

Cloud services exist to extend the platform rather than replace it.

This architecture:

- improves resilience;
- protects user productivity;
- supports offline usage;
- reduces operational risk;
- aligns with the platform's local-first philosophy.

Users should lose only the capabilities that genuinely require backend infrastructure—not their existing work.

---

# Trade-offs

## Benefits

- Reliable offline operation.
- Better user experience.
- Reduced dependence on backend availability.
- Graceful failure handling.
- Improved platform resilience.
- Stronger local-first architecture.

## Drawbacks

- More runtime complexity.
- Offline state management.
- Retry mechanisms.
- Additional synchronization considerations.

---

# Consequences

## Positive Consequences

- Existing Labs continue functioning.
- Local workspaces remain accessible.
- Cached artifacts remain executable.
- Backend outages affect only cloud-dependent operations.
- User productivity is preserved.

## Negative Consequences

- AI generation becomes temporarily unavailable.
- Cloud-assisted workflows pause until connectivity returns.
- Users may temporarily operate on older platform metadata.

## Risks

- Retry logic must avoid duplicate operations.
- Future synchronization features require careful conflict handling.
- Backend recovery procedures must preserve consistency.

---

# Future Considerations

Future releases may introduce:

- background synchronization queues;
- intelligent retry scheduling;
- offline generation preparation;
- distributed artifact mirrors;
- enterprise offline deployment modes.

Regardless of future enhancements, the following architectural principle remains unchanged:

> **The browser runtime is the primary execution environment. Cloud services enhance the platform but do not determine whether existing Labs remain usable.**

---

# References

- Master Execution Plan
- Offline & Backend Outage Behaviour
- Bundle Artifact Cache
- AI Gateway
- Runtime Lifecycle
- ADR-010 – Bundle Delivery, Immutable Artifact & Cache Model
- ADR-011 – Identity, Device & Cloud Boundary

---

_End of ADR_
