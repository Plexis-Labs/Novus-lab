import { clone, omit } from '@novus/shared/testing'
import { describe, expect, it } from 'vitest'

import activeFixture from '../../../fixtures/lifecycle/golden/lifecycle.active.json'
import errorFixture from '../../../fixtures/lifecycle/golden/lifecycle.error.json'
import { FeatureLifecycleSchema } from '../../../src/lifecycle/featureLifecycle.schema'

/**
 * Creates an isolated copy of the active lifecycle fixture.
 */
function createActiveLifecycleFixture(): typeof activeFixture {
  return clone(activeFixture)
}

/**
 * Creates an isolated copy of the error lifecycle fixture.
 */
function createErrorLifecycleFixture(): typeof errorFixture {
  return clone(errorFixture)
}

describe('FeatureLifecycleSchema', () => {
  describe('golden paths', () => {
    it('accepts an active lifecycle', () => {
      expect(() => FeatureLifecycleSchema.parse(createActiveLifecycleFixture())).not.toThrow()
    })

    it('accepts an error lifecycle', () => {
      expect(() => FeatureLifecycleSchema.parse(createErrorLifecycleFixture())).not.toThrow()
    })
  })

  describe('feature identity', () => {
    it('rejects an invalid featureId', () => {
      const lifecycle = createActiveLifecycleFixture()

      lifecycle.featureId = 'invalid'

      expect(() => FeatureLifecycleSchema.parse(lifecycle)).toThrow()
    })

    it('rejects a missing featureId', () => {
      expect(() =>
        FeatureLifecycleSchema.parse(omit(createActiveLifecycleFixture(), 'featureId')),
      ).toThrow()
    })

    it('rejects a non-positive featureVersion', () => {
      const lifecycle = createActiveLifecycleFixture()

      lifecycle.featureVersion = 0

      expect(() => FeatureLifecycleSchema.parse(lifecycle)).toThrow()
    })

    it('rejects a fractional featureVersion', () => {
      const lifecycle = createActiveLifecycleFixture()

      lifecycle.featureVersion = 1.5

      expect(() => FeatureLifecycleSchema.parse(lifecycle)).toThrow()
    })
  })

  describe('runtime state', () => {
    it('rejects an invalid lifecycle state', () => {
      const lifecycle = createActiveLifecycleFixture()

      lifecycle.currentState = 'RUNNING'

      expect(() => FeatureLifecycleSchema.parse(lifecycle)).toThrow()
    })

    it('rejects a missing currentState', () => {
      expect(() =>
        FeatureLifecycleSchema.parse(omit(createActiveLifecycleFixture(), 'currentState')),
      ).toThrow()
    })
  })

  describe('transition timestamps', () => {
    it('rejects a negative transition timestamp', () => {
      const lifecycle = createActiveLifecycleFixture()

      lifecycle.lastTransitionedAt = -1

      expect(() => FeatureLifecycleSchema.parse(lifecycle)).toThrow()
    })

    it('rejects a zero transition timestamp', () => {
      const lifecycle = createActiveLifecycleFixture()

      lifecycle.lastTransitionedAt = 0

      expect(() => FeatureLifecycleSchema.parse(lifecycle)).toThrow()
    })

    it('rejects a fractional transition timestamp', () => {
      const lifecycle = createActiveLifecycleFixture()

      lifecycle.lastTransitionedAt = 123.45

      expect(() => FeatureLifecycleSchema.parse(lifecycle)).toThrow()
    })

    it('rejects a missing transition timestamp', () => {
      expect(() =>
        FeatureLifecycleSchema.parse(omit(createActiveLifecycleFixture(), 'lastTransitionedAt')),
      ).toThrow()
    })
  })

  describe('diagnostic fields', () => {
    it('rejects an empty degradedReason', () => {
      expect(() =>
        FeatureLifecycleSchema.parse({
          ...createActiveLifecycleFixture(),
          degradedReason: '',
        }),
      ).toThrow()
    })

    it('rejects an empty errorCode', () => {
      const lifecycle = createErrorLifecycleFixture()

      lifecycle.errorCode = ''

      expect(() => FeatureLifecycleSchema.parse(lifecycle)).toThrow()
    })

    it('rejects an empty errorMessage', () => {
      const lifecycle = createErrorLifecycleFixture()

      lifecycle.errorMessage = ''

      expect(() => FeatureLifecycleSchema.parse(lifecycle)).toThrow()
    })
  })

  describe('mount telemetry', () => {
    it('accepts mountCount of zero', () => {
      const lifecycle = createActiveLifecycleFixture()

      lifecycle.mountCount = 0

      expect(() => FeatureLifecycleSchema.parse(lifecycle)).not.toThrow()
    })

    it('rejects a negative mountCount', () => {
      const lifecycle = createActiveLifecycleFixture()

      lifecycle.mountCount = -1

      expect(() => FeatureLifecycleSchema.parse(lifecycle)).toThrow()
    })

    it('rejects a fractional mountCount', () => {
      const lifecycle = createActiveLifecycleFixture()

      lifecycle.mountCount = 1.5

      expect(() => FeatureLifecycleSchema.parse(lifecycle)).toThrow()
    })

    it('defaults mountCount when omitted', () => {
      const parsed = FeatureLifecycleSchema.parse(
        omit(createActiveLifecycleFixture(), 'mountCount'),
      )

      expect(parsed.mountCount).toBe(0)
    })
  })

  describe('strict mode', () => {
    it('rejects unknown properties', () => {
      const lifecycle = {
        ...createActiveLifecycleFixture(),
        injected: true,
      }

      expect(() => FeatureLifecycleSchema.parse(lifecycle)).toThrow()
    })
  })
})
