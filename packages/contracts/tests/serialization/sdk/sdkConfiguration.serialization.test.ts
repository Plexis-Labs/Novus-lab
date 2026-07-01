import { jsonRoundTrip, expectSchemaToPass } from '@novus/shared/testing'
import { describe, it, expect } from 'vitest'

import { validSdkConfiguration } from '../../../fixtures/sdk/golden/sdkConfiguration.valid'
import { sdkConfigurationSchema } from '../../../src/sdk/sdkConfiguration.schema'

describe('SdkConfiguration Serialization', () => {
  it('✅ survives a JSON stringify/parse cycle without data loss', () => {
    const serializedPayload = jsonRoundTrip(validSdkConfiguration)
    expectSchemaToPass(sdkConfigurationSchema, serializedPayload)
    expect(serializedPayload).toEqual(validSdkConfiguration)
  })
})
