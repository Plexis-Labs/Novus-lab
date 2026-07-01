import { asUnknown, clone, expectSchemaToFail } from '@novus/shared/testing'
import { describe, it } from 'vitest'

import activeFixture from '../../../fixtures/lifecycle/golden/lifecycle.active.json'
import { FeatureLifecycleSchema } from '../../../src/lifecycle/featureLifecycle.schema'

describe('FeatureLifecycle Security', () => {
  describe('strict mode', () => {
    it('rejects unexpected top-level properties', () => {
      expectSchemaToFail(
        FeatureLifecycleSchema,
        asUnknown({
          ...clone(activeFixture),
          injected: true,
        }),
      )
    })

    it('rejects multiple unexpected properties', () => {
      expectSchemaToFail(
        FeatureLifecycleSchema,
        asUnknown({
          ...clone(activeFixture),
          debug: true,
          runtimeMetadata: {},
          internalState: 'ACTIVE',
        }),
      )
    })
  })

  describe('runtime state integrity', () => {
    it('rejects unknown lifecycle states', () => {
      expectSchemaToFail(
        FeatureLifecycleSchema,
        asUnknown({
          ...clone(activeFixture),
          currentState: 'RUNNING',
        }),
      )
    })

    it('rejects malformed feature identifiers', () => {
      expectSchemaToFail(
        FeatureLifecycleSchema,
        asUnknown({
          ...clone(activeFixture),
          featureId: 'feature-1',
        }),
      )
    })

    it('rejects invalid feature versions', () => {
      expectSchemaToFail(
        FeatureLifecycleSchema,
        asUnknown({
          ...clone(activeFixture),
          featureVersion: -1,
        }),
      )
    })
  })

  describe('telemetry integrity', () => {
    it('rejects negative mount counts', () => {
      expectSchemaToFail(
        FeatureLifecycleSchema,
        asUnknown({
          ...clone(activeFixture),
          mountCount: -1,
        }),
      )
    })

    it('rejects invalid transition timestamps', () => {
      expectSchemaToFail(
        FeatureLifecycleSchema,
        asUnknown({
          ...clone(activeFixture),
          lastTransitionedAt: -100,
        }),
      )
    })
  })

  describe('diagnostic integrity', () => {
    it('rejects stale runtime error diagnostics', () => {
      expectSchemaToFail(
        FeatureLifecycleSchema,
        asUnknown({
          ...clone(activeFixture),
          errorCode: 'RUNTIME_CRASH',
          errorMessage: 'Sandbox failed.',
        }),
      )
    })

    it('rejects conflicting degraded diagnostics', () => {
      expectSchemaToFail(
        FeatureLifecycleSchema,
        asUnknown({
          ...clone(activeFixture),
          currentState: 'ERROR',
          errorCode: 'RUNTIME_CRASH',
          errorMessage: 'Sandbox failed.',
          degradedReason: 'Fallback selector.',
        }),
      )
    })
  })
})
