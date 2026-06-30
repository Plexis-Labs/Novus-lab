import { describe, it, expect } from 'vitest'

import {
  validWorkspaceDataset,
  invalidWorkspaceDataset,
} from '../../../fixtures/workspace/workspaceDataset.fixtures'
import { workspaceDatasetSchema } from '../../../src/workspace/workspaceDataset.schema'

describe('G-007: WorkspaceDataset Contract', () => {
  it('✅ should validate a correct dataset payload', () => {
    const result = workspaceDatasetSchema.safeParse(validWorkspaceDataset)
    expect(result.success).toBe(true)
  })

  it('❌ should reject an invalid dataset and catch business logic errors', () => {
    const result = workspaceDatasetSchema.safeParse(invalidWorkspaceDataset)

    expect(result.success).toBe(false)

    if (!result.success) {
      const errors = result.error.format()
      expect(errors.version?._errors).toBeDefined()
      expect(errors.entity?._errors).toBeDefined()
      expect(errors.coverage?.extractedCount?._errors).toBeDefined() // Catches the mathematical refine error
      expect(errors.records?._errors).toBeDefined()
    }
  })
})
