import { clone, expectSchemaToFail, expectSchemaToPass, jsonRoundTrip } from '@novus/shared/testing'
import { describe, expect, it } from 'vitest'

import activeFixture from '../../../fixtures/lifecycle/golden/lifecycle.active.json'
import errorFixture from '../../../fixtures/lifecycle/golden/lifecycle.error.json'
import { FeatureLifecycleSchema } from '../../../src/lifecycle/featureLifecycle.schema'

describe('FeatureLifecycle Serialization', () => {
  describe('json round-trip', () => {
    it('preserves an active lifecycle', () => {
      expectSchemaToPass(FeatureLifecycleSchema, jsonRoundTrip(clone(activeFixture)))
    })

    it('preserves an error lifecycle', () => {
      expectSchemaToPass(FeatureLifecycleSchema, jsonRoundTrip(clone(errorFixture)))
    })
  })

  describe('state preservation', () => {
    it('preserves the runtime state', () => {
      const lifecycle = jsonRoundTrip(clone(activeFixture))

      expect(lifecycle.currentState).toBe(activeFixture.currentState)
    })

    it('preserves transition timestamps', () => {
      const lifecycle = jsonRoundTrip(clone(activeFixture))

      expect(lifecycle.lastTransitionedAt).toBe(activeFixture.lastTransitionedAt)
    })

    it('preserves mount telemetry', () => {
      const lifecycle = jsonRoundTrip(clone(activeFixture))

      expect(lifecycle.mountCount).toBe(activeFixture.mountCount)
    })

    it('preserves runtime diagnostics', () => {
      const lifecycle = jsonRoundTrip(clone(errorFixture))

      expect(lifecycle.errorCode).toBe(errorFixture.errorCode)

      expect(lifecycle.errorMessage).toBe(errorFixture.errorMessage)
    })
  })

  describe('serialization safety', () => {
    it('rejects corrupted serialized state', () => {
      const lifecycle = jsonRoundTrip(clone(activeFixture))

      lifecycle.mountCount = 'five' as never

      expectSchemaToFail(FeatureLifecycleSchema, lifecycle)
    })

    it('rejects corrupted runtime state', () => {
      const lifecycle = jsonRoundTrip(clone(activeFixture))

      lifecycle.currentState = 'RUNNING'

      expectSchemaToFail(FeatureLifecycleSchema, lifecycle)
    })
  })
})
