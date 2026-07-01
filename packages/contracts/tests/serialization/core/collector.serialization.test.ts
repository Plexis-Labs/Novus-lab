import { jsonRoundTrip, expectSchemaToPass } from '@novus/shared/testing'
import { describe, it, expect } from 'vitest'

import { validCollectorState } from '../../../fixtures/core/golden/collector.valid'
import { collectorSchema } from '../../../src/core/collector.schema'

describe('Collector Serialization', () => {
  it('✅ survives a JSON stringify/parse cycle without data loss', () => {
    const serializedPayload = jsonRoundTrip(validCollectorState)
    expectSchemaToPass(collectorSchema, serializedPayload)
    expect(serializedPayload).toEqual(validCollectorState)
  })
})
