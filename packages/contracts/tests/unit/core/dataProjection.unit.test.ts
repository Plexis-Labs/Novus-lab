import { expectSchemaToPass, expectSchemaToFail, omit } from '@novus/shared/testing'
import { describe, it } from 'vitest'

import { validDataProjection } from '../../../fixtures/core/golden/dataProjection.valid'
import { dataProjectionSchema } from '../../../src/core/dataProjection.schema'

describe('G-012: DataProjection Unit', () => {
  it('✅ passes a valid golden payload', () => {
    expectSchemaToPass(dataProjectionSchema, validDataProjection)
  })

  it('❌ fails when a required block is missing', () => {
    const invalidPayload = omit(validDataProjection, 'allowedFields')
    expectSchemaToFail(dataProjectionSchema, invalidPayload)
  })

  it('❌ fails with an invalid projection mode', () => {
    const invalidPayload = { ...validDataProjection, projection: { mode: 'chaotic' } }
    expectSchemaToFail(dataProjectionSchema, invalidPayload)
  })
})
