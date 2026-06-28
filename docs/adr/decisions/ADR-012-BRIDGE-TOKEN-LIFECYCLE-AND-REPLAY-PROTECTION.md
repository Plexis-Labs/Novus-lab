# ADR-012: Bridge Token Lifecycle & Replay Protection

**Status:** Accepted

**Date:** 2026-06-28

**Version:** 1.0

**Authors:** Novus Core Team

**Reviewer(s):** Runtime Lead, Security Lead

---

# Summary

Novus secures communication between sandboxed micro-apps and the Trusted Runtime using **short-lived capability tokens**, **route-bound execution contexts**, **one-time nonces**, and **replay protection**.

Bridge authorization is intentionally ephemeral. Tokens are bound to a specific feature instance, browser tab, route epoch, and sandbox instance, and expire after a short lifetime.

No bridge request is trusted solely because it originates from a sandbox.

---

# Context

Every generated micro-app communicates with the Trusted Runtime through the Novus Bridge.

The bridge exposes privileged runtime functionality including:

* workspace access;
* feature state;
* approved datasets;
* annotations;
* storage;
* runtime lifecycle events.

Although generated bundles execute inside sandboxed iframes, every bridge request must still be independently validated.

Sandbox isolation alone is not sufficient to prevent replay attacks, stale messages, or unauthorized capability use.

---

# Problem Statement

The runtime must guarantee that bridge requests:

* originate from the correct sandbox instance;
* belong to the active feature version;
* correspond to the current browser route;
* cannot be replayed later;
* cannot survive page transitions;
* cannot outlive revoked permissions;
* cannot be reused by another feature.

Without explicit bridge authorization, stale or intercepted messages could be accepted after the runtime context has changed.

---

# Decision

Novus adopts a **replay-safe bridge authorization model**.

Every bridge request must include a runtime-issued capability token that is cryptographically bound to:

* feature identifier;
* feature version;
* sandbox instance;
* browser tab;
* route epoch;
* protocol version;
* request lifetime.

Additionally, every request includes a unique nonce that may be used only once.

The runtime rejects any request that fails validation.

---

# Architecture Overview

```text
Sandboxed Micro-App
        │
        │ Bridge Request
        ▼
Bridge Envelope
        │
        ├── Capability Token
        ├── Request ID
        ├── Nonce
        ├── Feature ID
        ├── Feature Version
        ├── Route Epoch
        ├── Tab ID
        └── Protocol Version
        │
        ▼
Trusted Runtime
        │
        ├── Source Validation
        ├── Token Validation
        ├── Nonce Validation
        ├── Route Validation
        ├── Capability Validation
        └── Schema Validation
        │
        ▼
Approved Runtime Operation
```

Authorization is evaluated independently for every bridge request.

---

# Alternatives Considered

## Option A — Long-Lived Session Tokens

### Advantages

* Simpler implementation.
* Lower runtime overhead.
* Fewer token refresh operations.

### Disadvantages

* Higher replay risk.
* Stale authorization.
* Poor lifecycle isolation.
* Difficult revocation.

---

## Option B — Trust the Sandboxed Iframe

### Advantages

* Minimal authorization logic.
* Reduced bridge complexity.

### Disadvantages

* Sandbox identity alone is insufficient.
* No replay protection.
* No route isolation.
* No feature-level authorization.
* Weak security guarantees.

---

## Option C — Short-Lived Route-Bound Capability Tokens (Selected)

### Advantages

* Strong replay protection.
* Fine-grained authorization.
* Fast revocation.
* Route-aware execution.
* Consistent capability enforcement.

### Disadvantages

* More runtime state.
* Token lifecycle management.
* Additional validation overhead.

---

# Selected Approach

The Trusted Runtime issues capability tokens only after verifying that a feature has successfully mounted.

Each token represents authorization for one execution context and remains valid only while that context remains active.

Tokens are invalidated whenever:

* the feature is disabled;
* the page route changes;
* the route epoch changes;
* the sandbox instance is destroyed;
* permissions change;
* the token expires.

Requests containing expired or invalid tokens are rejected immediately.

---

# Rationale

Bridge authorization is designed around **execution context**, not user identity.

A bridge request is considered trustworthy only when all contextual assumptions remain valid.

This approach allows the runtime to:

* revoke access immediately;
* prevent replay attacks;
* isolate independent feature instances;
* invalidate stale browser contexts;
* guarantee capability enforcement for every operation.

The bridge therefore becomes an authorization system rather than a simple messaging layer.

---

# Trade-offs

## Benefits

* Strong replay protection.
* Immediate authorization revocation.
* Context-aware execution.
* Deterministic validation.
* Improved runtime security.
* Explicit lifecycle management.

## Drawbacks

* Increased implementation complexity.
* Additional runtime bookkeeping.
* Token refresh management.
* Slight messaging overhead.

---

# Consequences

## Positive Consequences

* Bridge messages cannot be reused across route changes.
* Destroyed sandbox instances immediately lose authorization.
* Feature isolation is strengthened.
* Runtime security becomes deterministic.
* Authorization decisions become fully auditable.

## Negative Consequences

* Bridge protocol becomes more sophisticated.
* Token lifecycle must remain synchronized with runtime state.
* Runtime validation becomes a critical platform dependency.

## Risks

* Incorrect route epoch management could invalidate legitimate requests.
* Token generation bugs could interrupt feature execution.
* Future protocol changes require careful version compatibility.

---

# Future Considerations

Future versions may introduce stronger cryptographic token formats, protocol negotiation, streaming bridge operations, or additional runtime capabilities.

Regardless of protocol evolution, the following principles remain permanent:

* capability tokens are short-lived;
* bridge authorization is context-bound;
* replay protection is mandatory;
* every privileged operation requires independent validation.

No future optimization should weaken these guarantees.

---

# References

* Master Execution Plan
* Phase -1 – Sandbox Feasibility Spike
* Phase 2 – Capability Runtime & Replay-Safe Bridge
* Bridge Envelope
* Runtime Validation Rules
* Capability Runtime
* ADR-002 – Sandbox, CSP, Origin & Bridge Model
* ADR-005 – Generated Bundle Policy

---

*End of ADR*
