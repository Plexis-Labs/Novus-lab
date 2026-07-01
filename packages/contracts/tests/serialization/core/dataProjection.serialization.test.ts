import { jsonRoundTrip, expectSchemaToPass } from '@novus/shared/testing'
import { describe, it, expect } from 'vitest'

import { validDataProjection } from '../../../fixtures/core/golden/dataProjection.valid'
import { dataProjectionSchema } from '../../../src/core/dataProjection.schema'

describe('DataProjection Serialization', () => {
  it('✅ survives a JSON stringify/parse cycle without data loss', () => {
    const serializedPayload = jsonRoundTrip(validDataProjection)
    expectSchemaToPass(dataProjectionSchema, serializedPayload)
    expect(serializedPayload).toEqual(validDataProjection)
  })
})
