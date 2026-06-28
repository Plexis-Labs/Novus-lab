# Architecture Decision Records Index

This document serves as the central registry for all Architecture Decision Records (ADRs) in the Novus project.

Each ADR documents a single architectural decision, its rationale, trade-offs, and long-term implications.

For writing a new ADR, start from `TEMPLATE.md`.

---

# Statistics

| Metric     | Value |
| ---------- | ----: |
| Total ADRs |    21 |
| Accepted   |    21 |
| Draft      |     0 |
| Rejected   |     0 |
| Deprecated |     0 |
| Superseded |     0 |

---

# ADR Registry

| ADR     | Title                                                   | Status   | Version | Date       | Author(s)       |
| ------- | ------------------------------------------------------- | -------- | ------- | ---------- | --------------- |
| ADR-001 | Extension & MV3 Worker Architecture                     | Accepted | 1.0     | 2026-06-28 | Novus Core Team |
| ADR-002 | Sandboxed Runtime, CSP, Origin Isolation & Typed Bridge | Accepted | 1.0     | 2026-06-28 | Novus Core Team |
| ADR-003 | Storage Boundary (chrome.storage vs IndexedDB)          | Accepted | 1.0     | 2026-06-28 | Novus Core Team |
| ADR-004 | Manifest Compatibility & Versioning                     | Accepted | 1.0     | 2026-06-28 | Novus Core Team |
| ADR-005 | Generated Bundle Policy                                 | Accepted | 1.0     | 2026-06-28 | Novus Core Team |
| ADR-006 | Adapter Contract & Maturity Levels                      | Accepted | 1.0     | 2026-06-28 | Novus Core Team |
| ADR-007 | Data Collection & Consent Policy                        | Accepted | 1.0     | 2026-06-28 | Novus Core Team |
| ADR-008 | Adapter Repair Policy                                   | Accepted | 1.0     | 2026-06-28 | Novus Core Team |
| ADR-009 | Lab Distribution Policy                                 | Accepted | 1.0     | 2026-06-28 | Novus Core Team |
| ADR-010 | Bundle Delivery, Immutable Artifact & Cache Model       | Accepted | 1.0     | 2026-06-28 | Novus Core Team |
| ADR-011 | Identity, Device & Cloud Boundary                       | Accepted | 1.0     | 2026-06-28 | Novus Core Team |
| ADR-012 | Bridge Token Lifecycle & Replay Protection              | Accepted | 1.0     | 2026-06-28 | Novus Core Team |
| ADR-013 | Data Minimization & Content Handling Policy             | Accepted | 1.0     | 2026-06-28 | Novus Core Team |
| ADR-014 | Feature State Migration Model                           | Accepted | 1.0     | 2026-06-28 | Novus Core Team |
| ADR-015 | Pack Trust & Publisher Model                            | Accepted | 1.0     | 2026-06-28 | Novus Core Team |
| ADR-016 | Incognito, Profiles & Browser Support Policy            | Accepted | 1.0     | 2026-06-28 | Novus Core Team |
| ADR-017 | Offline & Backend Outage Behaviour                      | Accepted | 1.0     | 2026-06-28 | Novus Core Team |
| ADR-018 | Host Page Surface Compatibility                         | Accepted | 1.0     | 2026-06-28 | Novus Core Team |
| ADR-019 | Sensitive Context Firewall                              | Accepted | 1.0     | 2026-06-28 | Novus Core Team |
| ADR-020 | Action Capability Model                                 | Accepted | 1.0     | 2026-06-28 | Novus Core Team |
| ADR-021 | AI Provider Abstraction & Evaluation Policy             | Accepted | 1.0     | 2026-06-28 | Novus Core Team |

---

# Status Definitions

| Status     | Meaning                                                                        |
| ---------- | ------------------------------------------------------------------------------ |
| Draft      | Under discussion and not yet approved.                                         |
| Accepted   | Official project architecture and approved for implementation.                 |
| Rejected   | Considered but intentionally not adopted.                                      |
| Superseded | Replaced by a newer ADR while retained for historical reference.               |
| Deprecated | No longer recommended but preserved for historical and compatibility purposes. |

---

# Naming Convention

Every ADR follows the naming convention:

```text
ADR-001-EXTENSION-AND-MV3-WORKER-ARCHITECTURE.md
ADR-002-SANDBOX-CSP-ORIGIN-AND-BRIDGE-MODEL.md
ADR-003-STORAGE-BOUNDARY.md
...
ADR-021-AI-PROVIDER-ABSTRACTION-AND-EVALUATION-POLICY.md
```

ADR numbers are permanent and are never reused, even if an ADR is later superseded or deprecated.

---

# Updating the Index

Whenever an ADR is created or modified:

1. Add or update its entry in the ADR Registry.
2. Update the statistics if the status changes.
3. Commit the ADR and this index in the same pull request.
4. Preserve historical ADRs; never delete accepted decisions.
5. If an ADR is replaced, mark it as **Superseded** and reference the replacing ADR.
6. Maintain sequential ADR numbering and never reuse retired numbers.

---

# Ownership

The ADR collection represents the authoritative architectural history of Novus.

All significant architectural changes should be documented through a new ADR rather than modifying the intent of an accepted decision. This preserves decision history, supports future contributors, and provides a clear rationale for the evolution of the platform architecture.
