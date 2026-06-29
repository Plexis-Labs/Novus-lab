# Branch Protection Policy

## Purpose

The Branch Protection Policy defines the repository governance rules for the Novus project.

Its purpose is to ensure that every change merged into the protected branch has been reviewed, verified, and validated through the Continuous Integration pipeline.

These rules protect the long-term stability and maintainability of the project.

---

# Objectives

The Branch Protection Policy ensures:

- No direct changes to the protected branch.
- Every change is reviewed.
- Every required quality gate passes before merging.
- Repository history remains clean and linear.
- Emergency changes follow the same governance model.

---

# Protected Branch

The primary protected branch is:

```text
main
```

No contributor should commit directly to this branch.

---

# Development Workflow

All development follows this workflow:

```text
feature/*
        │
        ▼
Pull Request
        │
        ▼
Continuous Integration
        │
        ▼
Code Review
        │
        ▼
Merge
        │
        ▼
main
```

---

# Merge Philosophy

Every merged commit must satisfy the following requirements:

- Successful CI verification
- Required code review approval
- Resolved review conversations
- Up-to-date branch
- Linear commit history

---

# Responsibilities

Branch protection is responsible for:

- Repository governance
- Merge safety
- Review enforcement
- CI enforcement

It is not responsible for:

- Running CI
- Executing tests
- Building packages
- Publishing releases

Those responsibilities belong to their respective workflows.

---

# Future Expansion

As the platform grows, additional required checks may include:

- Playwright Pipeline
- Nightly Verification
- Security Scanning
- Performance Validation

These will be added without changing the overall governance model.
