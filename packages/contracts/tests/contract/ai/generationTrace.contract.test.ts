import {
  expectSchemaToPass,
  expectSchemaToFail,
  jsonRoundTrip,
  asUnknown,
} from '@novus/shared/testing'
import { describe, it } from 'vitest'

import { createGenerationTraceFixture } from '../../../fixtures/ai/generationTrace.fixture'
import { GenerationTraceSchema } from '../../../src/ai/generationTrace.schema'

describe('GenerationTrace Contract', () => {
  describe('golden fixtures', () => {
    it('accepts a successful generation trace', () => {
      expectSchemaToPass(GenerationTraceSchema, jsonRoundTrip(createGenerationTraceFixture()))
    })

    it('accepts a failed generation trace', () => {
      const trace = createGenerationTraceFixture()

      trace.outcome.status = 'generation_failed'

      trace.outcome.failureCode = 'TOKEN_LIMIT'

      delete trace.metrics
      delete trace.evaluation
      delete trace.artifact.artifactSourceHash

      expectSchemaToPass(GenerationTraceSchema, jsonRoundTrip(trace))
    })
  })

  describe('privacy enforcement', () => {
    it('rejects diagnostic prompts without explicit opt-in', () => {
      expectSchemaToFail(
        GenerationTraceSchema,
        asUnknown({
          ...createGenerationTraceFixture(),
          privacy: {
            ...createGenerationTraceFixture().privacy,
            hasUserOptIn: false,
            diagnosticPrompt: 'Sensitive prompt',
          },
        }),
      )
    })

    it('accepts diagnostic prompts when opted in', () => {
      expectSchemaToPass(
        GenerationTraceSchema,
        jsonRoundTrip({
          ...createGenerationTraceFixture(),
          privacy: {
            ...createGenerationTraceFixture().privacy,
            hasUserOptIn: true,
            diagnosticPrompt: 'Sensitive prompt',
          },
        }),
      )
    })
  })

  describe('strict schema enforcement', () => {
    it('rejects attempts to include raw HTML', () => {
      expectSchemaToFail(
        GenerationTraceSchema,
        asUnknown({
          ...createGenerationTraceFixture(),
          rawHtml: '<div>secret</div>',
        }),
      )
    })

    it('rejects attempts to include workspace data', () => {
      expectSchemaToFail(
        GenerationTraceSchema,
        asUnknown({
          ...createGenerationTraceFixture(),
          workspaceData: {
            notes: 'private',
          },
        }),
      )
    })

    it('rejects attempts to include browser events', () => {
      expectSchemaToFail(
        GenerationTraceSchema,
        asUnknown({
          ...createGenerationTraceFixture(),
          event: {
            target: {},
          },
        }),
      )
    })
  })
})
