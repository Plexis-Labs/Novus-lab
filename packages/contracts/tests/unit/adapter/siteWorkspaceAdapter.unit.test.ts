import { expectSchemaToPass, expectSchemaToFail, omit } from '@novus/shared/testing'
import { describe, it } from 'vitest'

import { validSiteWorkspaceAdapter } from '../../../fixtures/adapter/golden/siteWorkspaceAdapter.valid'
import { siteWorkspaceAdapterSchema } from '../../../src/adapter/siteWorkspaceAdapter.schema'

describe('G-009: SiteWorkspaceAdapter Unit', () => {
  it('✅ passes a valid golden payload', () => {
    expectSchemaToPass(siteWorkspaceAdapterSchema, validSiteWorkspaceAdapter)
  })

  it('❌ fails when a required field is missing', () => {
    // dynamically drop the "entities" field to test invalidation!
    const invalidPayload = omit(validSiteWorkspaceAdapter, 'entities')
    expectSchemaToFail(siteWorkspaceAdapterSchema, invalidPayload)
  })

  it('❌ fails with invalid health status', () => {
    const invalidPayload = { ...validSiteWorkspaceAdapter, health: 'broken' }
    expectSchemaToFail(siteWorkspaceAdapterSchema, invalidPayload)
  })
})
