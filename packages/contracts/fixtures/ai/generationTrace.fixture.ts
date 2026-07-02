import type { GenerationTrace } from '../../src/ai/generationTrace.types'

/**
 * Creates a canonical GenerationTrace fixture.
 *
 * Every unit, contract and serialization
 * test should derive from this factory
 * rather than duplicating large JSON objects.
 */
export function createGenerationTraceFixture(): GenerationTrace {
  return {
    schemaVersion: 1,

    metadata: {
      traceId: '11111111-1111-4111-8111-111111111111',

      installationFingerprint: '5f8f3d4b7dcb91f826dd4c5cb38f70a2d15bbdd42d79ce59d6d9fcbcbad1c912',
    },

    configuration: {
      providerId: 'google',

      modelId: 'gemini-2.5-pro',

      promptVersion: 'planner-v4',

      generationMode: 'generated_bundle',
    },

    outcome: {
      status: 'success',

      stage: 'gateway',
    },

    metrics: {
      tokenUsage: {
        promptTokens: 520,

        completionTokens: 1400,

        totalTokens: 1920,
      },

      performance: {
        latencyMs: 1642,
      },

      billing: {
        estimatedCostUsd: 0.0125,
      },
    },

    evaluation: {
      uiCompleteness: 0.98,

      accessibilityScore: 0.96,
    },

    artifact: {
      artifactSourceHash: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    },

    privacy: {
      hasUserOptIn: false,

      selectedTextHash: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',

      selectedTextCharCount: 412,
    },
  }
}
