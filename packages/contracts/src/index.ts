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

// ==========================================
// ADAPTER DOMAIN (G-010: Route Adapter)
// ==========================================
export * from './adapter/routeAdapter.schema'
export type * from './adapter/routeAdapter.types'
export * from '../generated/routeAdapter.json-schema'
export * from './bridge/index'

// Collector Contract (G-011)
export * from './core/collector.schema'
export type * from './core/collector.types'
export * from '../generated/collector.json-schema'
