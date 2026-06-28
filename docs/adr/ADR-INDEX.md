# Architecture Decision Records Index

This document serves as the central registry for all Architecture Decision Records (ADRs) in the Novus project.

Each ADR documents a single architectural decision, its rationale, and its long-term implications.

For writing a new ADR, start from `TEMPLATE.md`.

---

# Statistics

| Metric     | Value |
| ---------- | ----: |
| Total ADRs |     0 |
| Accepted   |     0 |
| Draft      |     0 |
| Deprecated |     0 |
| Superseded |     0 |

---

# ADR Registry

| ADR           | Title | Status | Version | Date | Author |
| ------------- | ----- | ------ | ------- | ---- | ------ |
| *No ADRs yet* |       |        |         |      |        |

---

# Status Definitions

| Status     | Meaning                                                  |
| ---------- | -------------------------------------------------------- |
| Draft      | Under discussion and not yet approved.                   |
| Accepted   | Official project architecture.                           |
| Rejected   | Considered but not adopted.                              |
| Superseded | Replaced by a newer ADR.                                 |
| Deprecated | No longer recommended but kept for historical reference. |

---

# Naming Convention

Every ADR follows the naming convention:

```
ADR-001.md
ADR-002.md
ADR-003.md
...
```

Numbers are permanent and are never reused.

---

# Updating the Index

Whenever a new ADR is accepted:

1. Add it to the ADR Registry.
2. Update the statistics.
3. Commit both the ADR and this index together.
4. Do not remove historical ADRs.
5. If an ADR is replaced, mark it as **Superseded** instead of deleting it.
