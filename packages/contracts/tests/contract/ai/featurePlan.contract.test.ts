import { asUnknown, clone, expectSchemaToFail, expectSchemaToPass } from '@novus/shared/testing'
import { describe, it } from 'vitest'

import feasibleFixture from '../../../fixtures/ai/golden/featurePlan.feasible.json'
import infeasibleFixture from '../../../fixtures/ai/golden/featurePlan.infeasible.json'
import partialFixture from '../../../fixtures/ai/golden/featurePlan.partial.json'
import { FeaturePlanSchema } from '../../../src/ai/featurePlan.schema'

function createFeasiblePlanFixture(): typeof feasibleFixture {
  return clone(feasibleFixture)
}

function createPartialPlanFixture(): typeof partialFixture {
  return clone(partialFixture)
}

function createInfeasiblePlanFixture(): typeof infeasibleFixture {
  return clone(infeasibleFixture)
}

describe('FeaturePlan Contract', () => {
  describe('golden fixtures', () => {
    it('accepts a feasible feature plan', () => {
      expectSchemaToPass(FeaturePlanSchema, createFeasiblePlanFixture())
    })

    it('accepts a partial feature plan', () => {
      expectSchemaToPass(FeaturePlanSchema, createPartialPlanFixture())
    })

    it('accepts an infeasible feature plan', () => {
      expectSchemaToPass(FeaturePlanSchema, createInfeasiblePlanFixture())
    })
  })

  describe('feasibility variants', () => {
    it('rejects a partial plan without limitations', () => {
      expectSchemaToFail(
        FeaturePlanSchema,
        asUnknown({
          ...createPartialPlanFixture(),
          feasibility: {
            status: 'partial',
          },
        }),
      )
    })

    it('rejects an infeasible plan without a reason', () => {
      expectSchemaToFail(
        FeaturePlanSchema,
        asUnknown({
          ...createInfeasiblePlanFixture(),
          feasibility: {
            status: 'infeasible',
          },
        }),
      )
    })

    it('rejects a feasible plan containing limitations', () => {
      expectSchemaToFail(
        FeaturePlanSchema,
        asUnknown({
          ...createFeasiblePlanFixture(),
          feasibility: {
            status: 'feasible',
            limitations: ['Unexpected limitation'],
          },
        }),
      )
    })

    it('rejects a feasible plan containing a rejection reason', () => {
      expectSchemaToFail(
        FeaturePlanSchema,
        asUnknown({
          ...createFeasiblePlanFixture(),
          feasibility: {
            status: 'feasible',
            reason: 'Should not exist',
          },
        }),
      )
    })
  })

  describe('collection planning invariants', () => {
    it('requires collection when requesting a complete dataset', () => {
      const plan = createFeasiblePlanFixture()

      plan.dataRequirements.needsCollection = false
      plan.dataRequirements.needsCompleteDataset = true

      expectSchemaToFail(FeaturePlanSchema, plan)
    })

    it('rejects estimatedPages when collection is disabled', () => {
      const plan = createFeasiblePlanFixture()

      plan.dataRequirements.needsCollection = false

      expectSchemaToFail(FeaturePlanSchema, plan)
    })

    it('requires estimatedPages when collection is enabled', () => {
      expectSchemaToFail(
        FeaturePlanSchema,
        asUnknown({
          ...createFeasiblePlanFixture(),
          dataRequirements: {
            ...createFeasiblePlanFixture().dataRequirements,
            estimatedPages: undefined,
          },
        }),
      )
    })

    it('requires estimatedRecords when collection is enabled', () => {
      expectSchemaToFail(
        FeaturePlanSchema,
        asUnknown({
          ...createFeasiblePlanFixture(),
          dataRequirements: {
            ...createFeasiblePlanFixture().dataRequirements,
            estimatedRecords: undefined,
          },
        }),
      )
    })

    it('requires estimatedRecords when collection is enabled', () => {
      const plan = createFeasiblePlanFixture()

      delete (plan.dataRequirements as { estimatedRecords?: number }).estimatedRecords

      expectSchemaToFail(FeaturePlanSchema, plan)
    })

    it('accepts a collection plan with both estimates', () => {
      expectSchemaToPass(FeaturePlanSchema, createFeasiblePlanFixture())
    })
  })

  describe('partial dataset invariants', () => {
    it('rejects complete dataset requests that allow partial data', () => {
      const plan = createPartialPlanFixture()

      plan.dataRequirements.partialDataAllowed = true

      expectSchemaToFail(FeaturePlanSchema, plan)
    })

    it('accepts complete datasets when partial data is disallowed', () => {
      expectSchemaToPass(FeaturePlanSchema, createPartialPlanFixture())
    })
  })

  describe('planner integrity', () => {
    it('rejects unknown top-level planner fields', () => {
      expectSchemaToFail(
        FeaturePlanSchema,
        asUnknown({
          ...createFeasiblePlanFixture(),
          confidence: 0.98,
        }),
      )
    })

    it('rejects unknown feasibility fields', () => {
      expectSchemaToFail(
        FeaturePlanSchema,
        asUnknown({
          ...createFeasiblePlanFixture(),
          feasibility: {
            status: 'feasible',
            analysis: 'Internal planner reasoning',
          },
        }),
      )
    })

    it('rejects unknown data requirement fields', () => {
      expectSchemaToFail(
        FeaturePlanSchema,
        asUnknown({
          ...createFeasiblePlanFixture(),
          dataRequirements: {
            ...createFeasiblePlanFixture().dataRequirements,
            cacheHint: true,
          },
        }),
      )
    })

    it('accepts the canonical planner output', () => {
      expectSchemaToPass(FeaturePlanSchema, createFeasiblePlanFixture())
    })
  })
})
