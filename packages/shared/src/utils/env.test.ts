import path from 'node:path'

import { describe, expect, it } from 'vitest'

import { loadEnvironment } from './env.js'
import { ValidationError } from '../errors/index.js'

describe('loadEnvironment', () => {
  it('loads values from a .env file and process environment', () => {
    const env = loadEnvironment({
      cwd: path.resolve(process.cwd(), '..', '..'),
      env: {
        NOVUS_ENV: 'production',
        NOVUS_AI_PROVIDER: 'mock',
      },
    })

    expect(env.NOVUS_ENV).toBe('development')
    expect(env.NOVUS_AI_PROVIDER).toBe('mock')
    expect(env.NOVUS_STORAGE_ADAPTER).toBe('mock')
  })

  it('rejects invalid environment values', () => {
    expect(() =>
      loadEnvironment({
        env: {
          NOVUS_ENV: 'invalid',
        },
      }),
    ).toThrow()
  })

  it('fails fast when a provider API key is required but missing', () => {
    try {
      loadEnvironment({
        env: {
          NOVUS_AI_PROVIDER: 'openai',
        },
      })
      throw new Error('Expected loadEnvironment to throw a ValidationError')
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError)
      expect((error as Error).message).toBe('Missing required environment variable.')
    }
  })
})
