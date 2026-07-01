import { createContractTestSuite } from '@novus/shared/testing'
import { describe, it, expect } from 'vitest'

// Import schemas
import { validSiteWorkspaceAdapter } from '../fixtures/adapter/golden/siteWorkspaceAdapter.valid'
import { validCollectorState } from '../fixtures/core/golden/collector.valid'
import { validDataProjection } from '../fixtures/core/golden/dataProjection.valid'
import { siteWorkspaceAdapterSchema } from '../src/adapter/siteWorkspaceAdapter.schema'
import { collectorSchema } from '../src/core/collector.schema'
import { dataProjectionSchema } from '../src/core/dataProjection.schema'

// Import fixtures

describe('Novus Global Contract Test Suite Engine', () => {
  // Register G-009 Site Workspace Adapter
  createContractTestSuite({
    vitestContext: { describe, it, expect },
    name: 'SiteWorkspaceAdapter (G-009)',
    schema: siteWorkspaceAdapterSchema,
    goldenFixtures: [validSiteWorkspaceAdapter],
    invalidFixtures: [
      { ...validSiteWorkspaceAdapter, health: 'malfunctional' }, // Bad enum
      { ...validSiteWorkspaceAdapter, version: 'not-semver' }, // Bad version
    ],
    edgeCases: [],
  })

  // Register G-011 Collector State
  createContractTestSuite({
    vitestContext: { describe, it, expect },
    name: 'CollectorState (G-011)',
    schema: collectorSchema,
    goldenFixtures: [validCollectorState],
    invalidFixtures: [
      { ...validCollectorState, coverage: -5 }, // Under minimum
      { ...validCollectorState, coverage: 120 }, // Over maximum
    ],
    edgeCases: [],
  })

  // Register G-012 Data Projection
  createContractTestSuite({
    vitestContext: { describe, it, expect },
    name: 'DataProjection (G-012)',
    schema: dataProjectionSchema,
    goldenFixtures: [validDataProjection],
    invalidFixtures: [{ ...validDataProjection, projection: { mode: 'invalid-mode' } }],
    edgeCases: [],
  })
})
