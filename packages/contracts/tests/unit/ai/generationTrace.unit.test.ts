import { asUnknown, jsonRoundTrip, expectSchemaToFail } from '@novus/shared/testing'
import { describe, expect, it } from 'vitest'

import { createGenerationTraceFixture } from '../../../fixtures/ai/generationTrace.fixture'
import { GenerationTraceSchema } from '../../../src/ai/generationTrace.schema'

describe('GenerationTraceSchema', () => {
  describe('golden validation', () => {
    it('accepts a valid generation trace', () => {
      expect(() => GenerationTraceSchema.parse(createGenerationTraceFixture())).not.toThrow()
    })

    it('survives a JSON round-trip', () => {
      expect(() =>
        GenerationTraceSchema.parse(jsonRoundTrip(createGenerationTraceFixture())),
      ).not.toThrow()
    })

    it('accepts a successful generation trace', () => {
      const trace = createGenerationTraceFixture()

      trace.outcome.status = 'success'
      delete trace.outcome.failureCode

      expect(() => GenerationTraceSchema.parse(trace)).not.toThrow()
    })

    it('accepts a failed generation trace', () => {
      const trace = createGenerationTraceFixture()

      trace.outcome.status = 'generation_failed'

      trace.outcome.failureCode = 'TOKEN_LIMIT'

      delete trace.artifact.artifactSourceHash
      delete trace.evaluation

      expect(() => GenerationTraceSchema.parse(trace)).not.toThrow()
    })
  })
})

describe('metadata validation', () => {
  it('rejects an invalid trace identifier', () => {
    const trace = createGenerationTraceFixture()

    trace.metadata.traceId = 'not-a-uuid'

    expect(() => GenerationTraceSchema.parse(trace)).toThrow()
  })

  it('rejects an empty installation fingerprint', () => {
    const trace = createGenerationTraceFixture()

    trace.metadata.installationFingerprint = ''

    expect(() => GenerationTraceSchema.parse(trace)).toThrow()
  })

  it('rejects an installation fingerprint shorter than thirty-two characters', () => {
    const trace = createGenerationTraceFixture()

    trace.metadata.installationFingerprint = 'abc123'

    expect(() => GenerationTraceSchema.parse(trace)).toThrow()
  })

  it('rejects an installation fingerprint longer than one hundred twenty-eight characters', () => {
    const trace = createGenerationTraceFixture()

    trace.metadata.installationFingerprint = 'a'.repeat(129)

    expect(() => GenerationTraceSchema.parse(trace)).toThrow()
  })

  it('rejects unexpected metadata fields', () => {
    expectSchemaToFail(
      GenerationTraceSchema,
      asUnknown({
        ...createGenerationTraceFixture(),
        metadata: {
          ...createGenerationTraceFixture().metadata,
          ipAddress: '127.0.0.1',
        },
      }),
    )
  })
})

describe('configuration validation', () => {
  it('rejects an empty provider identifier', () => {
    const trace = createGenerationTraceFixture()

    trace.configuration.providerId = ''

    expect(() => GenerationTraceSchema.parse(trace)).toThrow()
  })

  it('rejects an empty model identifier', () => {
    const trace = createGenerationTraceFixture()

    trace.configuration.modelId = ''

    expect(() => GenerationTraceSchema.parse(trace)).toThrow()
  })

  it('rejects an empty prompt version', () => {
    const trace = createGenerationTraceFixture()

    trace.configuration.promptVersion = ''

    expect(() => GenerationTraceSchema.parse(trace)).toThrow()
  })

  it('rejects an unknown generation mode', () => {
    expectSchemaToFail(
      GenerationTraceSchema,
      asUnknown({
        ...createGenerationTraceFixture(),
        configuration: {
          ...createGenerationTraceFixture().configuration,
          generationMode: 'raw_html',
        },
      }),
    )
  })

  it('rejects unexpected configuration fields', () => {
    expectSchemaToFail(
      GenerationTraceSchema,
      asUnknown({
        ...createGenerationTraceFixture(),
        configuration: {
          ...createGenerationTraceFixture().configuration,
          temperature: 0.7,
        },
      }),
    )
  })
})

