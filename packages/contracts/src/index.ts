// G-001: Platform Contracts Entry Point
// Individual contracts will be exported from here as they are built.

export * from './security/capabilityToken.schema'

export type * from './security/capabilityToken.types'

export * from '../fixtures/security/capabilityToken.fixtures'

export * from '../generated/capabilityToken.json-schema'

export * from './ai'
// CORE DOMAIN (G-002: Feature Manifest)
export * from './core/featureManifest.schema'
export * from '../fixtures/core/featureManifest.fixtures'

// SECURITY DOMAIN (G-003: Capability Token)
export * from './security/capabilityToken.schema'
export type * from './security/capabilityToken.types'
export * from '../fixtures/security/capabilityToken.fixtures'
export * from '../generated/capabilityToken.json-schema'

// ==========================================
// WORKSPACE DOMAIN (G-007 & G-008)
// ==========================================

// Workspace Dataset
export * from './workspace/workspaceDataset.schema'
export * from '../fixtures/workspace/workspaceDataset.fixtures'

// Dataset Provenance
export * from './workspace/datasetProvenance.schema'
export type * from './workspace/datasetProvenance.types'
export * from '../generated/datasetProvenance.json-schema'

export * from './bridge/index'

export * from '../generated/permissionGrant.json-schema'

export * from './security/capabilityToken.schema'
export type * from './security/capabilityToken.types'

export * from './security/permissionGrant.schema'
export type * from './security/permissionGrant.types'

export * from '../generated/permissionGrant.json-schema'
// ==========================================
// ADAPTER DOMAIN (G-009 & G-010)
// ==========================================

// Route Adapter (G-010)
export * from './adapter/routeAdapter.schema'
export type * from './adapter/routeAdapter.types'
export * from '../generated/routeAdapter.json-schema'

// Collector Contract (G-011)
export * from './core/collector.schema'
export type * from './core/collector.types'
export * from '../generated/collector.json-schema'

// Site Workspace Adapter (G-009)
export * from './adapter/siteWorkspaceAdapter.schema'
export type * from './adapter/siteWorkspaceAdapter.types'
export * from '../generated/siteWorkspaceAdapter.json-schema'

// Data Projection Contract (G-012)
export * from './core/dataProjection.schema'
export type * from './core/dataProjection.types'
export * from '../generated/dataProjection.json-schema'

// ==========================================
// SDK DOMAIN (G-018)
// ==========================================
// SDK Configuration
export * from './sdk/sdkConfiguration.schema'
export type * from './sdk/sdkConfiguration.types'
export * from '../generated/sdkConfiguration.json-schema'
export * from './lifecycle/featureLifecycle.schema'
export type * from './lifecycle/featureLifecycle.types'

export * from '../generated/featureLifecycle.json-schema'

export * from './ai'

export * from '../generated/generationContext.json-schema'
export * from '../generated/featurePlan.json-schema'

export * from './bridge'

// JSON Schemas
export * from '../generated/generationContext.json-schema'
export * from '../generated/featurePlan.json-schema'
export * from '../generated/microAppSpec.json-schema'

export * from './primitives'

export * from '../generated/compatibilityMatrix.json-schema'

export type * from './platform/compatibilityMatrix.types'
export * from './platform/compatibilityMatrix.schema'

export type * from './runtime/runtimeHealth.types'
export * from './runtime/runtimeHealth.schema'

export * from './registry'
