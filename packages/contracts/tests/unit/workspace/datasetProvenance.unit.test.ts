import { describe, it, expect } from 'vitest'

import { validDatasetProvenance } from '../../../fixtures/workspace/golden/datasetProvenance.valid'
import { invalidDatasetProvenance } from '../../../fixtures/workspace/invalid/datasetProvenance.invalid'
import { datasetProvenanceSchema } from '../../../src/workspace/datasetProvenance.schema'

describe('G-008: DatasetProvenance Unit', () => {
  it('✅ validates a correct provenance payload', () => {
    const result = datasetProvenanceSchema.safeParse(validDatasetProvenance)
    expect(result.success).toBe(true)
  })

  it('❌ rejects an invalid provenance payload', () => {
    const result = datasetProvenanceSchema.safeParse(invalidDatasetProvenance)
    expect(result.success).toBe(false)
  })
})