describe('outcome validation', () => {
  it('rejects a successful trace containing a failure code', () => {
    const trace = createGenerationTraceFixture()

    trace.outcome.status = 'success'
    trace.outcome.failureCode = 'TOKEN_LIMIT'

    expect(() => GenerationTraceSchema.parse(trace)).toThrow()
  })

  it('requires a failure code for failed generations', () => {
    const trace = createGenerationTraceFixture()

    trace.outcome.status = 'generation_failed'

    delete trace.outcome.failureCode

    delete trace.artifact.artifactSourceHash
    delete trace.evaluation

    expect(() => GenerationTraceSchema.parse(trace)).toThrow()
  })

  it('rejects an unknown outcome status', () => {
    expectSchemaToFail(
      GenerationTraceSchema,
      asUnknown({
        ...createGenerationTraceFixture(),
        outcome: {
          ...createGenerationTraceFixture().outcome,
          status: 'network_error',
        },
      }),
    )
  })

  it('rejects an unknown pipeline stage', () => {
    expectSchemaToFail(
      GenerationTraceSchema,
      asUnknown({
        ...createGenerationTraceFixture(),
        outcome: {
          ...createGenerationTraceFixture().outcome,
          stage: 'executor',
        },
      }),
    )
  })

  it('rejects unexpected outcome fields', () => {
    expectSchemaToFail(
      GenerationTraceSchema,
      asUnknown({
        ...createGenerationTraceFixture(),
        outcome: {
          ...createGenerationTraceFixture().outcome,
          retryCount: 3,
        },
      }),
    )
  })
})

describe('metrics validation', () => {
  describe('token usage', () => {
    it('rejects negative prompt tokens', () => {
      const trace = createGenerationTraceFixture()

      trace.metrics!.tokenUsage.promptTokens = -1

      expect(() => GenerationTraceSchema.parse(trace)).toThrow()
    })

    it('rejects negative completion tokens', () => {
      const trace = createGenerationTraceFixture()

      trace.metrics!.tokenUsage.completionTokens = -1

      expect(() => GenerationTraceSchema.parse(trace)).toThrow()
    })

    it('rejects negative total tokens', () => {
      const trace = createGenerationTraceFixture()

      trace.metrics!.tokenUsage.totalTokens = -1

      expect(() => GenerationTraceSchema.parse(trace)).toThrow()
    })

    it('rejects unexpected token usage fields', () => {
      expectSchemaToFail(
        GenerationTraceSchema,
        asUnknown({
          ...createGenerationTraceFixture(),
          metrics: {
            ...createGenerationTraceFixture().metrics,
            tokenUsage: {
              ...createGenerationTraceFixture().metrics!.tokenUsage,
              cachedTokens: 512,
            },
          },
        }),
      )
    })
  })

  describe('performance', () => {
    it('rejects negative latency', () => {
      const trace = createGenerationTraceFixture()

      trace.metrics!.performance.latencyMs = -1

      expect(() => GenerationTraceSchema.parse(trace)).toThrow()
    })

    it('rejects unexpected performance fields', () => {
      expectSchemaToFail(
        GenerationTraceSchema,
        asUnknown({
          ...createGenerationTraceFixture(),
          metrics: {
            ...createGenerationTraceFixture().metrics,
            performance: {
              ...createGenerationTraceFixture().metrics!.performance,
              queueTimeMs: 42,
            },
          },
        }),
      )
    })
  })

  describe('billing', () => {
    it('rejects a negative estimated cost', () => {
      const trace = createGenerationTraceFixture()

      trace.metrics!.billing.estimatedCostUsd = -0.01

      expect(() => GenerationTraceSchema.parse(trace)).toThrow()
    })

    it('rejects unexpected billing fields', () => {
      expectSchemaToFail(
        GenerationTraceSchema,
        asUnknown({
          ...createGenerationTraceFixture(),
          metrics: {
            ...createGenerationTraceFixture().metrics,
            billing: {
              ...createGenerationTraceFixture().metrics!.billing,
              currency: 'USD',
            },
          },
        }),
      )
    })
  })

  it('accepts an omitted metrics block', () => {
    const trace = createGenerationTraceFixture()

    delete trace.metrics
    delete trace.artifact.artifactSourceHash
    delete trace.evaluation

    trace.outcome.status = 'generation_failed'

    trace.outcome.failureCode = 'TOKEN_LIMIT'

    expect(() => GenerationTraceSchema.parse(trace)).not.toThrow()
  })
})

describe('evaluation validation', () => {
  it('rejects a ui completeness score below zero', () => {
    const trace = createGenerationTraceFixture()

    trace.evaluation!.uiCompleteness = -0.01

    expect(() => GenerationTraceSchema.parse(trace)).toThrow()
  })

  it('rejects a ui completeness score above one', () => {
    const trace = createGenerationTraceFixture()

    trace.evaluation!.uiCompleteness = 1.01

    expect(() => GenerationTraceSchema.parse(trace)).toThrow()
  })

  it('rejects an accessibility score below zero', () => {
    const trace = createGenerationTraceFixture()

    trace.evaluation!.accessibilityScore = -0.01

    expect(() => GenerationTraceSchema.parse(trace)).toThrow()
  })

  it('rejects an accessibility score above one', () => {
    const trace = createGenerationTraceFixture()

    trace.evaluation!.accessibilityScore = 1.01

    expect(() => GenerationTraceSchema.parse(trace)).toThrow()
  })

  it('accepts an omitted accessibility score', () => {
    const trace = createGenerationTraceFixture()

    delete trace.evaluation!.accessibilityScore

    expect(() => GenerationTraceSchema.parse(trace)).not.toThrow()
  })

  it('rejects unexpected evaluation fields', () => {
    expectSchemaToFail(
      GenerationTraceSchema,
      asUnknown({
        ...createGenerationTraceFixture(),
        evaluation: {
          ...createGenerationTraceFixture().evaluation!,
          hallucinationScore: 0.12,
        },
      }),
    )
  })
})

