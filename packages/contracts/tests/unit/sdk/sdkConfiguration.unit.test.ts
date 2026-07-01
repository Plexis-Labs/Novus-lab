import { expectSchemaToPass, expectSchemaToFail, omit } from '@novus/shared/testing'
import { describe, it } from 'vitest'

import { validSdkConfiguration } from '../../../fixtures/sdk/golden/sdkConfiguration.valid'
import { sdkConfigurationSchema } from '../../../src/sdk/sdkConfiguration.schema'

describe('G-018: SdkConfiguration Unit', () => {
  it('✅ passes a valid golden payload', () => {
    expectSchemaToPass(sdkConfigurationSchema, validSdkConfiguration)
  })

  it('❌ fails when a core SDK namespace block is missing', () => {
    const invalidPayload = omit(validSdkConfiguration, 'workspace')
    expectSchemaToFail(sdkConfigurationSchema, invalidPayload)
  })

  it('❌ fails with a negative storage quota', () => {
    const invalidPayload = {
      ...validSdkConfiguration,
      storage: { enabled: true, quotaMb: -10 },
    }
    expectSchemaToFail(sdkConfigurationSchema, invalidPayload)
  })
})
