import { clone, expectSchemaToFail, expectSchemaToPass } from '@novus/shared/testing'
import { describe, it } from 'vitest'

import checklistFixture from '../../../fixtures/ai/golden/microAppSpec.checklist.json'
import metricsFixture from '../../../fixtures/ai/golden/microAppSpec.metrics.json'
import { MicroAppSpecSchema } from '../../../src/ai/microAppSpec.schema'

function createChecklistFixture(): typeof checklistFixture {
  return clone(checklistFixture)
}

function createMetricsFixture(): typeof metricsFixture {
  return clone(metricsFixture)
}

describe('MicroAppSpec Contract', () => {
  describe('golden fixtures', () => {
    it('accepts the checklist specification', () => {
      expectSchemaToPass(MicroAppSpecSchema, createChecklistFixture())
    })

    it('accepts the metrics specification', () => {
      expectSchemaToPass(MicroAppSpecSchema, createMetricsFixture())
    })
  })

  describe('view invariants', () => {
    it('rejects duplicate view identifiers', () => {
      const spec = createChecklistFixture()

      spec.views.push({
        ...clone(spec.views[0]),
      })

      expectSchemaToFail(MicroAppSpecSchema, spec)
    })

    it('requires defaultViewId to reference an existing view', () => {
      const spec = createChecklistFixture()

      spec.defaultViewId = 'dashboard'

      expectSchemaToFail(MicroAppSpecSchema, spec)
    })

    it('accepts a valid default view reference', () => {
      expectSchemaToPass(MicroAppSpecSchema, createChecklistFixture())
    })
  })

  describe('widget invariants', () => {
    it('rejects duplicate widget identifiers', () => {
      const spec = createChecklistFixture()

      spec.views[0].widgets.push({
        ...clone(spec.views[0].widgets[0]),
      })

      expectSchemaToFail(MicroAppSpecSchema, spec)
    })

    it('accepts unique widget identifiers', () => {
      expectSchemaToPass(MicroAppSpecSchema, createChecklistFixture())
    })
  })
})
