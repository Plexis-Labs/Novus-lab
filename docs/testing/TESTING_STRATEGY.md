# Novus Testing Strategy

## Purpose

This document defines the testing architecture for the Novus platform.

Each testing layer has a single responsibility and contributes an additional level of confidence to the platform.

---

# Testing Pyramid

```text
               End-to-End
                    ▲
             Integration
                    ▲
          Serialization
                    ▲
              Contracts
                    ▲
                 Unit
```

---

# Unit Tests

## Purpose

Validate individual functions, utilities, algorithms, and isolated business logic.

Characteristics

- Fast
- Deterministic
- No network
- No external services
- No browser

---

# Contract Tests

## Purpose

Validate platform contracts.

Examples

- BridgeEnvelope
- FeatureManifest
- BundleArtifact
- CapabilityDescriptor
- DatasetProvenance

Responsibilities

- Schema validation
- Required fields
- Optional fields
- Version compatibility
- Backward compatibility

---

# Serialization Tests

## Purpose

Ensure contracts serialize and deserialize correctly.

Verification includes

- Round-trip equality
- Invalid payloads
- Missing fields
- Unknown fields
- Version migration

---

# Integration Tests

## Purpose

Validate interaction between independent subsystems.

Examples

- Runtime ↔ Shared
- Extension ↔ Runtime
- Backend ↔ Shared
- AI ↔ Runtime

---

# End-to-End Tests

End-to-End testing is implemented separately through the Playwright Pipeline.

These tests validate complete user workflows from the browser perspective.

---

# Ownership

| Test Type     | Owner              |
| ------------- | ------------------ |
| Unit          | Individual Package |
| Contract      | Shared Package     |
| Serialization | Shared Package     |
| Integration   | Multiple Packages  |
| End-to-End    | Platform           |
