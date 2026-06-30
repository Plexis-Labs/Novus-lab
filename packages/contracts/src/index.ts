// G-001: Platform Contracts Entry Point
// Individual contracts will be exported from here as they are built.

// CORE DOMAIN (G-002: Feature Manifest)
export * from './core/featureManifest.schema'
export * from '../fixtures/core/featureManifest.fixtures'

// SECURITY DOMAIN (G-003: Capability Token)
export * from './security/capabilityToken.schema'
export type * from './security/capabilityToken.types'
export * from '../fixtures/security/capabilityToken.fixtures'
export * from './security/capabilityToken.json-schema'

// WORKSPACE DOMAIN (G-007: Workspace Dataset)

export * from './workspace/workspaceDataset.schema'
export * from '../fixtures/workspace/workspaceDataset.fixtures'
