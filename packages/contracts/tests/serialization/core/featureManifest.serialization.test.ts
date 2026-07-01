import { jsonRoundTrip, expectSchemaToPass } from '@novus/shared/testing'
import { describe, it, expect } from 'vitest'

import { validFeatureManifest } from '../../../fixtures/core/featureManifest.fixtures'
import { featureManifestSchema } from '../../../src/core/featureManifest.schema'

describe('FeatureManifest Serialization', () => {
  it('✅ survives a JSON stringify/parse cycle without data loss', () => {
    const serializedPayload = jsonRoundTrip(validFeatureManifest)

    // Ensure it still passes schema validation after transit
    expectSchemaToPass(featureManifestSchema, serializedPayload)

    // Ensure exact deep equality
    expect(serializedPayload).toEqual(validFeatureManifest)
  })
})
