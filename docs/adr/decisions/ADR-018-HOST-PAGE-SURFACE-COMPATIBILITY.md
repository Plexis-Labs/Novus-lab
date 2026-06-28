# ADR-018: Host Page Surface Compatibility

**Status:** Accepted

**Date:** 2026-06-28

**Version:** 1.0

**Authors:** Novus Core Team

**Reviewer(s):** Runtime Lead, UI Platform Lead

---

# Summary

Novus adopts a **non-invasive augmentation model** in which generated Labs coexist with supported websites without taking ownership of the host page.

The runtime mounts UI only within approved extension-controlled surfaces and interacts with the website exclusively through reviewed adapters. Generated Labs must remain resilient to host page changes and avoid assumptions about website implementation details.

This preserves compatibility, minimizes breakage, and respects the integrity of supported websites.

---

# Context

Novus operates on top of existing web applications such as GitHub, LeetCode, YouTube, and other supported platforms.

Unlike standalone web applications, Novus does not control:

* page layout;
* routing;
* rendering lifecycle;
* styling;
* JavaScript execution;
* DOM evolution.

These responsibilities remain under the control of the host website.

The platform therefore requires a strategy that allows persistent augmentation without tightly coupling generated Labs to website internals.

---

# Problem Statement

The runtime must determine:

* where Labs may render;
* how UI integrates with host pages;
* how adapters interact with website structure;
* how to tolerate website updates;
* how generated Labs remain portable across supported websites.

Without explicit compatibility rules, generated Labs would become fragile and increasingly difficult to maintain.

---

# Decision

Novus adopts a **surface compatibility model** based on three principles.

## Extension-Owned Rendering

Generated Labs render only inside approved runtime-controlled containers.

The runtime owns:

* Lab containers;
* side panels;
* overlays;
* extension UI surfaces.

Generated Labs never assume ownership of arbitrary website elements.

---

## Adapter-Mediated Integration

All interaction with host pages occurs through reviewed adapters.

Adapters are responsible for:

* route detection;
* semantic extraction;
* anchor discovery;
* compatibility validation;
* resilience to DOM evolution.

Generated Labs never interact directly with host page structure.

---

## Progressive Enhancement

Host pages remain fully functional regardless of whether Novus is installed, enabled, or currently executing.

Novus augments the browsing experience without becoming a dependency of the underlying website.

---

# Architecture Overview

```text id="yq9e3k"
Supported Website
        │
        ▼
Reviewed Adapter
        │
        ▼
Trusted Runtime
        │
        ├── Route Detection
        ├── Anchor Resolution
        ├── Compatibility Validation
        └── Lab Mount
                │
                ▼
Extension-Owned Surface
                │
                ▼
Generated Lab
```

Website ownership always remains with the host application.

---

# Alternatives Considered

## Option A — Direct DOM Ownership

### Advantages

* Maximum customization.
* Flexible UI integration.
* Minimal runtime abstraction.

### Disadvantages

* Extremely fragile.
* Breaks when websites change.
* Difficult maintenance.
* High compatibility risk.
* Poor isolation.

---

## Option B — Website-Specific Custom Builds

### Advantages

* Highly optimized UI.
* Deep integration.

### Disadvantages

* Large maintenance burden.
* Poor scalability.
* Strong coupling to individual websites.

---

## Option C — Runtime-Owned Surfaces with Adapter Integration (Selected)

### Advantages

* Stable rendering.
* Better portability.
* Improved resilience.
* Clear ownership boundaries.
* Easier maintenance.

### Disadvantages

* Less freedom than unrestricted DOM manipulation.
* Requires sophisticated adapter infrastructure.
* Runtime manages mounting lifecycle.

---

# Selected Approach

The Trusted Runtime owns every Lab mounting surface.

Adapters determine where Labs may integrate with the current page but do not transfer ownership of website elements to generated code.

This separation allows websites to evolve independently while keeping generated Labs stable and predictable.

---

# Rationale

Novus is designed to complement existing applications rather than replace them.

Respecting host ownership provides several advantages:

* reduces breakage from website updates;
* improves adapter resilience;
* simplifies testing;
* strengthens security boundaries;
* preserves accessibility;
* keeps generated Labs portable across supported websites.

By treating host pages as external systems rather than runtime components, Novus maintains a clean separation between the platform and the websites it augments.

---

# Trade-offs

## Benefits

* Better compatibility.
* Stable rendering model.
* Easier adapter maintenance.
* Strong separation of concerns.
* Reduced dependency on website implementation.

## Drawbacks

* Less control over host layouts.
* Additional runtime mounting logic.
* Adapter sophistication increases.

---

# Consequences

## Positive Consequences

* Generated Labs remain resilient to moderate website changes.
* Host applications continue functioning independently.
* Adapter responsibilities remain clearly defined.
* Runtime surfaces remain predictable.

## Negative Consequences

* Some UI experiences are constrained by available extension surfaces.
* Adapter updates may be required after major website redesigns.

## Risks

* Significant host application redesigns may temporarily affect mounting.
* Poor anchor selection could reduce UI stability.
* Browser rendering changes may require runtime adjustments.

---

# Future Considerations

Future platform versions may introduce:

* richer mounting strategies;
* adaptive surface placement;
* improved anchor discovery;
* additional browser integration capabilities.

Regardless of future improvements, the following principles remain unchanged:

* host websites retain ownership of their interfaces;
* Novus augments rather than replaces existing applications;
* generated Labs render only within trusted runtime-controlled surfaces.

---

# References

* Master Execution Plan
* Runtime Mount Lifecycle
* Supported Website Strategy
* Adapter Contract
* UI Surface Architecture
* ADR-006 – Adapter Contract & Maturity Levels
* ADR-008 – Adapter Repair Policy

---

*End of ADR*
