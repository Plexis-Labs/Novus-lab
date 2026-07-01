import {
  asUnknown,
  clone,
  expectSchemaToFail,
  expectSchemaToPass,
  omit,
} from '@novus/shared/testing'
import { describe, it } from 'vitest'

import activeFixture from '../../../fixtures/lifecycle/golden/lifecycle.active.json'
import errorFixture from '../../../fixtures/lifecycle/golden/lifecycle.error.json'
import missingReasonFixture from '../../../fixtures/lifecycle/invalid/lifecycle.missing-reason.json'
import { FeatureLifecycleSchema } from '../../../src/lifecycle/featureLifecycle.schema'

function createActiveLifecycleFixture(): typeof activeFixture {
  return clone(activeFixture)
}

function createErrorLifecycleFixture(): typeof errorFixture {
  return clone(errorFixture)
}

describe('FeatureLifecycle Contract', () => {
  describe('golden fixtures', () => {
    it('accepts the active lifecycle fixture', () => {
      expectSchemaToPass(FeatureLifecycleSchema, createActiveLifecycleFixture())
    })

    it('accepts the error lifecycle fixture', () => {
      expectSchemaToPass(FeatureLifecycleSchema, createErrorLifecycleFixture())
    })
  })
  describe('error state invariants', () => {
    it('requires an errorCode', () => {
      expectSchemaToFail(FeatureLifecycleSchema, omit(createErrorLifecycleFixture(), 'errorCode'))
    })

    it('requires an errorMessage', () => {
      expectSchemaToFail(
        FeatureLifecycleSchema,
        omit(createErrorLifecycleFixture(), 'errorMessage'),
      )
    })

    it('requires both diagnostics simultaneously', () => {
      expectSchemaToFail(
        FeatureLifecycleSchema,
        omit(omit(createErrorLifecycleFixture(), 'errorCode'), 'errorMessage'),
      )
    })
  })
  describe('degraded state invariants', () => {
    it('requires a degradedReason', () => {
      expectSchemaToFail(FeatureLifecycleSchema, missingReasonFixture)
    })

    it('accepts a degraded lifecycle with a reason', () => {
      expectSchemaToPass(FeatureLifecycleSchema, {
        ...createActiveLifecycleFixture(),
        currentState: 'DEGRADED',
        degradedReason: 'Fallback DOM selectors activated.',
      })
    })
  })

  describe('runtime integrity', () => {
    it('rejects an error lifecycle containing a degradedReason', () => {
      expectSchemaToFail(FeatureLifecycleSchema, {
        ...createErrorLifecycleFixture(),
        degradedReason: 'Fallback selector activated.',
      })
    })

    it('rejects an active lifecycle carrying an errorCode', () => {
      expectSchemaToFail(FeatureLifecycleSchema, {
        ...createActiveLifecycleFixture(),
        errorCode: 'RUNTIME_CRASH',
      })
    })

    it('rejects an active lifecycle carrying an errorMessage', () => {
      expectSchemaToFail(FeatureLifecycleSchema, {
        ...createActiveLifecycleFixture(),
        errorMessage: 'Sandbox initialization failed.',
      })
    })

    it('rejects an active lifecycle carrying complete error diagnostics', () => {
      expectSchemaToFail(FeatureLifecycleSchema, {
        ...createActiveLifecycleFixture(),
        errorCode: 'RUNTIME_CRASH',
        errorMessage: 'Sandbox initialization failed.',
      })
    })

    it('accepts a clean active lifecycle', () => {
      expectSchemaToPass(FeatureLifecycleSchema, createActiveLifecycleFixture())
    })
  })

  describe('object integrity', () => {
    it('rejects unknown properties', () => {
      expectSchemaToFail(
        FeatureLifecycleSchema,
        asUnknown({
          ...createActiveLifecycleFixture(),
          runtimeMetadata: {},
        }),
      )
    })

    it('rejects multiple unknown properties', () => {
      expectSchemaToFail(
        FeatureLifecycleSchema,
        asUnknown({
          ...createActiveLifecycleFixture(),
          runtimeMetadata: {},
          debug: true,
          internalState: 'foo',
        }),
      )
    })

    it('accepts a canonical active lifecycle', () => {
      expectSchemaToPass(FeatureLifecycleSchema, createActiveLifecycleFixture())
    })

    it('accepts a canonical error lifecycle', () => {
      expectSchemaToPass(FeatureLifecycleSchema, createErrorLifecycleFixture())
    })
  })
})
