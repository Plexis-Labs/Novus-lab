import { describe, it, expect } from 'vitest'

import { validRouteAdapter } from '../../../fixtures/adapter/golden/routeAdapter.valid'
import { invalidRouteAdapter } from '../../../fixtures/adapter/invalid/routeAdapter.invalid'
import { routeAdapterSchema } from '../../../src/adapter/routeAdapter.schema'

describe('G-010: RouteAdapter Unit', () => {
  it('validates a correct payload', () => {
    const result = routeAdapterSchema.safeParse(validRouteAdapter)
    expect(result.success).toBe(true)
  })

  it('rejects an invalid payload', () => {
    const result = routeAdapterSchema.safeParse(invalidRouteAdapter)
    expect(result.success).toBe(false)
  })
})
