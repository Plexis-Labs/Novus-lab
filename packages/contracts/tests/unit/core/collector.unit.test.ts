import { expectSchemaToPass, expectSchemaToFail, omit } from '@novus/shared/testing'
import { describe, it } from 'vitest'

import { validCollectorState } from '../../../fixtures/core/golden/collector.valid'
import { collectorSchema } from '../../../src/core/collector.schema'

describe('G-011: Collector Unit', () => {
  it('✅ passes a valid golden payload', () => {
    expectSchemaToPass(collectorSchema, validCollectorState)
  })

  it('✅ passes with a cancellation payload', () => {
    const cancelledState = {
      ...validCollectorState,
      progress: { ...validCollectorState.progress, status: 'paused' as const },
      cancellation: { requestedAt: new Date().toISOString(), reason: 'User requested abort' },
    }
    expectSchemaToPass(collectorSchema, cancelledState)
  })

  it('❌ fails when coverage is out of bounds', () => {
    const invalidPayload = { ...validCollectorState, coverage: 150 } // Max is 100
    expectSchemaToFail(collectorSchema, invalidPayload)
  })

  it('❌ fails when a required block is missing', () => {
    const invalidPayload = omit(validCollectorState, 'progress')
    expectSchemaToFail(collectorSchema, invalidPayload)
  })
})
