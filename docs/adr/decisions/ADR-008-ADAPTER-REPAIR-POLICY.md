# ADR-008: Adapter Repair Policy

**Status:** Accepted

**Date:** 2026-06-28

**Version:** 1.0

**Authors:** Novus Core Team

**Reviewer(s):** Adapter Lead, Security Lead

---

# Summary

Novus adopts a **review-driven adapter repair model** in which AI may assist in proposing repairs, but never modifies official adapters automatically.

Official adapters are treated as trusted platform components. Every adapter update must be validated through automated testing, reviewed by a maintainer, versioned, signed, and released before reaching users.

This policy prioritizes correctness, user trust, and long-term maintainability over automatic self-modifying behaviour.

---

# Context

Supported websites evolve continuously.

Examples include:

- DOM structure changes.
- Accessibility improvements.
- CSS class regeneration.
- Route redesigns.
- API response changes.
- UI framework migrations.

Without a structured maintenance strategy, these changes would gradually reduce adapter reliability and break generated micro-apps.

Traditional browser automation tools often depend on users reporting failures after updates occur.

Novus instead treats adapters as long-lived platform components that are continuously verified and intentionally maintained.

---

# Problem Statement

The platform requires an adapter maintenance strategy that:

- detects website changes early;
- minimizes disruption for users;
- supports AI-assisted maintenance;
- prevents unsafe automatic updates;
- preserves trust in official adapters;
- ensures every repair is verified before release.

Allowing AI to silently rewrite production adapters would create unacceptable security and reliability risks.

---

# Decision

Official adapters shall follow a **review-driven repair workflow**.

When an adapter fails automated verification:

1. Diagnostics are collected.
2. Sanitized structural information is prepared.
3. AI may propose a repair.
4. Proposed changes are validated.
5. A maintainer reviews the repair.
6. A new signed adapter version is published.

Users never receive automatic AI-generated adapter modifications.

Every official adapter release remains intentionally reviewed and versioned.

---

# Architecture Overview

```text
Scheduled Verification
        │
        ▼
Health Failure
        │
        ▼
Diagnostics Collection
        │
        ▼
DOM Masking
        │
        ▼
AI Repair Proposal
        │
        ▼
Validation Pipeline
        │
        ▼
Maintainer Review
        │
        ▼
Signed Adapter Release
        │
        ▼
User Update
```

Repair proposals assist maintainers.

They do not replace them.

---

# Alternatives Considered

## Option A — Manual Maintenance Only

### Advantages

- Maximum human control.
- Simple release process.
- Predictable behaviour.

### Disadvantages

- Slow response to website changes.
- Higher maintenance burden.
- Limited scalability.

---

## Option B — Fully Automatic AI Repair

### Advantages

- Rapid recovery.
- Minimal maintainer effort.
- Continuous adaptation.

### Disadvantages

- Unsafe production changes.
- Difficult auditing.
- Reduced user trust.
- Potential privacy risks.
- High probability of incorrect repairs.

---

## Option C — AI-Assisted, Human-Reviewed Repair (Selected)

### Advantages

- Faster maintenance.
- Human oversight.
- Auditable releases.
- Secure deployment.
- Scalable maintenance model.

### Disadvantages

- Additional review workflow.
- More release infrastructure.
- Slightly slower than full automation.

---

# Selected Approach

Novus combines automated diagnostics with human-reviewed releases.

The platform automatically detects failures, gathers sanitized diagnostics, and generates candidate repairs.

However, every proposed repair must successfully pass:

- parser validation;
- fixture validation;
- snapshot validation;
- extraction tests;
- sensitive-route verification;
- security checks;

before maintainer approval.

Only reviewed adapter versions may be published.

---

# Rationale

This approach aligns with Novus' broader trust philosophy.

AI is extremely effective at proposing repetitive structural updates, such as selector changes or extraction adjustments.

However, AI should not become a production deployment authority.

Separating **repair generation** from **repair approval** preserves both development velocity and platform integrity.

This architecture also provides complete traceability for every adapter release.

---

# Trade-offs

## Benefits

- Faster adapter maintenance.
- Improved reliability.
- Better diagnostics.
- Human accountability.
- Secure release process.
- Consistent version history.

## Drawbacks

- Review process introduces additional effort.
- Repairs are not instantaneous.
- Release infrastructure becomes more sophisticated.

---

# Consequences

## Positive Consequences

- Website changes are detected proactively.
- AI reduces repetitive maintenance work.
- Official adapters remain trusted components.
- Every release is reproducible and auditable.
- Users receive stable, validated updates.

## Negative Consequences

- Critical website changes still require maintainer availability.
- Repair proposals may occasionally require manual refinement.

## Risks

- Diagnostic quality directly affects repair quality.
- Validation infrastructure becomes a critical dependency.
- Delayed reviews may postpone adapter updates.

---

# Future Considerations

Future versions may improve repair quality through better structural analysis, richer diagnostics, and enhanced validation tooling.

However, the core principle established by this ADR remains unchanged:

> **AI may propose repairs, but only trusted maintainers approve and publish official adapters.**

No production adapter should ever be modified automatically without validation and human review.

---

# References

- Master Execution Plan
- Data Source Strategy & Adapter Resilience
- DS-007 – Automated Adapter Health Monitoring
- DS-008 – CI Repair Proposal Pipeline
- DS-009 – Adapter Maintenance Model
- FIX-012 – Adapter Verification Pipeline
- FIX-013 – Official Adapter Snapshot Repository
- FIX-014 – Adapter Monitoring Pipeline
- ADR-006 – Adapter Contract & Maturity Levels
- ADR-007 – Data Collection & Consent Policy

---

_End of ADR_
