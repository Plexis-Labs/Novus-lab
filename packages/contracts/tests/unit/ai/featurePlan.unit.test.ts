import { clone, omit } from '@novus/shared/testing'
import { describe, expect, it } from 'vitest'

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

describe('FeaturePlanSchema', () => {
  describe('golden paths', () => {
    it('accepts a feasible plan', () => {
      expect(() => FeaturePlanSchema.parse(createFeasiblePlanFixture())).not.toThrow()
    })

    it('accepts a partial plan', () => {
      expect(() => FeaturePlanSchema.parse(createPartialPlanFixture())).not.toThrow()
    })

    it('accepts an infeasible plan', () => {
      expect(() => FeaturePlanSchema.parse(createInfeasiblePlanFixture())).not.toThrow()
    })
  })

  // INTENT
  describe('intent', () => {
    it('rejects an empty intent', () => {
      const plan = createFeasiblePlanFixture()

      plan.intent = ''

      expect(() => FeaturePlanSchema.parse(plan)).toThrow()
    })

    it('rejects a missing intent', () => {
      expect(() => FeaturePlanSchema.parse(omit(createFeasiblePlanFixture(), 'intent'))).toThrow()
    })

    it('rejects an oversized intent', () => {
      const plan = createFeasiblePlanFixture()

      plan.intent = 'A'.repeat(501)

      expect(() => FeaturePlanSchema.parse(plan)).toThrow()
    })
  })

  //NAME
  describe('feature name', () => {
    it('rejects an empty featureName', () => {
      const plan = createFeasiblePlanFixture()

      plan.featureName = ''

      expect(() => FeaturePlanSchema.parse(plan)).toThrow()
    })

    it('rejects an oversized featureName', () => {
      const plan = createFeasiblePlanFixture()

      plan.featureName = 'A'.repeat(81)

      expect(() => FeaturePlanSchema.parse(plan)).toThrow()
    })

    it('rejects a missing featureName', () => {
      expect(() =>
        FeaturePlanSchema.parse(omit(createFeasiblePlanFixture(), 'featureName')),
      ).toThrow()
    })
  })

  // PLANNER METADATA
  describe('planner metadata', () => {
    it('rejects an empty plannerVersion', () => {
      const plan = createFeasiblePlanFixture()

      plan.plannerVersion = ''

      expect(() => FeaturePlanSchema.parse(plan)).toThrow()
    })

    it('rejects an empty plannerModel', () => {
      const plan = createFeasiblePlanFixture()

      plan.plannerModel = ''

      expect(() => FeaturePlanSchema.parse(plan)).toThrow()
    })

    it('rejects a missing plannerVersion', () => {
      expect(() =>
        FeaturePlanSchema.parse(omit(createFeasiblePlanFixture(), 'plannerVersion')),
      ).toThrow()
    })

    it('rejects a missing plannerModel', () => {
      expect(() =>
        FeaturePlanSchema.parse(omit(createFeasiblePlanFixture(), 'plannerModel')),
      ).toThrow()
    })
  })

  // GENERATION MODE
  describe('generation mode', () => {
    it('rejects an unknown generation mode', () => {
      const plan = createFeasiblePlanFixture()

      plan.generationMode = 'magic'

      expect(() => FeaturePlanSchema.parse(plan)).toThrow()
    })

    it('rejects a missing generationMode', () => {
      expect(() =>
        FeaturePlanSchema.parse(omit(createFeasiblePlanFixture(), 'generationMode')),
      ).toThrow()
    })
  })

  describe('data requirements', () => {
    it('rejects a missing dataRequirements object', () => {
      expect(() =>
        FeaturePlanSchema.parse(omit(createFeasiblePlanFixture(), 'dataRequirements')),
      ).toThrow()
    })

    it('rejects a negative estimatedPages value', () => {
      const plan = createFeasiblePlanFixture()

      plan.dataRequirements.estimatedPages = -1

      expect(() => FeaturePlanSchema.parse(plan)).toThrow()
    })

    it('rejects a fractional estimatedPages value', () => {
      const plan = createFeasiblePlanFixture()

      plan.dataRequirements.estimatedPages = 1.5

      expect(() => FeaturePlanSchema.parse(plan)).toThrow()
    })

    it('rejects a negative estimatedRecords value', () => {
      const plan = createFeasiblePlanFixture()

      plan.dataRequirements.estimatedRecords = -10

      expect(() => FeaturePlanSchema.parse(plan)).toThrow()
    })

    it('rejects a fractional estimatedRecords value', () => {
      const plan = createFeasiblePlanFixture()

      plan.dataRequirements.estimatedRecords = 25.5

      expect(() => FeaturePlanSchema.parse(plan)).toThrow()
    })
  })

  describe('planner collections', () => {
    it('accepts an empty requiredEntities array', () => {
      const plan = createFeasiblePlanFixture()

      plan.requiredEntities = []

      expect(() => FeaturePlanSchema.parse(plan)).not.toThrow()
    })

    it('accepts an empty requestedCapabilities array', () => {
      const plan = createFeasiblePlanFixture()

      plan.requestedCapabilities = []

      expect(() => FeaturePlanSchema.parse(plan)).not.toThrow()
    })

    it('rejects an empty entity identifier', () => {
      const plan = createFeasiblePlanFixture()

      plan.requiredEntities = ['']

      expect(() => FeaturePlanSchema.parse(plan)).toThrow()
    })

    it('rejects an empty capability identifier', () => {
      const plan = createFeasiblePlanFixture()

      plan.requestedCapabilities = ['']

      expect(() => FeaturePlanSchema.parse(plan)).toThrow()
    })
  })

  describe('strict mode', () => {
    it('rejects unknown top-level properties', () => {
      const plan = {
        ...createFeasiblePlanFixture(),
        confidence: 0.98,
      }

      expect(() => FeaturePlanSchema.parse(plan)).toThrow()
    })

    it('rejects unknown nested data requirement properties', () => {
      const plan = {
        ...createFeasiblePlanFixture(),
        dataRequirements: {
          ...createFeasiblePlanFixture().dataRequirements,
          cacheHint: true,
        },
      }

      expect(() => FeaturePlanSchema.parse(plan)).toThrow()
    })

    it('rejects unknown feasibility properties', () => {
      const plan = {
        ...createFeasiblePlanFixture(),
        feasibility: {
          status: 'feasible',
          confidence: 100,
        },
      }

      expect(() => FeaturePlanSchema.parse(plan)).toThrow()
    })
  })
})
