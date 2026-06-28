# ADR-003: Storage Boundary (chrome.storage vs IndexedDB)

**Status:** Accepted

**Date:** 2026-06-28

**Version:** 1.0

**Authors:** Novus Core Team

**Reviewer(s):** Runtime Lead

---

# Summary

Novus separates persistent data across two storage systems:

* **chrome.storage** stores extension configuration, feature metadata, permissions, and lightweight state.
* **IndexedDB** stores large datasets, workspaces, notes, snapshots, provenance, cached artifacts, and other structured records.

This separation aligns storage technology with the characteristics of the data being stored, improving scalability, maintainability, and runtime performance.

---

# Context

Novus generates persistent micro-apps that create and manage many different categories of data.

Some information is extremely small and configuration-oriented:

* enabled features
* permission grants
* user preferences
* artifact metadata

Other information can become very large:

* workspace datasets
* collected records
* notes
* snapshots
* cached bundles
* provenance history

Attempting to store every category in a single storage mechanism would introduce performance limitations, size constraints, and maintenance complexity.

---

# Problem Statement

The runtime requires a storage architecture that:

* persists feature state across browser sessions;
* supports large structured datasets;
* provides fast access to configuration data;
* scales as additional workspaces are added;
* maintains clear ownership boundaries;
* minimizes unnecessary synchronization.

A single storage backend cannot efficiently satisfy all of these requirements.

---

# Decision

Novus adopts a dual-storage architecture.

## chrome.storage

Used for:

* Feature manifests
* Permission grants
* User preferences
* Feature versions
* Bundle metadata
* Artifact hashes
* Local profile identifier
* Small configuration objects

## chrome.storage.session

Used for:

* Active route information
* Runtime session metadata
* Route epochs
* Temporary worker state

## IndexedDB

Used for:

* Workspaces
* Datasets
* Normalized records
* Notes
* Snapshots
* Collection jobs
* Provenance
* Coverage information
* Cached verified bundles
* Feature-generated state

Each storage technology is responsible only for the data it manages best.

---

# Architecture Overview

```text
Generated Feature
        │
        ▼
Trusted Runtime
        │
        ├──────────────┐
        │              │
        ▼              ▼
chrome.storage     IndexedDB
        │              │
 Configuration     Large Structured Data
 Metadata          Workspaces
 Preferences       Records
 Permissions       Notes
 Feature State     Snapshots
```

The runtime determines the correct storage location.

Generated micro-apps never access either storage directly.

---

# Alternatives Considered

## Option A — Store Everything in chrome.storage

### Advantages

* Simpler implementation.
* Single persistence layer.
* Native extension API.

### Disadvantages

* Poor suitability for large datasets.
* Limited querying capabilities.
* Reduced scalability.
* Inefficient for workspace data.

---

## Option B — Store Everything in IndexedDB

### Advantages

* Excellent structured storage.
* Supports large datasets.
* Flexible querying.

### Disadvantages

* Unnecessarily complex for simple configuration.
* Slower access for lightweight metadata.
* Less convenient for extension configuration.

---

## Option C — Hybrid Storage (Selected)

### Advantages

* Storage optimized for each data type.
* Better scalability.
* Clear ownership boundaries.
* Easier future maintenance.

### Disadvantages

* Additional implementation complexity.
* Two storage systems must be maintained.

---

# Selected Approach

The hybrid storage architecture provides the best balance between simplicity and scalability.

Configuration data remains lightweight and easily accessible, while large datasets are managed by a storage engine designed for structured persistence.

---

# Rationale

Separating storage responsibilities supports several architectural goals:

* Improves runtime performance.
* Prevents configuration storage from becoming overloaded.
* Enables efficient querying of workspace datasets.
* Simplifies backup, migration, and versioning strategies.
* Provides a natural separation between runtime metadata and user-generated content.

This architecture also supports future workspace growth without redesigning persistence.

---

# Trade-offs

## Benefits

* Better scalability.
* Faster configuration access.
* Efficient large-data storage.
* Clear separation of responsibilities.
* Easier future migrations.

## Drawbacks

* Two persistence systems.
* Additional abstraction layer.
* Slightly higher implementation complexity.

---

# Consequences

## Positive Consequences

* Runtime scales as workspaces grow.
* Storage responsibilities remain clear.
* Feature data remains organized.
* Future migrations become easier.

## Negative Consequences

* Developers must understand storage boundaries.
* Storage coordination logic becomes necessary.

## Risks

* Incorrect storage placement could increase complexity.
* Schema migrations must remain synchronized across both systems.

---

# Future Considerations

Future versions may introduce cloud synchronization or encrypted storage layers.

These enhancements should extend the storage architecture without changing the fundamental separation between lightweight configuration data and large structured workspace data.

---

# References

* Master Execution Plan
* Workspace Data Engine
* Storage Architecture
* Persistence Model
* ADR-001 – Extension & Manifest V3 Architecture
* ADR-002 – Sandboxed Runtime, CSP, Origin Isolation & Typed Bridge

---

*End of ADR*