describe('artifact validation', () => {
  it('accepts an omitted artifact hash', () => {
    const trace = createGenerationTraceFixture()

    delete trace.artifact.artifactSourceHash

    delete trace.evaluation
    delete trace.metrics

    trace.outcome.status = 'generation_failed'

    trace.outcome.failureCode = 'TOKEN_LIMIT'

    expect(() => GenerationTraceSchema.parse(trace)).not.toThrow()
  })

  it('rejects an invalid artifact hash', () => {
    const trace = createGenerationTraceFixture()

    trace.artifact.artifactSourceHash = 'invalid'

    expect(() => GenerationTraceSchema.parse(trace)).toThrow()
  })

  it('rejects a short artifact hash', () => {
    const trace = createGenerationTraceFixture()

    trace.artifact.artifactSourceHash = 'a'.repeat(63)

    expect(() => GenerationTraceSchema.parse(trace)).toThrow()
  })

  it('rejects unexpected artifact fields', () => {
    expectSchemaToFail(
      GenerationTraceSchema,
      asUnknown({
        ...createGenerationTraceFixture(),
        artifact: {
          ...createGenerationTraceFixture().artifact,
          compiledBundle: 'bundle.js',
        },
      }),
    )
  })
})

describe('privacy validation', () => {
  it('accepts an omitted diagnostic prompt', () => {
    const trace = createGenerationTraceFixture()

    delete trace.privacy.diagnosticPrompt

    expect(() => GenerationTraceSchema.parse(trace)).not.toThrow()
  })

  it('accepts a diagnostic prompt when the user has opted in', () => {
    const trace = createGenerationTraceFixture()

    trace.privacy.hasUserOptIn = true

    trace.privacy.diagnosticPrompt = 'Generate a pull request review checklist.'

    expect(() => GenerationTraceSchema.parse(trace)).not.toThrow()
  })

  it('rejects a diagnostic prompt without explicit user opt-in', () => {
    const trace = createGenerationTraceFixture()

    trace.privacy.hasUserOptIn = false

    trace.privacy.diagnosticPrompt = 'Sensitive prompt'

    expect(() => GenerationTraceSchema.parse(trace)).toThrow()
  })

  it('rejects a selected text character count without a selected text hash', () => {
    const trace = createGenerationTraceFixture()

    delete trace.privacy.selectedTextHash

    trace.privacy.selectedTextCharCount = 512

    expect(() => GenerationTraceSchema.parse(trace)).toThrow()
  })

  it('rejects an invalid selected text hash', () => {
    const trace = createGenerationTraceFixture()

    trace.privacy.selectedTextHash = 'invalid'

    expect(() => GenerationTraceSchema.parse(trace)).toThrow()
  })

  it('rejects unexpected privacy fields', () => {
    expectSchemaToFail(
      GenerationTraceSchema,
      asUnknown({
        ...createGenerationTraceFixture(),
        privacy: {
          ...createGenerationTraceFixture().privacy,
          rawPrompt: 'This should never be logged.',
        },
      }),
    )
  })
})

describe('cross-schema validation', () => {
  it('requires an artifact hash for successful generations', () => {
    const trace = createGenerationTraceFixture()

    delete trace.artifact.artifactSourceHash

    expect(() => GenerationTraceSchema.parse(trace)).toThrow()
  })

  it('rejects evaluation for failed generations', () => {
    const trace = createGenerationTraceFixture()

    trace.outcome.status = 'generation_failed'

    trace.outcome.failureCode = 'TOKEN_LIMIT'

    delete trace.artifact.artifactSourceHash

    expect(() => GenerationTraceSchema.parse(trace)).toThrow()
  })

  it('requires metrics when an artifact hash exists', () => {
    const trace = createGenerationTraceFixture()

    delete trace.metrics

    expect(() => GenerationTraceSchema.parse(trace)).toThrow()
  })

  it('accepts a complete successful generation trace', () => {
    expect(() => GenerationTraceSchema.parse(createGenerationTraceFixture())).not.toThrow()
  })
})

it('rejects attempts to include raw workspace data', () => {
  expectSchemaToFail(
    GenerationTraceSchema,
    asUnknown({
      ...createGenerationTraceFixture(),
      workspaceData: {
        notes: 'secret',
      },
    }),
  )
})

it('rejects attempts to include raw HTML', () => {
  expectSchemaToFail(
    GenerationTraceSchema,
    asUnknown({
      ...createGenerationTraceFixture(),
      rawHtml: '<div>secret</div>',
    }),
  )
})
