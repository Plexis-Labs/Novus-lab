import { describe, it, expect } from 'vitest'

import { validFeatureManifest, invalidFeatureManifest } from '../fixtures'
import { featureManifestSchema } from '../schemas'

describe('G-002: FeatureManifest Contract', () => {
  it('✅ should validate a correct feature manifest (Golden Fixture)', () => {
    const result = featureManifestSchema.safeParse(validFeatureManifest)
    expect(result.success).toBe(true)
  })

  it('❌ should reject an invalid feature manifest and catch all errors', () => {
    const result = featureManifestSchema.safeParse(invalidFeatureManifest)

    // Ensure it fails
    expect(result.success).toBe(false)

    // Ensure it catches every specific rule violation we set up
    if (!result.success) {
      const errors = result.error.format()
      expect(errors.id?._errors).toBeDefined()
      expect(errors.version?._errors).toBeDefined()
      expect(errors.name?._errors).toBeDefined()
      expect(errors.entryPoint?._errors).toBeDefined()
    }
  })
})
