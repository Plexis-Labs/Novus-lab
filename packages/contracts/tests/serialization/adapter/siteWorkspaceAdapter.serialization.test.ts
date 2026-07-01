import { jsonRoundTrip, expectSchemaToPass } from '@novus/shared/testing'
import { describe, it, expect } from 'vitest'

import { validSiteWorkspaceAdapter } from '../../../fixtures/adapter/golden/siteWorkspaceAdapter.valid'
import { siteWorkspaceAdapterSchema } from '../../../src/adapter/siteWorkspaceAdapter.schema'

describe('SiteWorkspaceAdapter Serialization', () => {
  it('✅ survives a JSON stringify/parse cycle without data loss', () => {
    const serializedPayload = jsonRoundTrip(validSiteWorkspaceAdapter)

    // Ensure it still passes schema validation after transit
    expectSchemaToPass(siteWorkspaceAdapterSchema, serializedPayload)

    // Ensure exact deep equality
    expect(serializedPayload).toEqual(validSiteWorkspaceAdapter)
  })
})
