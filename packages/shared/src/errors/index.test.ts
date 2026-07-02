import { describe, expect, it } from 'vitest'

import { AdapterError, DeveloperError, isNovusError, ValidationError } from './index.js'

describe('typed errors', () => {
  it('creates typed errors with expected metadata', () => {
    const error = new DeveloperError('Bad developer action', { feature: 'demo' })

    expect(error.code).toBe('DEVELOPER_ERROR')
    expect(error.status).toBe(500)
    expect(error.context).toEqual({ feature: 'demo' })
    expect(isNovusError(error)).toBe(true)
  })

  it('supports validation failures with a 400 status', () => {
    const error = new ValidationError('Invalid manifest', { field: 'name' })

    expect(error.code).toBe('VALIDATION_ERROR')
    expect(error.status).toBe(400)
  })

  it('supports adapter failures with a 502 status', () => {
    const error = new AdapterError('Adapter unavailable', { route: '/pulls' })

    expect(error.code).toBe('ADAPTER_ERROR')
    expect(error.status).toBe(502)
  })
})
