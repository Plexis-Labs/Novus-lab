import { expectSchemaToPass, jsonRoundTrip } from '@novus/shared/testing'
import { describe, expect, it } from 'vitest'

import { createGenerationTraceFixture } from '../../../fixtures/ai/generationTrace.fixture'
import { GenerationTraceSchema } from '../../../src/ai/generationTrace.schema'

describe('GenerationTrace Serialization', () => {
  it('survives a JSON serialization round-trip', () => {
    const original = createGenerationTraceFixture()

    const parsed = GenerationTraceSchema.parse(jsonRoundTrip(original))

    expect(parsed).toStrictEqual(original)
  })

  it('preserves optional fields during serialization', () => {
    const trace = createGenerationTraceFixture()

    delete trace.metrics
    delete trace.evaluation
    delete trace.artifact.artifactSourceHash

    trace.outcome.status = 'generation_failed'

    trace.outcome.failureCode = 'TOKEN_LIMIT'

    const parsed = GenerationTraceSchema.parse(jsonRoundTrip(trace))

    expect(parsed).toStrictEqual(trace)
  })

  it('preserves diagnostic prompts for opted-in users', () => {
    const trace = createGenerationTraceFixture()

    trace.privacy.hasUserOptIn = true

    trace.privacy.diagnosticPrompt = 'Generate a review checklist.'

    const parsed = GenerationTraceSchema.parse(jsonRoundTrip(trace))

    expect(parsed).toStrictEqual(trace)
  })
})

it('applies privacy defaults after serialization', () => {
  const trace = createGenerationTraceFixture()

  //FIX TO DELETE OPERAND SHOULD ONLY BE USED WITH NON OPTIONAL PROPERIES
  expectSchemaToPass(
    GenerationTraceSchema,
    jsonRoundTrip({
      ...createGenerationTraceFixture(),
      privacy: {
        ...createGenerationTraceFixture().privacy,
        hasUserOptIn: undefined,
      },
    }),
  )

  const parsed = GenerationTraceSchema.parse(jsonRoundTrip(trace))

  expect(parsed.privacy.hasUserOptIn).toBe(false)
})
