# Architecture Decision Records (ADRs)

## Purpose

Architecture Decision Records (ADRs) document the significant architectural decisions made throughout the Novus project.

Rather than relying on tribal knowledge, chat history, or pull request discussions, every important architectural decision is recorded in a consistent, reviewable, and versioned format.

---

# Goals

The ADR system exists to:

- Record why architectural decisions were made.
- Preserve historical context.
- Make trade-offs explicit.
- Help future contributors understand the system.
- Reduce repeated design discussions.

---

## Quick Links

- ADR Template → `TEMPLATE.md`
- ADR Registry → `ADR-INDEX.md`

# When to Create an ADR

Create an ADR whenever a decision:

- Changes the architecture.
- Introduces a new platform-wide pattern.
- Alters security boundaries.
- Changes public contracts or SDKs.
- Impacts multiple packages.
- Has long-term maintenance implications.

Do **not** create ADRs for small implementation details, bug fixes, or refactoring that does not change architecture.

---

# ADR Lifecycle

```text
Draft
   ↓
Review
   ↓
Accepted
   ↓
(Optional)
Superseded
   ↓
Deprecated
```

Every ADR starts as a **Draft** and requires review before becoming part of the official architecture.

---

# Naming Convention

Every ADR uses sequential numbering.

```text
ADR-001.md
ADR-002.md
ADR-003.md
...
```

Numbers are permanent and are never reused.

---

# Repository Structure

```text
docs/
└── adr/
    ├── README.md
    ├── TEMPLATE.md
    ├── ADR-INDEX.md
    └── decisions/
        ├── ADR-001.md
        ├── ADR-002.md
        └── ...
```

---

# Writing Guidelines

Each ADR should:

- Describe one architectural decision.
- Explain the problem being solved.
- Document considered alternatives.
- Record trade-offs.
- Explain long-term consequences.
- Reference related documents where appropriate.

Keep ADRs focused and avoid combining unrelated decisions into a single document.

---

# Review Process

Every ADR should include:

- Author(s)
- Reviewer(s)
- Status
- Version
- Date

An ADR becomes part of the official architecture only after review and acceptance.

---

# Modifying an Existing ADR

Accepted ADRs represent historical decisions.

If architecture changes:

- Prefer creating a new ADR that supersedes the previous one.
- Do not rewrite historical decisions.
- Preserve architectural history whenever possible.

---

# References

- Architecture Decision Record Template (`TEMPLATE.md`)
- ADR Registry (`ADR-INDEX.md`)
- Project Architecture Documentation
