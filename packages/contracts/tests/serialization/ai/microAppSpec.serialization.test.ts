import { clone, expectSchemaToPass, jsonRoundTrip } from '@novus/shared/testing'
import { describe, it, expect } from 'vitest'

import checklistFixture from '../../../fixtures/ai/golden/microAppSpec.checklist.json'
import metricsFixture from '../../../fixtures/ai/golden/microAppSpec.metrics.json'
import { MicroAppSpecSchema } from '../../../src/ai/microAppSpec.schema'

function createChecklistFixture(): typeof checklistFixture {
  return clone(checklistFixture)
}

function createMetricsFixture(): typeof metricsFixture {
  return clone(metricsFixture)
}

describe('MicroAppSpec Serialization', () => {
  it('round-trips the checklist specification', () => {
    expectSchemaToPass(MicroAppSpecSchema, jsonRoundTrip(createChecklistFixture()))
  })

  it('round-trips the metrics specification', () => {
    expectSchemaToPass(MicroAppSpecSchema, jsonRoundTrip(createMetricsFixture()))
  })
  it('preserves default visibility values', () => {
    const parsed = MicroAppSpecSchema.parse(jsonRoundTrip(createChecklistFixture()))

    expect(parsed.views[0].widgets[0].visibility).toBe('always')
  })

  it('preserves widget discriminated unions', () => {
    const parsed = MicroAppSpecSchema.parse(jsonRoundTrip(createChecklistFixture()))

    expect(parsed.views[0].widgets[0].kind).toBe('text')

    expect(parsed.views[0].widgets[1].kind).toBe('checklist')
  })
  it('preserves feature identity', () => {
    const parsed = MicroAppSpecSchema.parse(jsonRoundTrip(createChecklistFixture()))

    expect(parsed.featureId).toBe(checklistFixture.featureId)

    expect(parsed.schemaVersion).toBe(1)
  })
})
