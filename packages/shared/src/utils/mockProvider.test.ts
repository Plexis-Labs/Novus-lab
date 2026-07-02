import { describe, expect, it } from 'vitest'

import { generateMockResponse } from './mockProvider.js'

describe('mock provider', () => {
  it('returns a deterministic mock response payload', () => {
    const response = generateMockResponse({ prompt: 'hello' })

    expect(response.provider).toBe('mock')
    expect(response.content).toContain('hello')
  })
})
