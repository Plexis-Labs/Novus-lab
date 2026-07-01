import { asUnknown, clone, expectSchemaToFail } from '@novus/shared/testing'
import { describe, it } from 'vitest'

import feasibleFixture from '../../../fixtures/ai/golden/featurePlan.feasible.json'
import { FeaturePlanSchema } from '../../../src/ai/featurePlan.schema'

describe('FeaturePlan Security', () => {
  describe('strict mode', () => {
    it('rejects unexpected top-level properties', () => {
      expectSchemaToFail(
        FeaturePlanSchema,
        asUnknown({
          ...clone(feasibleFixture),
          confidence: 0.98,
        }),
      )
    })

    it('rejects unexpected nested data requirement properties', () => {
      expectSchemaToFail(
        FeaturePlanSchema,
        asUnknown({
          ...clone(feasibleFixture),
          dataRequirements: {
            ...clone(feasibleFixture).dataRequirements,
            cacheHint: true,
          },
        }),
      )
    })

    it('rejects unexpected feasibility properties', () => {
      expectSchemaToFail(
        FeaturePlanSchema,
        asUnknown({
          ...clone(feasibleFixture),
          feasibility: {
            status: 'feasible',
            internalReasoning: 'Planner chain of thought',
          },
        }),
      )
    })
  })

  describe('planner integrity', () => {
    it('rejects unknown generation modes', () => {
      expectSchemaToFail(
        FeaturePlanSchema,
        asUnknown({
          ...clone(feasibleFixture),
          generationMode: 'experimental_pipeline',
        }),
      )
    })

    it('rejects invalid feasibility states', () => {
      expectSchemaToFail(
        FeaturePlanSchema,
        asUnknown({
          ...clone(feasibleFixture),
          feasibility: {
            status: 'maybe',
          },
        }),
      )
    })

    it('rejects malformed planner metadata', () => {
      expectSchemaToFail(
        FeaturePlanSchema,
        asUnknown({
          ...clone(feasibleFixture),
          plannerVersion: 1,
        }),
      )
    })
  })

  describe('collection integrity', () => {
    it('rejects invalid estimated page counts', () => {
      expectSchemaToFail(
        FeaturePlanSchema,
        asUnknown({
          ...clone(feasibleFixture),
          dataRequirements: {
            ...clone(feasibleFixture).dataRequirements,
            estimatedPages: 0,
          },
        }),
      )
    })

    it('rejects invalid estimated record counts', () => {
      expectSchemaToFail(
        FeaturePlanSchema,
        asUnknown({
          ...clone(feasibleFixture),
          dataRequirements: {
            ...clone(feasibleFixture).dataRequirements,
            estimatedRecords: -50,
          },
        }),
      )
    })

    it('rejects malformed entity identifiers', () => {
      expectSchemaToFail(
        FeaturePlanSchema,
        asUnknown({
          ...clone(feasibleFixture),
          requiredEntities: [''],
        }),
      )
    })

    it('rejects malformed capability identifiers', () => {
      expectSchemaToFail(
        FeaturePlanSchema,
        asUnknown({
          ...clone(feasibleFixture),
          requestedCapabilities: [''],
        }),
      )
    })
  })
})
