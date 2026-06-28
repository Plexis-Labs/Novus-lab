# ADR-020: Action Capability Model

**Status:** Accepted

**Date:** 2026-06-28

**Version:** 1.0

**Authors:** Novus Core Team

**Reviewer(s):** Runtime Lead, Security Lead

---

# Summary

Novus adopts a **capability-based authorization model** for all privileged runtime operations.

Generated Labs never invoke browser APIs, adapters, storage, or runtime services directly. Instead, every privileged action is represented as a declared capability that is validated by the Trusted Runtime before execution.

Capabilities become the fundamental unit of authorization, replacing implicit trust with explicit, verifiable permissions.

---

# Context

Generated Labs interact with numerous platform services, including:

- workspace storage;
- annotations;
- datasets;
- adapter queries;
- UI surfaces;
- AI generation;
- runtime events.

These services have varying security implications and cannot be exposed directly to AI-generated code.

Furthermore, the runtime must support:

- permission previews;
- user consent;
- auditability;
- deterministic validation;
- future extensibility.

The platform therefore requires a uniform authorization model that remains independent of implementation details.

---

# Problem Statement

The runtime must answer several questions before executing any privileged operation:

- Is the requested action allowed?
- Was the capability declared in the Feature Manifest?
- Has the user granted the required permission?
- Is the request valid for the active route?
- Is the current execution context still authorized?
- Can this operation be audited?

Without a capability model, authorization logic would become fragmented across multiple runtime components.

---

# Decision

Every privileged runtime operation shall be represented by an explicit capability.

Capabilities are:

- declared within the Feature Manifest;
- validated during bundle verification;
- approved during installation;
- enforced during bridge execution;
- logged for diagnostics and auditing.

Generated Labs may request capabilities but never execute privileged operations directly.

Only the Trusted Runtime may resolve capability requests into concrete platform actions.

---

# Architecture Overview

```text id="pkw3xn"
Generated Lab
       │
       ▼
Capability Request
       │
       ▼
Trusted Runtime
       │
 ├── Manifest Validation
 ├── Permission Check
 ├── Token Validation
 ├── Route Validation
 ├── Capability Registry
 └── Runtime Authorization
       │
       ▼
Approved Platform Action
```

Authorization is evaluated for every privileged operation.

Capabilities describe _what_ may be done—not _how_ it is implemented.

---

# Alternatives Considered

## Option A — Direct Runtime APIs

### Advantages

- Simple developer experience.
- Minimal abstraction.
- Lower implementation overhead.

### Disadvantages

- Weak security boundaries.
- Difficult auditing.
- No centralized authorization.
- Generated Labs gain excessive privilege.

---

## Option B — Component-Level Permission Checks

### Advantages

- Flexible implementation.
- Independent modules.

### Disadvantages

- Duplicated authorization logic.
- Inconsistent behaviour.
- Difficult maintenance.
- Increased security risk.

---

## Option C — Central Capability Runtime (Selected)

### Advantages

- Consistent authorization.
- Explicit permissions.
- Strong security boundaries.
- Better diagnostics.
- Easier auditing.
- Platform extensibility.

### Disadvantages

- Additional runtime infrastructure.
- Capability registry maintenance.
- Slight increase in execution overhead.

---

# Selected Approach

The Trusted Runtime owns a centralized capability registry.

Each capability defines:

- its purpose;
- required permissions;
- supported execution contexts;
- validation requirements;
- runtime implementation.

When a Generated Lab issues an action request, the runtime validates the request against the active manifest, bridge authorization, route context, and user permissions before executing the corresponding platform service.

Capabilities are therefore the contract between Generated Labs and the Trusted Runtime.

---

# Rationale

Capabilities provide a stable abstraction that separates platform intent from implementation.

Rather than exposing browser APIs or internal runtime services, the platform exposes a controlled vocabulary of approved actions.

This approach:

- simplifies security reviews;
- supports permission previews;
- enables future runtime evolution;
- preserves compatibility across SDK versions;
- allows runtime implementations to change without affecting Generated Labs.

The capability model also aligns naturally with Novus' replay-safe bridge and manifest-first architecture.

---

# Trade-offs

## Benefits

- Explicit authorization.
- Consistent runtime behaviour.
- Better auditing.
- Strong security boundaries.
- Stable SDK contracts.
- Easier platform evolution.

## Drawbacks

- Additional runtime validation.
- Capability registry maintenance.
- Slightly higher implementation complexity.

---

# Consequences

## Positive Consequences

- All privileged operations follow a single authorization model.
- User permissions become predictable and explainable.
- Runtime services remain implementation-independent.
- Generated Labs remain isolated from browser internals.
- Security policies become centrally enforceable.

## Negative Consequences

- New runtime functionality requires corresponding capability definitions.
- SDK evolution must preserve capability compatibility.

## Risks

- Poor capability design could reduce platform flexibility.
- Validation bugs could deny legitimate operations.
- Capability versioning requires careful lifecycle management.

---

# Future Considerations

Future platform versions may introduce:

- finer-grained capabilities;
- enterprise policy enforcement;
- dynamic capability negotiation;
- capability analytics;
- richer SDK abstractions.

Regardless of future expansion, the following architectural principles remain permanent:

- privileged operations are represented as capabilities;
- Generated Labs never invoke runtime implementations directly;
- authorization remains centralized within the Trusted Runtime;
- capability declarations remain part of the Feature Manifest.

---

# References

- Master Execution Plan
- Capability Runtime
- Capability Registry
- Action SDK
- Feature Manifest
- Replay-Safe Bridge
- ADR-004 – Manifest Compatibility & Versioning
- ADR-012 – Bridge Token Lifecycle & Replay Protection
- ADR-019 – Sensitive Context Firewall

---

_End of ADR_
